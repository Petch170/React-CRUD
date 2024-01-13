import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function UserCreate() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      fname: fname,
      lname: lname,
      username: username,
      password: "1234",
      email: email,
      avatar: avatar,
    };

    fetch("https://www.melivecode.com/api/users/create", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          window.location.href = "/";
        }
      });
  };
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  return (
    <Container maxWidth="sm" sx={{ p: 2 }}>
      <div>
        {" "}
        {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}
        <Typography variant="h6" component="h1">
          Create User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container sx={{ p: 2 }} spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                id="fname"
                label="First name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setFname(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="lname"
                label="Last name"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="username"
                label="username"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="avatar"
                label="Avartar"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setAvatar(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
