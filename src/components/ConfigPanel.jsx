"use client"

import { useState } from "react"
import {
  Box,
  Slider,
  Typography,
  Button,
  Paper,
  IconButton,
  Drawer,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { Settings, ExpandIcon as ExpandMore, ChevronLeft } from "lucide-react"
import { addDoc, getDocs } from "firebase/firestore"
import { configsCollection } from "./firebaseConfig"

function ConfigPanel({ planets, setPlanets }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  const [open, setOpen] = useState(!isMobile)

  const handleChange = (index, field, value) => {
    setPlanets((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)))
  }

  const saveConfig = async () => {
    alert("Saving configuration...")
    try {
      await addDoc(configsCollection, { planets })
      alert("Configuration saved!")
    } catch (error) {
      console.error("Error saving config:", error)
      alert("Failed to save configuration.")
    }
  }

  const loadConfig = async () => {
    try {
      const snapshot = await getDocs(configsCollection)
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data() // Load the first config
        setPlanets(data.planets)
        alert("Configuration loaded!")
      } else {
        alert("No configurations found.")
      }
    } catch (error) {
      console.error("Error loading config:", error)
    }
  }

  const toggleDrawer = () => {
    setOpen(!open)
  }

  // Content of the config panel
  const configContent = (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Solar System Config
        </Typography>
        {isMobile && (
          <IconButton onClick={toggleDrawer} edge="end" color="inherit">
            <ChevronLeft />
          </IconButton>
        )}
      </Box>

      {planets.map((planet, index) => (
        <Accordion
          key={index}
          sx={{
            mb: 1,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "white",
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">{planet.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ px: 1 }}>
              <Typography variant="body2">Size</Typography>
              <Slider
                min={1}
                max={10}
                value={planet.radius}
                onChange={(e, v) => handleChange(index, "radius", v)}
                sx={{ mb: 2 }}
              />
              <Typography variant="body2">Distance</Typography>
              <Slider
                min={10}
                max={150}
                value={planet.distance}
                onChange={(e, v) => handleChange(index, "distance", v)}
                sx={{ mb: 2 }}
              />
              <Typography variant="body2">Speed</Typography>
              <Slider
                min={0.001}
                max={10}
                step={0.001}
                value={planet.speed}
                onChange={(e, v) => handleChange(index, "speed", v)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Stack direction={isMobile ? "column" : "row"} spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={saveConfig} fullWidth={isMobile}>
          Save Config
        </Button>
        <Button variant="contained" color="secondary" onClick={loadConfig} fullWidth={isMobile}>
          Load Config
        </Button>
      </Stack>
    </>
  )

  // For mobile: show a floating button that opens a drawer
  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            zIndex: 1000,
          }}
        >
          <Settings />
        </IconButton>

        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer}
          PaperProps={{
            sx: {
              width: "80%",
              maxWidth: 300,
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              color: "white",
              p: 2,
            },
          }}
        >
          {configContent}
        </Drawer>
      </>
    )
  }

  // For tablet and desktop: show a semi-transparent panel
  return (
    <Paper
      elevation={3}
      className="config-panel"
      sx={{
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        color: "white",
        p: 3,
        borderRadius: 2,
        maxWidth: isTablet ? 300 : 350,
        maxHeight: "95vh",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      {configContent}
    </Paper>
  )
}

export default ConfigPanel

