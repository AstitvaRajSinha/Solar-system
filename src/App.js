import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SolarSystem from "./components/SolarSystem";
import ConfigPanel from "./components/ConfigPanel";
import { Container } from "@mui/material";
import "./styles.css";

function App() {
  // Define planets state
  const [planets, setPlanets] = useState([
    { name: "Mercury", radius: 2, distance: 10, speed: 0.02, color: "gray" },
    { name: "Venus", radius: 4, distance: 20, speed: 0.15, color: "orange" },
    { name: "Earth", radius: 5, distance: 30, speed: 0.1, color: "blue" },
    { name: "Mars", radius: 3, distance: 40, speed: 0.08, color: "red" },
    { name: "Jupiter", radius: 10, distance: 60, speed: 0.05, color: "brown" },
    { name: "Saturn", radius: 8, distance: 80, speed: 0.04, color: "yellow" },
    { name: "Uranus", radius: 6, distance: 100, speed: 0.03, color: "lightblue" },
    { name: "Neptune", radius: 6, distance: 120, speed: 0.02, color: "darkblue" },
  ]);

  return (
    <Container maxWidth="lg" className="app-container">
      <Canvas camera={{ position: [0, 50, 150] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={1.5} />
        <OrbitControls />
        <SolarSystem planets={planets} />
      </Canvas>
      <ConfigPanel planets={planets} setPlanets={setPlanets} />
    </Container>
  );
}

export default App;
