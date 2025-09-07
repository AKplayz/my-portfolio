// PlanetCore.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";
import { Suspense, useRef } from "react";

function EarthModel() {
  const fbx = useFBX("/models/earth.fbx"); // simpan FBX di public/models
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002; // rotasi halus
    }
  });

  return <primitive ref={ref} object={fbx} scale={0.02} />;
}

export default function PlanetCore() {
  return (
    <div className="solar-system-core">
      <Canvas>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <EarthModel />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
