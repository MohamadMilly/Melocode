import type { QuizTestCase } from "@app/types";

export function getCppToRunCode({
  currentCode,
  testCases,
  functionToBeTestedName,
}: {
  currentCode: string;
  testCases: Omit<QuizTestCase, "output">[] | undefined;
  functionToBeTestedName: string;
}) {
  const cStyleTestCases = testCases
    ? testCases.map((tc) => `  {"${tc.id}", "${tc.input}"}`).join(",\n")
    : [];

  return `${currentCode}

// --- Test Runner Harness ---
#include <iostream>
#include <string>
#include <vector>
#include <sstream>
#include <any>
#include <type_traits>
#include <bitset>
#include <tuple>

struct TestCase {
    std::string id;
    std::string input;
};

// Exact matching logic to JavaScript's split("_").map(...)
std::vector<std::any> parseArgs(const std::string& input) {
    std::vector<std::any> args;
    if (input.empty()) return args;

    std::stringstream ss(input);
    std::string token;
    while (std::getline(ss, token, '_')) {
        std::stringstream converter(token);
        double numericValue;
        if (converter >> numericValue && converter.eof()) {
            args.push_back(numericValue);
        } else {
            args.push_back(token);
        }
    }
    return args;
}

// Custom type trait to detect std::bitset types for JSON output formatting
template <typename T>
struct clog_is_bitset : std::false_type {};

template <size_t N>
struct clog_is_bitset<std::bitset<N>> : std::true_type {};

template <typename T>
std::string formatJsonValue(const T& val) {
    std::stringstream ss;
    if constexpr (std::is_same_v<T, std::string> || std::is_same_v<T, const char*>) {
        ss << "\\"" << val << "\\"";
    } else if constexpr (clog_is_bitset<T>::value) {
        ss << "\\"" << val.to_string() << "\\"";
    } else {
        ss << val;
    }
    return ss.str();
}

// A bulletproof type-casting extractor that prevents std::bad_any_cast exceptions
template <typename TargetType>
TargetType safeCastAny(const std::any& a) {
    if (a.type() == typeid(double)) {
        return static_cast<TargetType>(std::any_cast<double>(a));
    } else if (a.type() == typeid(int)) {
        return static_cast<TargetType>(std::any_cast<int>(a));
    } else if (a.type() == typeid(unsigned int)) {
        return static_cast<TargetType>(std::any_cast<unsigned int>(a));
    } else if (a.type() == typeid(std::string)) {
        if constexpr (std::is_same_v<TargetType, std::string>) {
            return std::any_cast<std::string>(a);
        }
    }
    return TargetType{}; // Safe default fallback
}

// C++ Dynamic Spread Operator (...args) Equivalent wrapper
template <typename Ret, typename... Args, size_t... Is>
Ret invokeHelper(Ret(*func)(Args...), const std::vector<std::any>& args, std::index_sequence<Is...>) {
    return func(safeCastAny<typename std::decay<Args>::type>(args[Is])...);
}

template <typename Ret, typename... Args>
std::string dynamicSpreadInvoke(Ret(*func)(Args...), const std::vector<std::any>& args) {
    if (args.size() < sizeof...(Args)) return "null";
    auto output = invokeHelper(func, args, std::make_index_sequence<sizeof...(Args)>{});
    return formatJsonValue(output);
}

int main() {
    // Equivalent of console.log = () => {} to avoid cluttering stdout
    std::stringstream noiseBuffer;
    std::streambuf* oldCoutBuffer = std::cout.rdbuf(noiseBuffer.rdbuf());

    std::vector<TestCase> testCases = {
${cStyleTestCases}
    };

    std::stringstream resultsJson;
    resultsJson << "[";
    
    for (size_t i = 0; i < testCases.size(); ++i) {
        const auto& testCase = testCases[i];
        resultsJson << "{\\"testCaseId\\":\\"" << testCase.id << "\\",\\"output\\":";
        
        try {
            std::vector<std::any> args = parseArgs(testCase.input);
            ${
              functionToBeTestedName
                ? `resultsJson << dynamicSpreadInvoke(&::${functionToBeTestedName}, args);`
                : `resultsJson << "null";`
            }
        } catch (...) {
            resultsJson << "null";
        }
        
        resultsJson << "}";
        if (i < testCases.size() - 1) {
            resultsJson << ",";
        }
    }
    
    resultsJson << "]";

    // Equivalent of originalLog() - restores output stream and returns the formatted string
    std::cout.rdbuf(oldCoutBuffer);
    std::cout << resultsJson.str() << std::endl;

    return 0;
}
`;
}
