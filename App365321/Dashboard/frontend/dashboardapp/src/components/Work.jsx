import {useState,useEffect} from 'react'
import {GoReport} from 'react-icons/go'
import axios from 'axios'

const Clients = (pros) =>{
  const [status,setStatus] = useState(pros.status)
  
  useEffect(()=>{
 
  axios.get(
    `http://localhost:4000/getStatus?name=${pros.name}`,).then((res)=>{
   
    setStatus({
      name:pros.name,
      status: res.data.status
    })

  }).catch (err=> {console.log(err)})
 


},[pros.status]) 

  const statusHandler = () =>{
      pros.setStatus({
        name:pros.name,
        status: status.status
      })
      pros.openModal()
  }

    return (
        
        <div onClick={statusHandler} className="max-w-sm rounded-lg p-2  w-[13rem] shadow-lg">
    <div className={`inline-block overflow-hidden rounded-lg w-full h-40 ${pros.color} grid  justify-center items-center text-center`}>
     <div>

     <img className='rounded-full w-24 h-24' src={pros.im}/ >
     <span id='name' className="font-bold text-md mb-2 text-gray-50  uppercase">{pros.name}</span>
     </div>
    </div>
  <div className="px-6 py-4 bg-white">
    
     <div className='flex items-center h-[4rem]'><GoReport color='#616d66'/> <span id='work' className='pl-2 text-slate-600 font-semibold text-xs uppercase'> {(status.status.length>33)?status.status.substring(0,29)+'...':status.status}</span> </div> 
  </div>

</div>
    )
}

export default Clients