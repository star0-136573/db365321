import React, { useCallback, useMemo, useState,useEffect } from 'react';
import  MaterialReactTable  from 'material-react-table';
import axios from 'axios'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,

  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';


const Customers = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([])

  useEffect(()=>{
    axios.get(
      'http://localhost:4000/customer'
    ).then((res)=>{
    
    console.log(res)
    setTableData(res.data.customer)
  
    }).catch (err=> {console.log(err)})
  
  },[])


  const handleCreate = (customer) => {
     console.log(customer)
     delete customer._id
     console.log(customer)
     axios.post(
      'http://localhost:4000/create_customer',
      {
        newCustomer:customer
      }
      
    ).then((res)=>{
   
      axios.get(
        'http://localhost:4000/customer'
      ).then((res)=>{
      
      console.log(res)
      setTableData(res.data.customer)
    
      }).catch (err=> {console.log(err)})
    
    }).catch (err=> {console.log(err)})
     

    // tableData.push(values);
    // setTableData([...tableData]);
  };

  const HandleUpdate = async ({ exitEditingMode, row, values }) => {
    // if (!Object.keys(validationErrors).length) {
     
      console.log(values)
     await axios.post(
        'http://localhost:4000/update_customer',
        {
          customer:values
        }
        
      ).then((res)=>{
       
        if(confirm('updated')){
        axios.get(
          'http://localhost:4000/customer'
        ).then((res)=>{
        
        console.log(res)
        setTableData(res.data.customer)
      
        }).catch (err=> {console.log(err)})
      }
      
      }).catch (err=> {console.log(err)})

      //send/receive api updates here, then refetch or update local table data for re-render

      exitEditingMode(); //required to exit editing mode and close modal
    // }
  };

  // const handleCancelRowEdits = () => {
  //   setValidationErrors({});
  // };

  const handleDelete = (d) =>{
     const customer = d._valuesCache
     const id = customer._id

     if(confirm('Are you sure to delete '+ customer.LastName)){
      
       console.log(id)
       axios.post(
        'http://localhost:4000/delete_customer',
        {
          id:id
        }
        
      ).then((res)=>{
      
        if(confirm(res.data.message)){
        axios.get(
          'http://localhost:4000/customer'
        ).then((res)=>{
        
   
        setTableData(res.data.customer)
      
        }).catch (err=> {console.log(err)})
      }
      
      }).catch (err=> {console.log(err)})
    
     }
     
  }


  // const getCommonEditTextFieldProps = useCallback(
  //   (cell) => {
  //     return {
  //       error: !!validationErrors[cell.id],
  //       helperText: validationErrors[cell.id],
  //       onBlur: (event) => {
  //         const isValid =
  //           cell.column.id === 'email'
  //             ? validateEmail(event.target.value)
  //             : cell.column.id === 'age'
  //             ? validateAge(+event.target.value)
  //             : validateRequired(event.target.value);
  //         if (!isValid) {
  //           //set validation error for cell if invalid
  //           setValidationErrors({
  //             ...validationErrors,
  //             [cell.id]: `${cell.column.columnDef.header} is required`,
  //           });
  //         } else {
  //           //remove validation error for cell if valid
  //           delete validationErrors[cell.id];
  //           setValidationErrors({
  //             ...validationErrors,
  //           });
  //         }
  //       },
  //     };
  //   },
  //   [validationErrors],
  // );

  const columns = useMemo(
    () => [
      {
        accessorKey: '_id',
        header: 'ID',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column

        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: 'FirstName',
        header: 'First Name',
        size: 140,
        enableClickToCopy: true,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        // }),
      },
      {
        accessorKey: 'LastName',
        header: 'Last Name',
        size: 140,
        enableClickToCopy: true,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        // }),
      },
      {
        accessorKey: 'Email',
        header: 'Email',
        enableClickToCopy: true,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        //   type: 'email',
        // }),
      },
      {
        accessorKey: 'Age',
        header: 'Age',
        size: 80,
        enableClickToCopy: true,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        //   type: 'number',
        // }),
      },
      // {
      //   accessorKey: 'state',
      //   header: 'State',
      //   muiTableBodyCellEditTextFieldProps: {
      //     select: true, //change to select for a dropdown
      //     children: states.map((state) => (
      //       <MenuItem key={state} value={state}>
      //         {state}
      //       </MenuItem>
      //     )),
      //   },
      // },
    ],
    // [getCommonEditTextFieldProps],
  );

  return (
    <>
    <div className="md:container md:mx-auto px-4 pb-3 md ">


</div>
    <div className="md:container grid grid-cols-12 p-8 md:mx-auto bg-gray-600  ">
    {/* <div className='"container bg-gray-100 grid grid-cols-12 pt-20 z-0 h-full lg"'> */}
    <div className='col-start-2 col-span-10 drop-shadow-lg  '>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 70,
            
          },
        }}
        columns={columns}
        data={tableData}
        enableFullScreenToggle={false}
        enablePagination={false}
        enableStickyHeader
        initialState={{ density: 'comfortable' }}
        muiTableProps={{
         
          sx: {
            maxHeight: '500px',
          },
        }}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={HandleUpdate}
        // onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton  onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton  color='warning' onClick={() => handleDelete(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
     
        renderTopToolbarCustomActions={() => (
          <Button
            color="primary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Add Customer
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreate}
      />
      </div>
    </div>
        </>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };
  
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add Customer</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
             {columns.map((column) => {  if(column.accessorKey!=='_id') return (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              
              />

            )}
            )}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// const validateRequired = (value) => !!value.length;
// const validateEmail = (email) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     );
// const validateAge = (age) => age >= 18 && age <= 50;

export default Customers;
