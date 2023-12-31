import React from "react";
import Box from "@mui/material/Box";
import Logo from "../Logo/Logo";
import LogoIcon from "../Logo/LogoIcon";
import ROUTES from "../../../../routes/routesModel";
import NavItem from "../../../../routes/NavItem";
import { useUser } from "../../../../users/providers/UserProvider";

const LeftNavBar = () => {

  const { user } = useUser();

  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <NavItem to={ROUTES.ABOUT} label="about" />
        <NavItem to={ROUTES.CARDS} label="cards" />

        {user && <NavItem to={ROUTES.FAV_CARDS} label="Favorite Cards" />}

        {user?.isBusiness && (
            <NavItem to={ROUTES.MY_CARDS} label="My Cards" />
        )}
      </Box>
    </Box>
  );
};

export default LeftNavBar;
