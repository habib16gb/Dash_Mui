import { Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import MuiDataGrid from "../../components/mui/MuiDataGrid";
import { DashContext, tyDashContext } from "../../App";

const UsersPage = () => {
  const { setUsers } = useContext(DashContext) as tyDashContext;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Box>
      <Typography
        variant='h4'
        color='initial'
        className='text-2xl capitalize text-center mb-4 font-bold'
      >
        users page
      </Typography>
      <Outlet />
      <MuiDataGrid />
    </Box>
  );
};

UsersPage.propTypes = {};

export default UsersPage;
