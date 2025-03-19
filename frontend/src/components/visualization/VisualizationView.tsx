import { useEffect } from 'react';
import * as THREE from 'three';
import useVisualizationEngine from '@/hooks/useVisualizationEngine';

interface VisualizationViewProps {
  visualizationId: string;
  height?: string;
  className?: string;
}

const VisualizationView: React.FC<VisualizationViewProps> = ({
  visualizationId,
  height = '400px',
  className = '',
}) => {
  const { containerRef, isInitialized, addVisualization, removeVisualization } = 
    useVisualizationEngine();

  // Example visualization - this would normally come from a visualizations library
  useEffect(() => {
    if (!isInitialized) return;

    // Create a simple cube visualization
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00a5e0,
      metalness: 0.1,
      roughness: 0.5,
    });
    const cube = new THREE.Mesh(geometry, material);

    // Add the visualization to the engine
    addVisualization({
      id: visualizationId,
      object: cube,
      update: (delta) => {
        // Rotate the cube
        cube.rotation.x += delta * 0.5;
        cube.rotation.y += delta * 0.8;
      },
    });

    // Clean up
    return () => {
      removeVisualization(visualizationId);
    };
  }, [isInitialized, visualizationId, addVisualization, removeVisualization]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height, 
        width: '100%',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}
      className={`bg-white shadow-lg ${className}`}
    />
  );
};

export default VisualizationView;