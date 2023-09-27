import {useState} from 'react'
import p1 from '../assets/avatar1.jpg'
import p3 from '../assets/avatar3.jpg'
import p4 from '../assets/avatar4.jpg'
import p6 from '../assets/avatar6.jpg'
import p7 from '../assets/avatar7.jpg'

import Donut,{Donut2} from '../components/Charts/Donut'
import Line from '../components/Charts/LineChart'
import Metrics from '../components/Charts/Metrics'
import Bubble from '../components/Charts/Bubble'
import TopList from '../components/Charts/TopList'
import Carousel, {StatusForm} from '../components/Charts/Carousel'
import Work from '../components/Work'
import Modal from '../components/Modal'
import Memo,{MemoForm} from '../components/Memo'


const client = [
  {color:'bg-blue-300', im:p1, name:'Tom' },
  {color:'bg-pink-500', im:p4, name:'Linda'},
  {color:'bg-yellow-300', im:p7, name:'Boris'},
  {color:'bg-teal-600', im:p6, name:'Tony', },
  {color:'bg-slate-700', im:p7, name:'Mike', },
  {color:'bg-rose-400', im:p6, name:'John',},
  {color:'bg-sky-600', im:p7, name:'Ada' },
  {color:'bg-pink-400', im:p6, name:'James'},
  {color:'bg-blue-900', im:p3, name:'Lisa'},
  {color:'bg-amber-500', im:p7, name:'Mandy'},
  {color:'bg-orange-700', im:p4, name:'Sue'},
  {color:'bg-rose-300', im:p7, name:'Peter'},
]

const memoboard = [
  {id:1,position:' rotate-[25deg] z-10 bg-sky-400/80 shadow-lg ', color:'bg-sky-300' },
  {id:2,position:' rotate-[-6deg]  bg-blue-300 shadow-md '  ,color:'bg-blue-200' },
  {id:3,position:' rotate-[15deg]  bg-rose-400 shadow translate-x-2 translate-y-3 ' ,color:'bg-rose-300' },
  {id:4,position:' rotate-[-7deg]  bg-gray-200 scale-y-[1.40] scale-x-110 shadow   translate-x-3' ,color:'bg-gray-50' },
  {id:5,position:' rotate-[2deg]  bg-cyan-300 shadow translate-y-1 translate-x-3 ' ,color:'bg-cyan-200' },
  {id:6,position:' rotate-[-4deg] z-10 bg-slate-400 shadow-lg translate-y-7 ' ,color:'bg-slate-300' },
  {id:7,position:' rotate-[5deg] z-10 bg-sky-400 shadow-md translate-y-2 translate-x-12' ,color:'bg-sky-300/30' },
  {id:8,position:' rotate-[-4deg] z-[8] bg-rose-400 shadow-md -translate-y-2 translate-x-10 ' ,color:'bg-rose-300/60' },
  {id:11,position:'none'  },
  {id:9,position:' rotate-[9deg]  bg-teal-300 shadow -translate-y-3 translate-x-3  ', color:'bg-teal-200'  },
  {id:10,position:' rotate-[-2deg]  bg-indigo-400 shadow -translate-y-6 translate-x-5 ',color:'bg-indigo-300 rounded-full' },

]

const Dashboard = () => { 
   const [modal,setModal] = useState(false)
   const [cModal,setCModal] = useState(false)
   const [memoId,setMemoId] = useState('1')
   const [modalText, setModalText] = useState({
    title:'TI',
    text:'COT'
   })
   const [status,setStatus] = useState({
     name:'',
     status:'i am working'
   })
  

    
  return (
    
<>
<div className="md:container md:mx-auto px-4 pb-3 md ">


</div>

<div className="md:container md:mx-auto bg-gray-100 px-4 md border-r-2 border-1 ">


    <div className="grid-cols-4 pt-8 p-12 space-y-2  lg:space-y-0 lg:grid lg:gap-10 grid-rows-16 ">
        
         
        <div  className="w-full h-48 rounded-lg" >
          
        <Metrics title='revenue '>£31.1M</Metrics>
        </div>
            
        <div className="w-full h-48 rounded-lg ">
                  <Metrics title='profit '>£8M</Metrics>
        </div>
        <div className="w-full rounded-lg ">
        <Metrics title='order '>26.6k</Metrics>
        </div>
        <div className="w-full rounded-lg">
           <Metrics title='return rate '>2.1%</Metrics>
        </div>
        <div className="w-full z-0 col-span-3 row-span-2 rounded-lg border-b-1 border-r-1 border-slate-300  ">
        <Line className='z-0'/>
        </div>
        <div className="w-full  rounded-lg gap-y-px">
            
            <Donut />
            
          
        </div>
        <div className="w-full rounded-lg ">
        <Donut2  />
        </div>
        <div className="w-full col-span-2 row-span-2 rounded-lg ">
           <Bubble/>
        </div>
        <div className="w-full row-span-2 h-[25rem] scrollbar-thin overflow-y-scroll rounded-lg border-l-2 border-t-2">
            <TopList/>
                
        </div>
        <div className="w-full  row-span-2 rounded-lg bg-amber-100 ">
          <div className='grid grid-cols-3  gap-2'>
           
          {...memoboard.map((item,i)=>{if(item.position!=='none') return <div key={i} id={item.id}   className={item.position}><Memo id={item.id} modal={()=>setModal(true)} modalText={modalText} setModalText={(t)=>setModalText(t)} setId={(id)=>setMemoId(id)} color={item.color}/></div>; else return <div></div>})}

           <div className='translate-x-3 -translate-y-2 bg-btn1 bg-cover' >
           {/* <div className='translate-x-3 -translate-y-2 bg-btn1 bg-cover hover:bg-btn2 ' > */}
          
            
            </div>


           {modal &&<Modal>
            <MemoForm id={memoId} text={modalText}  setModalText={(t)=>setModalText(t)} modalClose={()=>{setModal(false)}}/>
            
            </Modal>}

 
         
           </div> 
        </div>
       
      
        <div className="w-full col-span-4 rounded-lg ">
        <Carousel>
        
          {...client.map((item,i)=><div key={i} className="w-full rounded-lg shadow-lg bg-white hover:shadow-xl hover:shadow-gray-500 hover:z-0">
            <Work  color={item.color} im={item.im} name={item.name} status={status} setStatus={t=>setStatus(t)} openModal={()=>setCModal(true)}/>
            </div>)}
       
       {/* {...slides.map( i=> <img className=' pr-2 shadow-lg rounded-lg shadow-slate-600 hover:shadow-orange-600'  src={i}/>)} */}
       </Carousel>
        </div>
        {cModal &&<Modal>
          <StatusForm modalClose={()=>{setCModal(false)}} status={status} setModalText={(t)=>setStatus(t)}/>
            </Modal>}
    </div>  
    
  </div>
   
</>

   

  );
};

export default Dashboard;
