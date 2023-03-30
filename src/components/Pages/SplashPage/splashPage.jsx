import React from "react";
import { useHistory } from "react-router-dom";
import "./SplashPage.css";
import ImageSlider from "../ImageSlider/ImageSlider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

// This is is the for the landing page, get started button will take you to the login page.
function SplashPage() {


  const richlandTheme = createTheme({
    palette: {
      primary: {
        main: "#77afdb",
        contrastText: "#ffcf5f",
      },
      secondary: {
        main: "#ffcf5f",
        contrastText: "#000",
      },
      danger: {
        main: "#b71c1c",
        contrastText: "#fff",
      },
    },

    typography: {
      fontFamily: "Libre Baskerville, serif",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: 1.5,
    },
  });
  

  const history = useHistory();

  function getStartedButton() {
    history.push("/login");
  }
  return (
    <>
    <ThemeProvider theme={richlandTheme}>
        <div className="splash-container"> 

        <div className="title-container">
          <h1 className="form-title">Richland Music Parents</h1>
        <Button 
        className="splash-button" 
        color="primary"
        variant="contained"
        sx={{
          backgroundColor: richlandTheme.palette.primary.main,
          color: "white",
          fontSize: "1.2rem",
          fontWeight: "600",
          padding: "1rem 2rem",
          boxShadow: "none",
          marginTop: "2rem",
          borderRadius: "15px",
          "&:hover": {
            backgroundColor: richlandTheme.palette.primary.dark
           },
           display: "flex",

        }}
        onClick={getStartedButton}>Get Started</Button>
         </div>
        <div className="image-slider-container"> 
        <ImageSlider/>
        </div>
        <div className="description-container">
      
            
             
          </div>
        <section>
        <p className="splash-description">
          Join the Richland Music Parents' community fundraising revolution with
          our Music Parents Community Calendar app! Easily add household
          information, pay online, and track orders. Plus, contribute to the
          community effort by adding important dates. Support students and the
          community with ease!
        </p>
        </section>
       
     
    
        </div>
     
    
      </ThemeProvider>
      
    </>
  );
}
export default SplashPage;
