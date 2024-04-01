import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {  Outlet } from "react-router-dom";
import axios from 'axios'
import MuiDataGrid from "../../components/mui/MuiDataGrid";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const url = 'https://dummyjson.com/users'

  useEffect(() => {
    axios.get(url).then((res) => {
      console.log(res.data.users[1])
      setUsers(res.data.users)
    }).catch((err) => console.error(err.message))
  },[])
  return (
    <Box>
      <Typography variant='h4' color='initial'>
        users page
      </Typography>
      <MuiDataGrid />
      <Outlet />
    </Box>
  );
};

UsersPage.propTypes = {};

export default UsersPage;
