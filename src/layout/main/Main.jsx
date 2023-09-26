import { node } from "prop-types";
import Paper from "@mui/material/Paper";
import { useTheme } from "../../providers/ThemeProvider";

const Main = ({ children }) => {
  const { isDark } = useTheme();
  const color = isDark ? "#333333" : "#e3f2fd";

  return (
    <Paper
      sx={{
        minHeight: "90vh",
        backgroundColor: color
      }}>
      <div style={{paddingBottom: "10px"}} />
      {children}
      <div style={{paddingTop: "10px"}} />
    </Paper>
  );
};

Main.propTypes = {
  children: node.isRequired,
};

export default Main;
