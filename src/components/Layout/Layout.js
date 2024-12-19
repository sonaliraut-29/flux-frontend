import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  layout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    flexDirection: "column",
  },
}));
const Layout = ({ children }) => {
  const classes = useStyles();

  const userToken = localStorage.getItem("user");
  const isAuthenticated = userToken ? JSON.parse(userToken).token : null;

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flux Application
          </Typography>

          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/todo-list">
                Todo List
              </Button>
              <Button color="inherit" component={Link} to="/logout">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box className={classes.layout}>{children}</Box>
    </Box>
  );
};

export default Layout;
