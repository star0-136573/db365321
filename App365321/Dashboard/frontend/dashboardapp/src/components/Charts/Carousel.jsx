
import { useState} from "react"
import { ChevronLeft, ChevronRight } from "react-feather"
import axios from 'axios'
const Carousel = ({
  children: slides,

}) => {
  const [curr, setCurr] = useState(0)

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))


  return (
    <>
    <div className="overflow-hidden relative grid grid-cols-6  ">
      <div
        className="flex transition-transform  duration-500   "
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides} 
        
      </div>
    
    
      <div className="col-start-1">
        <button
          onClick={prev}
          className="p-1 rounded-full opacity-1 opacity-70 shadow-lg bg-gray-500 text-gray-800 hover:bg-gray-100 -translate-y-40"
        >
          <ChevronLeft size={30} />
        </button>
      </div>
      <div className="col-start-7">
        <button
          onClick={next}
          className="p-1 rounded-full opacity-1 opacity-70 shadow-lg bg-gray-500 text-gray-800 hover:bg-gray-100 -translate-y-40"
        >
        <ChevronRight size={30} />
        </button>
      </div>  



      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div key={i}
            className={`
              transition-all w-3 h-3 bg-blue-400 rounded-full 
              ${curr === i ? "p-2" : "bg-opacity-50"}
            `}
            />
            ))}
        
        </div>
       
      </div>
      
    </div>
            </>
  )
}

const StatusForm = (pros) =>{
  const [text,setText] = useState(pros.status.status)

  
  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(pros.status.name)
   await axios.post(
     `http://localhost:4000/setStatus`,{
     
       name:pros.status.name,
       status:text
       
     }).then((res)=>{
    
       console.log(res.data)
 
   }).catch (err=> {console.log(err)})

    pros.setModalText({
     name:pros.status.name,
     status:text
    })
    
  
   
    pros.modalClose()
  }

  return (

    <div className='w-full grid grid-cols-6  '>
    <div className='col-start-6 pl-10'>
    <button className='hover:text-gray-400 hover:font-bold -translate-y-3' onClick={pros.modalClose}>X</button>
    </div>
  
  <div className='  pb-2 col-start-2 col-span-4 '>
  <h3 className='text-2xl font-semibold text-teal-400  '>{pros.status.name}, you are great!!</h3>
  </div>
  <div className='col-start-2 col-span-4'> 
  <form onSubmit={submitHandler}>
  
  <div >
  <textarea className='bg-gray-300 m-2  pr-5 rounded-md' id="content" cols="41" rows="5"  value={text} onChange={(e) => setText(e.target.value)}></textarea>

  </div>
  <div className='col-start-3  col-span-1 pb-3'>
  <button className='rounded bg-sky-400 p-1 pl-2 pr-2 shadow-md' type='submit'>submit</button>
  </div>
  </form>

  
  </div>

    
</div>
  )
}
export default Carousel
export {Carousel, StatusForm}