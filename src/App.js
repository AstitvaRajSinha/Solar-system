import { useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SolarSystem from "./components/SolarSystem";
import ConfigPanel from "./components/ConfigPanel";
import { Container } from "@mui/material";
import "./styles.css";
import { TextureLoader } from "three";

function Background() {
  const bgTexture = useLoader(TextureLoader, "/textures/bg.jpg");

  return (
    <mesh>
      <sphereGeometry args={[500, 64, 64]} />
      <meshBasicMaterial map={bgTexture} side={2} />
    </mesh>
  );
}


function App() {
  const [planets, setPlanets] = useState([
    { name: "Mercury", radius: 1.5, distance: 30, speed: 0.5, texture: "/textures/mercury.jpg" },
    { name: "Venus", radius: 3, distance: 40, speed: 1, texture: "/textures/venus.jpg" },
    { name: "Earth", radius: 3.5, distance: 50, speed: 1.1, texture: "/textures/earth.jpg" },
    { name: "Mars", radius: 2.5, distance: 60, speed: 1.08, texture: "/textures/mars.jpg" },
    { name: "Jupiter", radius: 12, distance: 80, speed: 1.05, texture: "/textures/jupiter.jpg" },
    { name: "Saturn", radius: 8, distance: 105, speed: 1.2, texture: "/textures/saturn.jpg" },
    { name: "Uranus", radius: 5, distance: 120, speed: 1.03, texture: "/textures/uranus.jpg" },
    { name: "Neptune", radius: 5, distance: 135, speed: 1.3, texture: "/textures/neptune.jpg" },
  ]);
  

  return (
    <div className="app-container" >
      <Canvas camera={{ position: [0, 50, 150] }}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} intensity={1.5} />
            <Background />
        <OrbitControls />
        <SolarSystem planets={planets} />
      </Canvas>
      <ConfigPanel planets={planets} setPlanets={setPlanets} />
    </div>
  );
}

export default App;
