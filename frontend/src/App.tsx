import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Layout components
import MainLayout from '@/components/layouts/MainLayout';

// Pages (lazy loaded)
const HomePage = lazy(() => import('@/pages/HomePage'));
const LearningModule = lazy(() => import('@/pages/LearningModule'));
const ChallengeView = lazy(() => import('@/pages/ChallengeView'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen flex-col">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mb-4"></div>
    <div className="text-gray-700 text-xl">Loading...</div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="modules" element={<Navigate to="/modules/basic-syntax" replace />} />
          <Route path="modules/:moduleId" element={<LearningModule />} />
          <Route path="challenges/:challengeId" element={<ChallengeView />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;