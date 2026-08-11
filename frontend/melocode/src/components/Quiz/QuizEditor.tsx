import { useEffect, useRef, useState } from "react";
import Editor from "@uiw/react-textarea-code-editor";
import { Button } from "@radix-ui/themes";

type QuizEditorProps = {
  initialCode: string;
};

export function QuizEditor({ initialCode }: QuizEditorProps) {
  const [code, setCode] = useState(initialCode);
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
      send("ERROR",message);
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
    <div className="w-full">
      <Editor
        padding={15}
        language="ts"
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
          width: "100%",
          backgroundColor: "#1a1b26",
        }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <iframe
        className="hidden"
        ref={inlineFramePlaygroundRef}
        sandbox="allow-scripts"
      ></iframe>
      {logs.length > 0 && (
        <div
          ref={loggerRef}
          className="relative max-h-[200px] overflow-y-auto bg-[var(--gray-1)] rounded p-2 flex"
        >
          {" "}
          <ul className="text-sm font-medium tracking-wide h-full">
            {logs.map((messageData) => {
              return (
                <li
                  className={
                    messageData.type === "ERROR"
                      ? "text-red-600"
                      : "text-[var(--gray-11)]"
                  }
                >
                  {messageData.type}: {messageData.message}
                </li>
              );
            })}
          </ul>
          <Button
            size={"1"}
            className="sticky! z-200! ml-auto! top-1! right-1!"
            onClick={() => setLogs([])}
          >
            تنظيف
          </Button>
        </div>
      )}
    </div>
  );
}
