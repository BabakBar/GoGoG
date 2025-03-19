import { useRef, useEffect, useState } from 'react';
import VisualizationEngine, { Visualization } from '@/core/engine/VisualizationEngine';

const useVisualizationEngine = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<VisualizationEngine | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (containerRef.current && !engineRef.current) {
      engineRef.current = new VisualizationEngine(containerRef.current);
      setIsInitialized(true);
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.dispose();
        engineRef.current = null;
      }
    };
  }, []);

  const addVisualization = (visualization: Visualization) => {
    if (engineRef.current) {
      engineRef.current.addVisualization(visualization);
    }
  };

  const removeVisualization = (id: string) => {
    if (engineRef.current) {
      engineRef.current.removeVisualization(id);
    }
  };

  const updateVisualization = (
    id: string,
    updateFn: (object: THREE.Object3D) => void
  ) => {
    if (engineRef.current) {
      engineRef.current.updateVisualization(id, updateFn);
    }
  };

  return {
    containerRef,
    isInitialized,
    addVisualization,
    removeVisualization,
    updateVisualization,
  };
};

export default useVisualizationEngine;