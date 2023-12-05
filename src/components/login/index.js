import {
  Dialog,
  DialogTitle,
  Slide,
  Box,
  IconButton,
  DialogContent,
  TextField,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { firebasedb } from "../../services/firebase/db";

const SlideTransition = React.forwardRef((props, ref) => {
  return (
    <Slide ref={ref} direction="down" mountOnEnter unmountOnExit {...props} />
  );
});

export default function Login({ open, onClose }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [joinUs, setJoinUs] = useState(false);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleJoinUsSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await firebasedb.register(form);
      onClose();
    } catch(error) {
      setError(error.message);
      console.log(error)
    }

    setLoading(false);
    
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await firebasedb.login(form);
      onClose();
    } catch(error) {
      setError(error.message);
      console.log(error);
    }
    setLoading(false);
  };

  const handleFieldUpdate = (value, type) => {
    setForm({...form, [type]: value})
  }

  return (
    <Dialog TransitionComponent={SlideTransition} open={open}>
      <DialogTitle>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          Login
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Slide
        direction="down"
        in={open}
        timeout={{
          enter: 500,
          exit: 100,
        }}
      >
        <DialogContent>
          {joinUs ? (
            <>
              <Box
                display="flex"
                flexDirection={"column"}
                sx={{ width:  "100%" }}
              >
                {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
                <form onSubmit={handleJoinUsSubmit}>
                  <TextField
                    label="First name"
                    size="sm"
                    variant="standard"
                    sx={{ mb: 2 }}
                    fullWidth
                    value={form.firstname}
                    onChange={(event) => handleFieldUpdate(event.target.value, 'firstname')}
                  />
                  <TextField
                    label="Last name"
                    size="sm"
                    variant="standard"
                    sx={{ mb: 2 }}
                    fullWidth
                    value={form.lastname}
                    onChange={(event) => handleFieldUpdate(event.target.value, 'lastname')}
                  />
                  <TextField
                    label="Email"
                    size="sm"
                    variant="standard"
                    sx={{ mb: 2 }}
                    fullWidth
                    value={form.email}
                    onChange={(event) => handleFieldUpdate(event.target.value, 'email')}
                  />
                  <TextField
                    label="Password"
                    type={"password"}
                    size="sm"
                    variant="standard"
                    fullWidth
                    value={form.password}
                    onChange={(event) => handleFieldUpdate(event.target.value, 'password')}
                  />
                  <Button fullWidth type="submit" sx={{ mt: 2 }} variant="contained"
                  disabled={
                    form.firstname == "" || form.lastname === "" ||
                    form.email === "" || form.password === ""}
                  >
                    {loading ? 'Please wait...' : 'Sign up'}
                  </Button>
                </form>
              </Box>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="caption">
                  Have an account?{" "}
                  <Button onClick={() => setJoinUs(false)}>Sign in</Button>
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Box
                display="flex"
                flexDirection={"column"}
                sx={{ width: "100%" }}
              >
                {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
                <form onSubmit={handleLoginSubmit}>
                  <TextField
                    label="Email"
                    size="sm"
                    variant="standard"
                    sx={{ mb: 2 }}
                    fullWidth
                    onChange={(event) =>
                      setForm({ ...form, email: event.target.value })
                    }
                    value={form.email}
                  />
                  <TextField
                    label="Password"
                    type={"password"}
                    size="sm"
                    variant="standard"
                    fullWidth
                    onChange={(event) =>
                      setForm({ ...form, password: event.target.value })
                    }
                    value={form.password}
                  />
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    type="submit"
                    fullWidth
                    disabled={form.email === "" || form.password === ""}
                  >
                    {loading ? 'Please wait...' : 'Login'}
                  </Button>
                </form>
              </Box>
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="caption">
                  Don't have an account?{" "}
                  <Button onClick={() => setJoinUs(true)}>Join us</Button>
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Slide>
    </Dialog>
  );
}
