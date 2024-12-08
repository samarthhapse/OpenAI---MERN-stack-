import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  // theme
  const theme = useTheme();
  // mediaQuery
  const isNotMobile = useMediaQuery("(min-width:1000px)");
  // states
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  // handleSubmit
  const handleSubmit = async (e) => {
    // to prevent the refreshing of page on click of button
    e.preventDefault();
    try {
      // make api request and {username,emial,password}
      await axios.post("http://localhost:8080/api/v1/auth/login", {
        password,
        email,
      });
      // on making above request show a notification of login successful
      toast.success("Login Successful");
      localStorage.setItem("authToken",true);
      navigate("/");
      }
      catch (err) {
        console.log(error);
        if (err.response.data.error) {
          setError(err.response.data.error);
        } else if (err.message) {
          setError(err.message);
        }
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Sign In</Typography>
        <TextField
          label="email"
          type="email"
          required
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          label="password (length > 6)"
          type="password"
          required
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
        >
          Sign In
        </Button>
        <Typography mt={2}>
          Don't have an account ? <Link to="/register">Please Register</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default Login