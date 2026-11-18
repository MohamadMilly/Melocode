import type { QuizTestCase } from "@app/types";

export function getJsToRunCode({
  currentCode,
  testCases,
  functionToBeTestedName,
}: {
  currentCode: string;
  testCases: Omit<QuizTestCase, "output">[] | undefined;
  functionToBeTestedName: string;
}) {
  return `
  ${currentCode}
    const originalLog = console.log;
     console.log = () => {}
    
      
     
    const testCases = ${JSON.stringify(testCases ?? [])};
    const results = [];
    for(const testCase of testCases) {
    const args = testCase.input.split("_").map(arg => Number.isNaN(Number(arg)) ? arg : Number(arg));
       
    const output = ${functionToBeTestedName ? `${functionToBeTestedName}(...args)` : undefined};
    
    results.push({
    testCaseId:testCase.id,
    output:output,
    })
    }
    
    originalLog(JSON.stringify(results));
    `;
}
