import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import MuiDataGrid from "../../components/mui/MuiDataGrid";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

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
