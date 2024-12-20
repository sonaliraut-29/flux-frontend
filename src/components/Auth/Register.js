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
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const classes = useStyles();

  const handleRegister = async (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setError(null);

    if (!name) {
      setNameError("Name is required");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
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
      <Box className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h4">Register</Typography>
          <form onSubmit={handleRegister}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              error={!!nameError}
              helperText={nameError}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              error={!!passwordError}
              helperText={passwordError}
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
