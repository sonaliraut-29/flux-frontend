import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  paper: {
    padding: 3,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 400,
    textAlign: "center",
  }
}));
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const classes = useStyles();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.success) {
        window.location.href = "/todo-list";
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box classessName={classes.container}>
        <Paper
          elevation={3}
          className={classes.paper}
        >
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
