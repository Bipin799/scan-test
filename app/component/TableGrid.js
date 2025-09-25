
"use client"
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Checkbox } from '@mui/material';
import ViewColumnIcon from "@mui/icons-material/ViewColumn";


const initialRows = [
  { id: 1, firstName: 'Jon', lastName: 'Snow', age: 35, email: 'jon@snow.com', phone: '1234567890', city: 'Winterfell' },
  { id: 2, firstName: 'Cersei', lastName: 'Lannister', age: 42, email: 'cersei@lannister.com', phone: '9876543210', city: 'King’s Landing' },
  { id: 3, firstName: 'Jaime', lastName: 'Lannister', age: 45, email: 'jaime@lannister.com', phone: '5551112222', city: 'King’s Landing' },
  { id: 4, firstName: 'Arya', lastName: 'Stark', age: 16, email: 'arya@stark.com', phone: '4442221111', city: 'Winterfell' },
  { id: 5, firstName: 'Daenerys', lastName: 'Targaryen', age: 29, email: 'dany@targaryen.com', phone: '6663339999', city: 'Dragonstone' },
  { id: 6, firstName: 'Melisandre', lastName: 'jha', age: 150, email: 'red@priestess.com', phone: '1112223333', city: 'Asshai' },
  { id: 7, firstName: 'Tyrion', lastName: 'Lannister', age: 39, email: 'tyrion@lannister.com', phone: '9998887777', city: 'King’s Landing' },
  { id: 8, firstName: 'Bran', lastName: 'Stark', age: 18, email: 'bran@stark.com', phone: '8887776666', city: 'Winterfell' },
  { id: 9, firstName: 'Sansa', lastName: 'Stark', age: 25, email: 'sansa@stark.com', phone: '7776665555', city: 'Winterfell' },
  { id: 10, firstName: 'Jorah', lastName: 'Mormont', age: 55, email: 'jorah@mormont.com', phone: '6665554444', city: 'Bear Island' },
  { id: 11, firstName: 'Samwell', lastName: 'Tarly', age: 32, email: 'sam@tarly.com', phone: '5554443333', city: 'Horn Hill' },
  { id: 12, firstName: 'Brienne', lastName: 'Tarth', age: 36, email: 'brienne@tarth.com', phone: '4443332222', city: 'Tarth' },
  { id: 13, firstName: 'Sandor', lastName: 'Clegane', age: 40, email: 'hound@clegane.com', phone: '3332221111', city: 'Riverlands' },
  { id: 14, firstName: 'Gregor', lastName: 'Clegane', age: 44, email: 'mountain@clegane.com', phone: '2221110000', city: 'Clegane Keep' },
  { id: 15, firstName: 'Davos', lastName: 'Seaworth', age: 52, email: 'davos@seaworth.com', phone: '1110009999', city: 'Kings Landing' },
  { id: 16, firstName: 'Gendry', lastName: '', age: 28, email: 'gendry@smith.com', phone: '1231231234', city: 'Kings Landing' },
  { id: 17, firstName: 'Ygritte', lastName: '', age: 27, email: 'ygritte@wildling.com', phone: '3213214321', city: 'North of the Wall' },
  { id: 18, firstName: 'Tormund', lastName: 'Giantsbane', age: 42, email: 'tormund@wildling.com', phone: '6546547654', city: 'North of the Wall' },
  { id: 19, firstName: 'Missandei', lastName: '', age: 24, email: 'missandei@naath.com', phone: '9879878765', city: 'Naath' },
  { id: 20, firstName: 'Grey', lastName: 'Worm', age: 30, email: 'greyworm@unsullied.com', phone: '8768767654', city: 'Astapor' },
  { id: 21, firstName: 'Robert', lastName: 'Baratheon', age: 48, email: 'robert@baratheon.com', phone: '7657656543', city: 'Storm’s End' },
  { id: 22, firstName: 'Stannis', lastName: 'Baratheon', age: 45, email: 'stannis@baratheon.com', phone: '6546545432', city: 'Dragonstone' },
  { id: 23, firstName: 'Renly', lastName: 'Baratheon', age: 32, email: 'renly@baratheon.com', phone: '5435434321', city: 'Storm’s End' },
  { id: 24, firstName: 'Balon', lastName: 'Greyjoy', age: 54, email: 'balon@greyjoy.com', phone: '4324323210', city: 'Pyke' },
  { id: 25, firstName: 'Theon', lastName: 'Greyjoy', age: 30, email: 'theon@greyjoy.com', phone: '3213212109', city: 'Pyke' },
  { id: 26, firstName: 'Euron', lastName: 'Greyjoy', age: 41, email: 'euron@greyjoy.com', phone: '2102101098', city: 'Pyke' },
  { id: 27, firstName: 'Jaqen', lastName: 'H’ghar', age: 38, email: 'jaqen@faceless.com', phone: '1091090987', city: 'Braavos' },
  { id: 28, firstName: 'Daario', lastName: 'Naharis', age: 34, email: 'daario@naharis.com', phone: '0980989876', city: 'Mereen' },
  { id: 29, firstName: 'Khal', lastName: 'Drogo', age: 40, email: 'drogo@dothraki.com', phone: '0870878765', city: 'Vaes Dothrak' },
  { id: 30, firstName: 'Petyr', lastName: 'Baelish', age: 46, email: 'littlefinger@baelish.com', phone: '0760767654', city: 'The Vale' },
];


export default function TableGrid() {
  const [rows, setRows] = React.useState(initialRows);

  // Delete row by id
  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

   const [columnVisibilityModel, setColumnVisibilityModel] = React.useState({
    id: true,
    firstName: true,
    lastName: true,
    age: true,
    email: true,
    phone: true,
    city: true,
    actions:true
  });

  // Manage Columns menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleToggleColumn = (field) => {
    setColumnVisibilityModel((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "age", headerName: "Age", width: 90 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'city', headerName: 'City', width: 130 },

    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);

        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
          setAnchorEl(null);
        };

        const handleDeleteClick = () => {
          handleDelete(params?.row?.id);
          console.log("deleted row successfully:", params?.row);
          handleClose();
        };

        const handleEditClick = () => {
          console.log("Edit row clicked:", params?.row);
          handleClose();
        };

        const handleViewClick = () => {
          console.log("View row clicked:", params?.row);
          handleClose();
        };

        return (
          <>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleDeleteClick}>
                <ListItemIcon>
                  <DeleteIcon color="error" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </MenuItem>
              <MenuItem onClick={handleEditClick}>
                <ListItemIcon>
                  <EditIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>
              <MenuItem onClick={handleViewClick}>
                <ListItemIcon>
                  <VisibilityIcon color="action" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="View" />
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];




  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <>
    
    {/* Manage Columns Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          onClick={handleMenuOpen}
          startIcon={<ViewColumnIcon />}
          sx={{
            mb: 2,
            backgroundColor: "primary.light",
            color: "white",
            "&:hover": {
              borderColor: "primary.light",
              background: "white",
              color: "green",
            },
          }}
        >
          Manage Columns
        </Button>
      </Box>
      
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>

        <MenuItem
          onClick={() => {
            const allVisible = Object.values(columnVisibilityModel).every(Boolean);
            const newModel = Object.keys(columnVisibilityModel).reduce(
              (acc, key) => ({ ...acc, [key]: !allVisible }),
              {}
            );
            setColumnVisibilityModel(newModel);
          }}
        >
          <Checkbox
            checked={Object.values(columnVisibilityModel).every(Boolean)}
            indeterminate={
              !Object.values(columnVisibilityModel).every(Boolean) &&
              Object.values(columnVisibilityModel).some(Boolean)
            }
          />
          <ListItemText primary="Select All" />
        </MenuItem>

        {columns.map((col) => (
          <MenuItem key={col.field} onClick={() => handleToggleColumn(col.field)}>
            <Checkbox checked={columnVisibilityModel[col.field]} />
            <ListItemText primary={col.headerName} />
          </MenuItem>
        ))}
      </Menu>

     <Paper
      sx={{
        height: 662,
        width: 1200,
        maxWidth: 1200,
        minWidth: 1200,
        // width: '100%',
        // maxWidth: '100%',
        // minWidth: '100%',
        borderRadius: 3,
        boxShadow: 3,
        overflow: 'hidden',
        p: 2,
        backgroundColor: '#f9f9f9',
      }}
    >


      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        pageSizeOptions={[10, 25]}
        checkboxSelection
        sx={{
          border: '1px solid green',
          fontFamily: 'Arial, sans-serif',
          '.MuiDataGrid-columnHeaders': {
            backgroundColor: '#1976d2',
            fontSize: 18,
            fontWeight: 'bold',
            borderRadius: '8px 8px 0 0',
            color: '#000',
          },
          '.MuiDataGrid-cell': {
            fontSize: 14,
            color: '#000',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            // '&:hover': {
            //   backgroundColor: '#e8f0fe',
            //   color: '#1976d2',
            //   fontWeight: '500',
            // },
          },
          '.MuiDataGrid-row': {
            transition: 'all 0.3s ease',
          },
          '.MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5',
            //  backgroundColor: '#0739daff',
          },
          '.MuiDataGrid-row:hover': {
            backgroundColor: '#e3f2fd',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            transform: 'scale(1.01)',
          },

          '.MuiDataGrid-footerContainer': {
            backgroundColor: '#f1f1f1',
            borderTop: '1px solid #ccc',
            color: '#000',
          },
          '.MuiCheckbox-root': {
            color: '#090615ff !important',
          },
        }}
      />
    </Paper>

    </>
  );
}
