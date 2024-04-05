import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useContext } from "react";
import { DashContext, tyDashContext } from "../../App";

const columns: GridColDef[] = [
  { field: "id", headerName: "id", width: 50 },
  { field: "first_name", headerName: "First Name", width: 100 },
  { field: "last_name", headerName: "Last Name", width: 100 },
  { field: "email", headerName: "Email", width: 100 },
  { field: "address", headerName: "Address", width: 100 },
  { field: "phone", headerName: "Phone", width: 100 },
  { field: "birthDate", headerName: "Birth Date", width: 100 },
];

const MuiDataGrid = () => {
  const { users } = useContext(DashContext) as tyDashContext;
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={users} columns={columns} />
    </div>
  );
};

export default MuiDataGrid;
