import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface Props {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeSwitcher: React.FC<Props> = ({ isDark, onToggle }) => {
  return (
    <Tooltip title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <IconButton
        onClick={onToggle}
        size="small"
        sx={{
          backgroundColor: "transparent",
          transition: "all 0.2s ease",
          padding: "8px",
          "&:hover": {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
            transform: "rotate(15deg)",
          },
          color: isDark ? "#fff" : "#000",
        }}
      >
        {isDark ? (
          <LightModeIcon sx={{ fontSize: "1.2rem" }} />
        ) : (
          <DarkModeIcon sx={{ fontSize: "1.2rem" }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeSwitcher;
