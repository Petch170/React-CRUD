import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function UserUpdate() {
  const { id } = useParams();

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("https://www.melivecode.com/api/users/" + id, requestOptions)
      .then((response) => response.json())
      .then(
        (result) => {
          setFname(result.user.fname)
          setLname(result.user.lname)
          setUsername(result.user.username)
          setEmail(result.user.email)
          setAvatar(result.user.avatar)
        }
      )
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      id:id,
      fname: fname,
      lname: lname,
      username: username,
      password: "1234",
      email: email,
      avatar: avatar,
    };

    fetch("https://www.melivecode.com/api/users/update",{
    method: "PUT",
    headers: {
      Accept: 'application/form-data',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(res => res.json())
  .then(
    (result) => {
      alert(result['message'])
      if (result['status'] === 'ok') {
        window.location.href = '/';
      }
    }
  )
}
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  return (
  
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <div>
        <Typography variant="h6" component="h1">
          Update User
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{pt:2}}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                fullWidth
                required
                id="fname"
                label="First name"
                variant="outlined"
                onChange={(e) => setFname(e.target.value)}
                value={fname}
                autofocus
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
                value={lname}
              />
            </Grid>{" "}
            <Grid item xs={12} sm={6}>
              <TextField
                id="username"
                label="username"
                variant="outlined"
                fullWidth
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
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
                value={email}
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
                value={avatar}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
        </div>
      </Container>
  
  );
}
