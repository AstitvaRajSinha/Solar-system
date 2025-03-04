import Planet from "./Planet";
import { useMemo } from "react";
import { Line } from "@react-three/drei";

function SolarSystem({ planets }) {
  // ✅ Compute all orbit points before rendering JSX
  const orbitPoints = useMemo(() => {
    return planets.map((planet) => {
      let points = [];
      for (let i = 0; i <= 100; i++) {
        const angle = (i / 100) * Math.PI * 2;
        points.push([Math.cos(angle) * planet.distance, 0, Math.sin(angle) * planet.distance]);
      }
      return { distance: planet.distance, points };
    });
  }, [planets]);

  return (
    <>
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      {/* Orbits & Planets */}
      {planets.map((planet, index) => (
        <group key={index}>
          {/* Orbit */}
          <Line points={orbitPoints[index].points} color="white" lineWidth={1} />
          {/* Planet */}
          <Planet {...planet} />
        </group>
      ))}
    </>
  );
}

export default SolarSystem;
