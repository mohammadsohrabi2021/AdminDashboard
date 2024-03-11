import { Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ChangeLanguage from "../components/ChangeLanguage";
import ChangeTheme from "../components/ChangeTheme";
import backGroundImage from "@assets/images/bg.png";
import { useAppContext } from "../contexts/app/AppContext";
function IdentityLayout() {
  const { changeLanguage, language } = useAppContext();
  const style = {
    backgroundImage: `url(${backGroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width:'60vw'
  };
  return (
    <Grid display={"flex"} flexDirection={{ xs: "column" }} position={'relative'}>
      <Grid  position={'absolute'}>
       <Grid  display={"flex"}  alignItems={"center"}>
       <ChangeTheme />
        <ChangeLanguage />
       </Grid>
      </Grid>

      <Grid display={'flex'}>
        <Grid
          width={{xs:'100%',sm:"50%"}}
          style={{ textAlign: language === "fa" ? "right" : "left" }}
          mx={{xs:0,sm:2,md:4}}
        >
          <Outlet />
        </Grid>
        <Grid display={{xs:'none',sm:'flex'}} style={style}></Grid>
      </Grid>
    </Grid>
  );
}

export default IdentityLayout;
