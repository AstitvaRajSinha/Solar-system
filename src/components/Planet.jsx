import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Planet({ radius, distance, speed, color }) {
  const planetRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    planetRef.current.position.x = Math.cos(elapsedTime * speed) * distance;
    planetRef.current.position.z = Math.sin(elapsedTime * speed) * distance;
  });

  return (
    <mesh ref={planetRef} position={[distance, 0, 0]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Planet;
