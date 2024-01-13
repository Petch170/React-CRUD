import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import ButtonGroup from "@mui/material/ButtonGroup";
import UserUpdate from "./UserUpdate";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }
// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function User() {
  const [items, setItems] = useState([]);

  useEffect(() => {
   userGet()
  }, []);

const userGet=()=>{
  fetch("https://www.melivecode.com/api/users")
  .then((res) => res.json())
  .then((result) => {
    setItems(result);
  });
}
const UserUpdate =id=>{
  window.location='/update/'+id
}

const UserDelete = id=>{
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "id": id
});

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://www.melivecode.com/api/users/delete", requestOptions)
  .then(response => response.json())
  .then(result => {
    alert (result['message'])
    if(result['status']==='ok'){
      userGet()
    }
  })
  .catch(error => console.log('error', error));
}

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        {/* ใส่เงาด้วยPaper */}
        <Paper sx={{ p: 2 }}>
          <Box display={"flex"}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ fontSize: "h6.fontSize", m: 1 }}>
                Users
              </Typography>
            </Box>
            <Link href="Create">
              <Button variant="contained">Create</Button>
            </Link>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Lastname</TableCell>
                  <TableCell align="right">Position</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">
                      <Box display={"flex"} justifyContent={"center"}>
                        <Avatar alt={row.username} src={row.avatar} />
                      </Box>
                    </TableCell>
                    <TableCell align="right">{row.fname}</TableCell>
                    <TableCell align="right">{row.lname}</TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group">
                        <Button  onClick={()=>UserUpdate(row.id)}>EDIT</Button>
                        <Button onClick={()=>UserDelete(row.id)}>DEL</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
