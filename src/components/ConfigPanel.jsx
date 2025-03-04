import { Box, Slider, Typography, Button } from "@mui/material";
import { addDoc, getDocs } from "firebase/firestore";
import { configsCollection } from "./firebaseConfig";

function ConfigPanel({ planets, setPlanets }) {

  const handleChange = (index, field, value) => {
    setPlanets((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const saveConfig = async () => {
    try {
      await addDoc(configsCollection, { planets });
      alert("Configuration saved!");
    } catch (error) {
      console.error("Error saving config:", error);
    }
  };

  const loadConfig = async () => {
    try {
      const snapshot = await getDocs(configsCollection);
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data(); // Load the first config
        setPlanets(data.planets);
        alert("Configuration loaded!");
      } else {
        alert("No configurations found.");
      }
    } catch (error) {
      console.error("Error loading config:", error);
    }
  };

  return (
    <Box className="config-panel">
      <Typography variant="h6">Solar System Config</Typography>
      {planets.map((planet, index) => (
        <Box key={index} className="config-item">
          <Typography variant="subtitle1">{planet.name}</Typography>
          <Typography variant="body2">Size</Typography>
          <Slider
            min={1}
            max={10}
            value={planet.radius}
            onChange={(e, v) => handleChange(index, "radius", v)}
          />
          <Typography variant="body2">Distance</Typography>
          <Slider
            min={10}
            max={150}
            value={planet.distance}
            onChange={(e, v) => handleChange(index, "distance", v)}
          />
          <Typography variant="body2">Speed</Typography>
          <Slider
            min={0.001}
            max={0.02}
            step={0.001}
            value={planet.speed}
            onChange={(e, v) => handleChange(index, "speed", v)}
          />
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={saveConfig} sx={{ mt: 2 }}>
        Save Config
      </Button>
      <Button variant="contained" color="secondary" onClick={loadConfig} sx={{ mt: 2, ml: 2 }}>
        Load Config
      </Button>
    </Box>
  );
}

export default ConfigPanel;
