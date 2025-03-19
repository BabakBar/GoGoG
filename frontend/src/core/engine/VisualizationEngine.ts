import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export interface Visualization {
  id: string;
  object: THREE.Object3D;
  update?: (delta: number) => void;
}

class VisualizationEngine {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private visualizations: Map<string, Visualization>;
  private clock: THREE.Clock;
  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor(container: HTMLElement) {
    // Initialize Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    // Initialize Camera
    const width = container.clientWidth;
    const height = container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Initialize Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(this.renderer.domElement);

    // Initialize Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 50;

    // Add Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);

    // Initialize Visualization Collection
    this.visualizations = new Map<string, Visualization>();

    // Initialize Clock for Animation
    this.clock = new THREE.Clock();

    // Resize Observer for Responsive Canvas
    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
    });
    this.resizeObserver.observe(container);

    // Start Animation Loop
    this.animate();
  }

  addVisualization(visualization: Visualization): void {
    this.visualizations.set(visualization.id, visualization);
    this.scene.add(visualization.object);
  }

  removeVisualization(id: string): void {
    const visualization = this.visualizations.get(id);
    if (visualization) {
      this.scene.remove(visualization.object);
      this.visualizations.delete(id);
    }
  }

  updateVisualization(id: string, updateFn: (object: THREE.Object3D) => void): void {
    const visualization = this.visualizations.get(id);
    if (visualization) {
      updateFn(visualization.object);
    }
  }

  animate(): void {
    this.animationFrameId = requestAnimationFrame(() => {
      this.animate();
    });

    const delta = this.clock.getDelta();

    // Update controls
    this.controls.update();

    // Update visualizations
    this.visualizations.forEach((visualization) => {
      if (visualization.update) {
        visualization.update(delta);
      }
    });

    // Render the scene
    this.renderer.render(this.scene, this.camera);
  }

  resize(): void {
    const container = this.renderer.domElement.parentElement;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  dispose(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    this.visualizations.forEach((_, id) => {
      this.removeVisualization(id);
    });

    this.visualizations.clear();
    this.controls.dispose();
  }
}

export default VisualizationEngine;