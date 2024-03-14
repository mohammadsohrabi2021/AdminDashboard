import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ChangeLanguage from "../../components/ChangeLanguage";
import ChangeTheme from "../../components/ChangeTheme";
import { useAppContext } from "../../contexts/app/AppContext";

const TopNav = () => {
  const { language, toggleSidebar } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Grid className="navbar navbar-expand navbar-light navbar-bg">
      <a className="sidebar-toggle" onClick={toggleSidebar}>
        <i className="hamburger align-self-center"></i>
      </a>
      <Grid className="d-flex align-items-center me-3 gap-3">
        <ChangeLanguage />
        <ChangeTheme />
      </Grid>
      <Grid className={`${language === "fa" ? "me-auto" : "ms-auto"}`}>
        <button
          className="btn ms-2 btn-outline-danger fw-bolder"
          onClick={logout}
        >
          {t("logOut")}
        </button>
      </Grid>
    </Grid>
  );
};

export default TopNav;
