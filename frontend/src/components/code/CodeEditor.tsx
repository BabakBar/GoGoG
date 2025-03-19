import { useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode: string;
  onCodeChange?: (code: string) => void;
  onRunCode?: () => void;
  height?: string;
  readonly?: boolean;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode,
  onCodeChange,
  onRunCode,
  height = '400px',
  readonly = false,
  className = '',
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    
    // Add Go language support
    monaco.languages.register({ id: 'go' });
    
    // Add some basic Go language syntax highlighting
    monaco.languages.setMonarchTokensProvider('go', {
      keywords: [
        'break', 'case', 'chan', 'const', 'continue', 'default', 'defer', 'else',
        'fallthrough', 'for', 'func', 'go', 'goto', 'if', 'import', 'interface',
        'map', 'package', 'range', 'return', 'select', 'struct', 'switch', 'type', 'var',
      ],
      typeKeywords: [
        'bool', 'byte', 'complex64', 'complex128', 'error', 'float32', 'float64',
        'int', 'int8', 'int16', 'int32', 'int64', 'rune', 'string',
        'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'uintptr',
      ],
      operators: [
        '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
        '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%',
        '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=',
        '%=', '<<=', '>>=', '>>>=',
      ],
      symbols: /[=><!~?:&|+\-*\/\^%]+/,
      escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
      tokenizer: {
        root: [
          [/[a-z_$][\w$]*/, {
            cases: {
              '@typeKeywords': 'keyword.type',
              '@keywords': 'keyword',
              '@default': 'identifier',
            },
          }],
          [/[A-Z][\w$]*/, 'type.identifier'],
          { include: '@whitespace' },
          [/[{}()\[\]]/, '@brackets'],
          [/[<>](?!@symbols)/, '@brackets'],
          [/@symbols/, {
            cases: {
              '@operators': 'operator',
              '@default': '',
            },
          }],
          [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
          [/\d+/, 'number'],
          [/[;,.]/, 'delimiter'],
          [/"([^"\\]|\\.)*$/, 'string.invalid'],
          [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
          [/'[^\\']'/, 'string'],
          [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
          [/'/, 'string.invalid'],
        ],
        comment: [
          [/[^/*]+/, 'comment'],
          [/\/\*/, 'comment', '@push'],
          ["\\*/", 'comment', '@pop'],
          [/[/*]/, 'comment'],
        ],
        string: [
          [/[^\\"]+/, 'string'],
          [/@escapes/, 'string.escape'],
          [/\\./, 'string.escape.invalid'],
          [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
        ],
        whitespace: [
          [/[ \t\r\n]+/, 'white'],
          [/\/\*/, 'comment', '@comment'],
          [/\/\/.*$/, 'comment'],
        ],
      },
    });
  };

  const handleEditorChange = (value: string | undefined) => {
    if (onCodeChange && value !== undefined) {
      onCodeChange(value);
    }
  };

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <div className="bg-gray-900 text-white py-2 px-4 flex justify-between items-center">
        <span className="font-mono text-sm">main.go</span>
        {onRunCode && (
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md text-sm flex items-center"
            onClick={onRunCode}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Run Code
          </button>
        )}
      </div>
      <Editor
        height={height}
        language="go"
        value={initialCode}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          readOnly: readonly,
          fontFamily: "'Fira Code', 'Courier New', monospace",
          automaticLayout: true,
          padding: { top: 10 },
        }}
      />
    </div>
  );
};

export default CodeEditor;