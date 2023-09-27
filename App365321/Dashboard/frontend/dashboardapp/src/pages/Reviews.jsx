import React, { useState,useMemo } from 'react'
import MaterialReactTable from 'material-react-table'
import axios from 'axios'
import company from '../data/companyList'
import ian from '../assets/ds5.png'
import tp from '../assets/trustpilot.png'

const Reviews = () => {
      
      const [started,setStarted] =useState(false)
      const [data, setData] = useState([])
      const [plt, setPlt] = useState([])
      const [compan, setCompan] =useState('John Lewis')
   
        // const ta=data.map(
        //     (info)=>{
        //         return(
        //             <tr>
        //                 <td>{info.review_title}</td>
        //                 <td>{info.review_date}</td>
                      
        //             </tr>
        //         )
        //         })
        
       const dropdown = (<select id='com'>
                           {Object.keys(company).map(element => <option key={element} value={company[element]}>{element}</option>)}
                        </select>)
      
       let img = <div className=' pb-10 pt-8 '><img className='rounded shadow-md' width='1000px' height='900px' src={ian}></img> </div>
      
       


    
        const columns = useMemo(
          () => [

      
            
            { 
              accessorKey: 'review_title',
              header: "review_title",
              enableClickToCopy: true,
              size: 150,
            },
            { 
              accessorKey: 'review_date_original',
              header: "dates_original",
              enableClickToCopy: true,
              size: 30,
            },
            {
              accessorKey: 'review_date',
               header: "dates",
               enableClickToCopy: true,
              size: 30,
              },
            {
              accessorKey: 'review_rating',
               header: "ratings",
               enableClickToCopy: true,
              size: 5,
              },
            { 
              accessorKey: 'review_text',
              header: "comments",
              enableClickToCopy: true,
              size: 500,
            },
            // {
            //   accessorKey: 'page_number',
            //    header: "page",
            //    enableClickToCopy: true,
            //   size: 5,
            // }
          ],
          [],
        );

       
        const reviewHandler = async e =>{
          
           const com =  e.target.com.value
           const p = e.target.pages.value
          //  const p =  e.target.password.value
         
          e.preventDefault()
         
        //  await axios.get(
        //     `http://localhost:5000/login`,{
        //       // 'Authorization':'Basic '+ btoa('Manager:abc')
        //       headers: {
        //         'Authorization': 'Basic '+ btoa('Manager:abc')
        //       }
              
        //    }).then((res)=>{

        //      console.log(res.data)

        // }).catch (err=> {console.log(err)})
         
        
         await axios.get(
            `http://localhost:5000/reviews?web=${com}&&page=${p}`,{headers:{
              'Authorization': 'Jwt '+localStorage.getItem('token')
            }}).then((res)=>{

           setData(res.data)

        }).catch (err=> {console.log(err)})

        await axios.get(
            'http://localhost:5000/wordcloud',{responseType: 'blob'}).then((res)=>{
        
         
          console.log(res.data)

          const reader = new FileReader()

          reader.addEventListener("load", ()=>{
          console.log(reader.result)
          setPlt(reader.result)
        })
        reader.readAsDataURL(res.data)
        
      }).catch (err=> {console.log(err)})
      
      setStarted(true)
    
       setCompan(com)

         } 

        //  const fileHandler = (e)=>{
        //       const file = e.target.files[0]
        //       console.log(e.target.files[0])
        //       const reader = new FileReader()

        //       reader.addEventListener("load", ()=>{
        //         console.log(reader.result)
        //       })
        //       reader.readAsDataURL(file)
             
        //       console.log(img)
        //  }


        if(started) img = (
          <div>
          <div className='uppercase text-xl text-gray-500 font-bold'><h3>{compan}</h3></div>
          <MaterialReactTable 
          title='review' 
          // enableBottomToolbar={false}
          // enableColumnResizing
  
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
          enableRowNumbers
         
          data={data}  
          columns={columns} />

          <div className='pt-5 grid grid-cols-5'>
            <div className='col-start-2 self-center '>
         <img width='400px' height='300px' src={tp} ></img>
              
            </div>
            <div className='col-start-4 col-span-2 '>

         <img width='500px' height='200px' src={plt} ></img>
            </div>

          </div>
  
          </div>
         )


     
       
        
    return (

      <>
        <div className="md:container md:mx-auto px-4 pb-3 md z-0">


</div>

<div className="md:container grid grid-cols-12  md:mx-auto bg-gray-100 px-4 py-10 md z-0">
        {/* <div className='"container bg-gray-50  grid grid-cols-12 gap-10  pt-20 z-0 h-full lg"'> */}
        <div className='w-full col-start-2 col-span-10 drop-shadow-md justify-start'>
        <form className="pb-5  " onSubmit={reviewHandler}>
        <label htmlFor="">Company: </label>{dropdown}
        <label className="pl-5">     Pages </label> 
        <select className="pl-5" id="pages">
          <option key='one' value='1'>One</option>
          <option key='two' value='2'>Two</option>
          <option key='three' value='3'>Three</option>
          <option key='four' value='4'>Four</option>
          <option key='five' value='5'>Five</option>
          <option key='six' value='6'>Six</option>
        </select>
        <span className='pl-3'>
        <button type='submit' className="bg-cyan-300 text-white rounded-md px-2 pl-15 py-1">Submit</button>

        </span>
        </form>
       <div>
        {img}

       </div>
        
        </div>
    
       
        
      </div>

      </>
    )
}
export default Reviews