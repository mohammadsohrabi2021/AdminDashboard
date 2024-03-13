import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import Footer from "./Footer";
import Grid from "@mui/material/Grid";
import { useAppContext } from "../../contexts/app/AppContext";

const MainLayout = () => {
  const { showSidebar } = useAppContext();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
  }
  const sidebarStyle = {
    overflowY: "auto",
    overflowX: "hidden",
    height: "100vh",
    width: "25%",
    scrollbarWidth: "none", /* Firefox */
    msOverflowStyle: "none", /* Internet Explorer */
    "&::-webkit-scrollbar": {
      width: 0,
      background: "transparent",
    },
  };
  return (
    <Grid display={"flex"} style={{ minHeight: "100vh" }} position={"relative"}>
      {showSidebar ? (
        <Grid
          display={{ xs: "none", md: "flex" }}
          mt={8}
          sx={sidebarStyle}
        >
          <Sidebar />
        </Grid>
      ) : (
        <Grid>
          <Sidebar />
        </Grid>
      )}

      <Grid className="main" style={{ overflowY: "auto", height: "100vh" }}>
        <Grid position={"fixed"} left={0} right={0}>
          <TopNav />
        </Grid>

        <Grid className="content" style={{ paddingTop: "64px" }}>
          <Grid className="container-fluid p-0">
            <Outlet />
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default MainLayout;
