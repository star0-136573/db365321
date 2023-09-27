
const Modal=(props)=> {


  
    return (
      <>
  
       
        
     <div className="fixed z-[1000]  inset-0 bg-black bg-opacity-50 items-center text-center  ">
      <div className='grid grid-cols-6  items-center'> 
      <div className='col-start-3 col-span-2 translate-y-[20rem]  bg-white p-5 rounded m-5 '>
        {props.children}
        </div>
        </div>
     </div>
        
      </>
    )
}

export default Modal