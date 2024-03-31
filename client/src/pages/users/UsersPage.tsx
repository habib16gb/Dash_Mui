import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const UsersPage = () => {
  return (
    <Box>
      <Typography variant='h4' color='initial'>
        users page
      </Typography>
      <ButtonGroup variant='text' color='primary' aria-label=''>
        <Button
          sx={{ margin: "1rem" }}
          size='small'
          variant='contained'
          color='secondary'
        >
          <Link to={"/"}>back home page</Link>
        </Button>
        <Button
          sx={{ margin: "1rem" }}
          size='small'
          variant='contained'
          color='success'
        >
          <Link to={"/users/add"}>add new user</Link>
        </Button>
        <Button
          sx={{ margin: "1rem" }}
          size='small'
          variant='contained'
          color='success'
        >
          <Link to={"/users/update"}>update user</Link>
        </Button>
      </ButtonGroup>
      <Outlet />
    </Box>
  );
};

UsersPage.propTypes = {};

export default UsersPage;
