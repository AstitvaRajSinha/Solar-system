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
    { name: "Mercury", radius: 2, distance: 10, speed: 0.2, texture: "/textures/mercury.jpg" },
    { name: "Venus", radius: 4, distance: 20, speed: 0.15, texture: "/textures/venus.jpg" },
    { name: "Earth", radius: 5, distance: 30, speed: 0.1, texture: "/textures/earth.jpg" },
    { name: "Mars", radius: 3, distance: 40, speed: 0.08, texture: "/textures/mars.jpg" },
    { name: "Jupiter", radius: 12, distance: 60, speed: 0.05, texture: "/textures/jupiter.jpg" },
    { name: "Saturn", radius: 8, distance: 80, speed: 0.04, texture: "/textures/saturn.jpg" },
    { name: "Uranus", radius: 6, distance: 100, speed: 0.03, texture: "/textures/uranus.jpg" },
    { name: "Neptune", radius: 6, distance: 120, speed: 0.02, texture: "/textures/neptune.jpg" },
  ]);

  return (
    <Container maxWidth="lg" className="app-container" >
      <Canvas camera={{ position: [0, 50, 150] }}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} intensity={1.5} />
            <Background />
        <OrbitControls />
        <SolarSystem planets={planets} />
      </Canvas>
      <ConfigPanel planets={planets} setPlanets={setPlanets} />
    </Container>
  );
}

export default App;
