import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeEditor from '@/components/code/CodeEditor';
import CodeOutput from '@/components/code/CodeOutput';
import VisualizationView from '@/components/visualization/VisualizationView';

// This is a mock challenge for now - in a real app, this would come from an API
const mockChallenge = {
  id: 'hello-world',
  title: 'Hello, Gopher!',
  description: 'Write your first Go program that prints a greeting.',
  instructions: 'Create a program that prints "Hello, Gopher!" to the console.',
  starterCode: `package main

import "fmt"

func main() {
	// Your code here
}`,
  solutionCode: `package main

import "fmt"

func main() {
	fmt.Println("Hello, Gopher!")
}`,
  visualizationId: 'hello-world-vis',
  difficulty: 'beginner',
  points: 10,
};

const ChallengeView = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [code, setCode] = useState(mockChallenge.starterCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // In a real app, we would fetch the challenge data from an API based on the challengeId
  useEffect(() => {
    // Reset state when challenge changes
    setCode(mockChallenge.starterCode);
    setOutput('');
    setError(undefined);
    setIsCompleted(false);
  }, [challengeId]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleRunCode = () => {
    setLoading(true);
    setOutput('');
    setError(undefined);

    // Simulate code execution with a timeout
    // In a real app, this would use WebAssembly to run the Go code in the browser
    // or make an API call to a backend service
    setTimeout(() => {
      setLoading(false);

      if (code.includes('fmt.Println("Hello, Gopher!")')) {
        setOutput('Hello, Gopher!');
        setIsCompleted(true);
      } else if (code.includes('fmt.Print')) {
        setOutput('Your output is not exactly what we expected. Make sure it says "Hello, Gopher!"');
        setError('Incorrect output');
      } else {
        setError('Your code didn\'t produce any output. Try using fmt.Println()');
      }
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Instructions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">{mockChallenge.title}</h1>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-primary-600">
                {mockChallenge.difficulty}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{mockChallenge.description}</p>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Instructions</h2>
              <p className="text-gray-700">{mockChallenge.instructions}</p>
            </div>
            
            {isCompleted && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">
                      Challenge completed! You've earned {mockChallenge.points} points.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between">
              <Link to="/modules" className="text-primary-600 hover:text-primary-800">
                Back to Modules
              </Link>
              <button 
                className="btn-primary"
                onClick={handleRunCode}
              >
                Run Code
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Column: Editor, Output, and Visualization */}
        <div className="lg:col-span-2 space-y-6">
          {/* Code Editor */}
          <CodeEditor
            initialCode={code}
            onCodeChange={handleCodeChange}
            onRunCode={handleRunCode}
            height="300px"
          />
          
          {/* Code Output */}
          <CodeOutput
            output={output}
            error={error}
            loading={loading}
            height="100px"
          />
          
          {/* Visualization */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Visualization</h2>
            <VisualizationView 
              visualizationId={mockChallenge.visualizationId} 
              height="300px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeView;