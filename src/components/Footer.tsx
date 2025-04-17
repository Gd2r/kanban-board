import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60px",
        backgroundColor: "background.paper",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: 1,
        borderColor: "divider",
        px: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Made by Hisham{" "}
        <span role="img" aria-label="heart" style={{ color: "#ff4081" }}>
          ❤️
        </span>{" "}
        <Link
          href="https://github.com/Gd2r"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          sx={{
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          @Gd2r
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
