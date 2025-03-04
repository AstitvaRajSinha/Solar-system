import { Box, Slider, Typography, Button } from "@mui/material";

function ConfigPanel({ planets, setPlanets }) {
  const handleChange = (index, field, value) => {
    setPlanets((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
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
    </Box>
  );
}

export default ConfigPanel;
