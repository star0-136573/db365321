import { useState,useEffect } from 'react'; 
import axios from 'axios'

const Memo = (pros) =>{
  const [title,setTitle] = useState(pros.modalText.title)
  const [text,setText] = useState(pros.modalText.text)
 
  useEffect(()=>{
 
  axios.get(
    `http://localhost:4000/getMemo?id=${pros.id}`,).then((res)=>{
   
   setTitle(res.data.title)
   setText(res.data.text)

  }).catch (err=> {console.log(err)})},[pros.modalText]) 

  const memoHandler = (e) =>{
     console.log('click')
    
     console.log(pros.id)
     pros.modal()
     pros.setId(pros.id)
     pros.setModalText({
      title:title,
      text:text,
     })
  }
  return (
    
    <div onClick={memoHandler}  className={`inline-block rounded-lg  h-24 ${pros.color} grid  justify-center items-center text-center hover:shadow-xl `}>
     <div >
     <h3 className="font-bold text-md mb-2 text-gray-50  uppercase">{title}</h3>
     <div className=''>
  
     <p  className=' text-xs text-slate-400 text-center'>
      {text.length>30?text.substring(0,15)+'\n'+text.substring(15,30)+'...':text.substring(0,15)+'\n'+text.substring(15,30)}</p>
     </div>
     </div>
    
    </div>
    
    
  )

}

const MemoForm = (pros) =>{
  const [title,setTitle] = useState(pros.text.title)
  const [text,setText] = useState(pros.text.text)



   const submitHandler = async (e) =>{
    e.preventDefault()
     console.log(pros.id)
    await axios.post(
      `http://localhost:4000/setMemo`,{
        id:pros.id,
        title:title,
        text:text
      }).then((res)=>{
     
        console.log(res.data)
  
    }).catch (err=> {console.log(err)})

    pros.setModalText({
      title:title,
      text:text
     })
     
   
    
     pros.modalClose()
    
   }
  
  
  return   (       
  <div className='w-full grid grid-cols-6  bg-yellow-200 '>
    <div className='col-start-6 pl-10'>
    <button className='hover:text-gray-400 hover:font-bold -translate-y-3' onClick={pros.modalClose}>X</button>
    </div>
  
  <div className='col-start-3 pl-12 pb-2 col-span-1 '>
  <h3 className='text-2xl font-semibold text-gray-400  '>MEMO</h3>
  </div>
  <div className='col-start-2 col-span-4   '> 
  <form onSubmit={submitHandler}>
  <div >
  <input  className='border-1 m-2 bg-white rounded'id='title' type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
  </div>
  <div >
  <textarea className='border-1 m-2 bg-white rounded-md' id="content" cols="23" rows="4"  value={text} onChange={(e) => setText(e.target.value)}></textarea>

  </div>
  <div className='col-start-3  col-span-1 pb-3'>
  <button className='rounded bg-sky-400 p-1 pl-2 pr-2 shadow-md' type='submit'>submit</button>
  </div>
  </form>

  
  </div>

    
</div>
  )
}
export default Memo
export {Memo,MemoForm}
