import Gantt from '../components/Charts/GanttChart'
import Modal from '../components/Modal'
const Project = ()=>{


 return (
     <>
             <div className="md:container pb-10 md:mx-auto  md z-0">


          </div>

      <div className="md:container grid grid-cols-13 pt-10 pl-10 pr-10 md:mx-auto bg-gray-100 px-4 py-20 ">
        <h3 className='text-2xl col-start-6 pb-3 font-semibold text-black underline'>Project Z</h3>
        <h5 className='text-md col-start-6 -translate-x-5 pb-3 font-semibold text-gray-300'>page constructing...</h5>
      <div className='col-start-2  col-span-10 '>

                 <Gantt/>
                 
             </div>
   
      </div>

    
     </>

 )

}

export default Project