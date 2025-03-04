import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

function Planet({ radius, distance, speed, texture }) {
  const planetRef = useRef();
  const planetTexture = useLoader(TextureLoader, texture);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const rotationSpeedMultiplier = 2;
    planetRef.current.position.x = Math.cos(elapsedTime * speed * rotationSpeedMultiplier) * distance;
    planetRef.current.position.z = Math.sin(elapsedTime * speed * rotationSpeedMultiplier) * distance;
  });

  return (
    <mesh ref={planetRef} position={[distance, 0, 0]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={planetTexture} />
    </mesh>
  );
}

export default Planet;
