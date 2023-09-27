import {useMemo} from 'react'
import CustomerData from '../data/dataA'
import MaterialReactTable from 'material-react-table'


const Customers = () => {
  const columns = useMemo(
    () => [

      // {
      //     accessorKey: 'name.firstName', //accessorFn used to join multiple data into a single cell
      //     id: 'name', //id is still required when using accessorFn instead of accessorKey
      //     header: 'Name',
      //     // size: 250,
      //     Cell: ({cell}) => (
       
        
      //        <span>

      //         <img
      //           alt="avatar"
                
      //           src={p1}
      //           loading="lazy"
      //           className="object-fill w-12 h-12 rounded-full shadow-lg"
      //           />
      //           <p>{cell.getValue()}</p>
      //           </span>
      //     ),
      //   },
      {
        accessorKey: 'CompanyName', //access nested data with dot notation
        header: 'Company Name',
        enableClickToCopy: true,
      },
      {
        accessorKey: 'Address',
        header: 'Address',
        enableClickToCopy: true,
      },
      {
        accessorKey: 'City', //normal accessorKey
        header: 'City',
        enableClickToCopy: true,
      },
      {
        accessorKey: 'Phone',
        header: 'Phone no.',
        enableClickToCopy: true,
      },
      {
        accessorKey: 'Website',
        header: 'Website',
        enableClickToCopy: true,
      }

   
    ],
    [],
  );
  return (
    <>
            <div className="md:container md:mx-auto px-4 pb-3 md z-0">


</div>

<div className="md:container grid grid-cols-12  md:mx-auto bg-gray-100 px-4 py-10 md z-0">
    {/* <div className='"container bg-gray-100 grid grid-cols-12 pt-20 z-0 h-full lg"'> */}
    <div className='col-start-2 col-span-10 drop-shadow-lg '>
    
    <MaterialReactTable  title='customer table '
      enableGlobalFilterModes
      // enablePagination={false}
      enableFullScreenToggle={false}
      enableStickyHeader
      initialState={{ density: 'comfortable' }}
      muiTableProps={{
        sx: {
          maxHeight: '500px',
        },
      }}
 
    
     
      enablePagination={false}
    
    columns={columns} 
    data={CustomerData} />
    </div>
    
  </div>
  </>
  );
    }
  export default Customers;