import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import VisualizationView from '@/components/visualization/VisualizationView';

// Mock module data - in a real app, this would come from an API
const mockModule = {
  id: 'basic-syntax',
  title: 'Go Basics',
  description: 'Learn the fundamental syntax and concepts of Go',
  objectives: [
    'Write and run your first Go program',
    'Understand variables and basic types',
    'Use basic control structures',
  ],
  prerequisites: [],
  order: 1,
  visualizationId: 'basic-syntax-vis',
  completed: 0,
  total: 5,
  challenges: [
    {
      id: 'hello-world',
      title: 'Hello, Gopher!',
      description: 'Write your first Go program that prints a greeting.',
      difficulty: 'beginner',
      completed: true,
    },
    {
      id: 'variables',
      title: 'Variables and Types',
      description: 'Learn about variables and basic types in Go.',
      difficulty: 'beginner',
      completed: false,
    },
    {
      id: 'control-flow',
      title: 'Control Flow',
      description: 'Understand if statements and loops in Go.',
      difficulty: 'beginner',
      completed: false,
    },
    {
      id: 'functions',
      title: 'Basic Functions',
      description: 'Create and use functions in Go.',
      difficulty: 'beginner',
      completed: false,
    },
    {
      id: 'packages',
      title: 'Working with Packages',
      description: 'Learn how to use packages in Go programs.',
      difficulty: 'intermediate',
      completed: false,
    },
  ],
};

const LearningModule = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [module, setModule] = useState(mockModule);

  // In a real app, we would fetch the module data from an API based on the moduleId
  useEffect(() => {
    // This would be replaced with an API call
    setModule(mockModule);
  }, [moduleId]);

  // Calculate progress percentage
  const completedChallenges = module.challenges.filter(c => c.completed).length;
  const progressPercentage = Math.round((completedChallenges / module.challenges.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="bg-primary-700 text-white p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold">{module.title}</h1>
              <p className="mt-2 text-primary-100">{module.description}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-800 text-white">
                Module {module.order}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Learning Objectives</h2>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                {module.objectives.map((objective, index) => (
                  <li key={index} className="text-gray-700">{objective}</li>
                ))}
              </ul>
              
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-primary-600 h-4 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                {completedChallenges} of {module.challenges.length} challenges completed ({progressPercentage}%)
              </p>
            </div>
            
            <div className="md:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Module Visualization</h2>
              <VisualizationView 
                visualizationId={module.visualizationId}
                height="200px"
              />
            </div>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Challenges</h2>
      <div className="space-y-4">
        {module.challenges.map((challenge) => (
          <Link 
            key={challenge.id}
            to={`/challenges/${challenge.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {challenge.completed ? (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-4">
                      <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                      <span className="text-gray-600 font-medium">{module.challenges.indexOf(challenge) + 1}</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{challenge.title}</h3>
                    <p className="text-gray-600">{challenge.description}</p>
                  </div>
                </div>
                <div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    challenge.difficulty === 'beginner' 
                      ? 'bg-green-100 text-green-800' 
                      : challenge.difficulty === 'intermediate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LearningModule;