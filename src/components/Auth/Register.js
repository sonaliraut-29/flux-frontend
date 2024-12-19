import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Paper } from "@mui/material";
import { register } from "../../services/authService";
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
  },
}));

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const classes = useStyles();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(name, email, password);
      if (response.success) {
        navigate("/login");
      }
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box classessName={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4">Register</Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
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
              Register
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
