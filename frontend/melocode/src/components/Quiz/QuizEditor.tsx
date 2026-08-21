import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Button, Flex, Text } from "@radix-ui/themes";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-cloud9_night";
import "ace-builds/src-noconflict/ext-language_tools";

type QuizEditorProps = {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
  disabled: boolean;
};

export function QuizEditor({ code, setCode, disabled }: QuizEditorProps) {
  const [logs, setLogs] = useState<
    { type: "ERROR" | "LOG"; message: string }[]
  >([]);
  const inlineFramePlaygroundRef = useRef<HTMLIFrameElement>(null);
  const loggerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== "http://localhost:5173" && e.origin !== "null") {
        return;
      }
      if (e.data && (e.data.type === "ERROR" || e.data.type === "LOG")) {
        setLogs((prev) => [
          ...prev,
          { type: e.data.type, message: e.data.message },
        ]);
      }
    }
    window.addEventListener("message", onMessage);

    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    const script = `
  <script>
    const originalLog = console.log;
    const originalError = console.error;
    const send = (type,message) => {
    const data = {
        type: type,
        message: message,
      };
     
      window.parent.postMessage(data, "*");
    }
    console.log = (...args) => {
      send("LOG",args.join(" "))
      originalLog.apply(console, args);
    }
    console.error = (...args) => {
    send("ERROR",args.join(" "))
    originalError.apply(console,args)
    }

    window.onerror = function(message, source, lineno, colno, error) {
      const messageWithLine = message + " at " + (lineno - 29);
      send("ERROR",messageWithLine);
      return false;
    };
    
  </script>
  <script>
  ${code}
  </script>
`;
    const timer = setTimeout(() => {
      if (!inlineFramePlaygroundRef.current) return;
      inlineFramePlaygroundRef.current.srcdoc = script;
    }, 2000);

    return () => clearTimeout(timer);
  }, [code]);

  useEffect(() => {
    const loggerEl = loggerRef.current;
    if (loggerEl) {
      loggerEl.scroll({
        top: loggerEl.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [logs]);
  return (
    <div className="w-full my-2">
      <AceEditor
        readOnly={disabled}
        className="code-editor"
        placeholder="write your code here..."
        theme="cloud9_night"
        minLines={5}
        maxLines={30}
        style={{
          backgroundColor: "#1a1b26",
        }}
        width="100%"
        mode={"javascript"}
        fontSize={15}
        lineHeight={19}
        editorProps={{
          $blockScrolling: true, // Standard boilerplate to suppress warnings
        }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        value={code}
        onChange={(newValue) => setCode(newValue)}
      />

      <iframe
        className="hidden"
        ref={inlineFramePlaygroundRef}
        sandbox="allow-scripts"
      ></iframe>

      <div
        ref={loggerRef}
        className="relative max-h-[200px] overflow-y-auto bg-[var(--gray-1)] rounded p-2 flex flex-col gap-1"
      >
        {" "}
        <Flex
          className="pb-1 border-b border-[var(--gray-3)]"
          my={"1"}
          justify={"between"}
          align={"center"}
        >
          <Text
            as="span"
            size={"1"}
            className="uppercase text-[var(--gray-12)] font-medium"
          >
            Console
          </Text>
          <Button
            disabled={logs.length === 0}
            size={"1"}
            onClick={() => setLogs([])}
          >
            مسح
          </Button>
        </Flex>
        {logs.length > 0 ? (
          <ul className="space-y-1 font-mono text-xs tracking-tight h-full text-[#a9b1d6]">
            {logs.map((messageData, index) => {
              const isError = messageData.type === "ERROR";

              return (
                <li
                  key={index}
                  className={`flex items-start gap-2 py-1 px-2 border-l-2 rounded-r transition-colors duration-150 hover:bg-[#24283b] ${
                    isError
                      ? "border-red-500 bg-red-950/20 text-red-400"
                      : "border-blue-500 bg-blue-950/10 text-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase rounded tracking-wider ${
                      isError
                        ? "bg-red-500/20 text-red-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {messageData.type}
                  </span>

                  <span className="break-all whitespace-pre-wrap flex-1 pt-0.5">
                    {messageData.message}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <Text className="text-xs text-[var(--gray-11)] text-center italic">
            Console is empty
          </Text>
        )}
      </div>
    </div>
  );
}
