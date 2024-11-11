import "./App.css";
import React from "react";
import WeatherCard from "./Components/WeatherCompnent";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Alexandria", // Specify your desired font here
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <WeatherCard />
      </div>
    </ThemeProvider>
  );
}

export default App;
