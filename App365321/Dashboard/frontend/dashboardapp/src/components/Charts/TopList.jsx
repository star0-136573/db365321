

const TopList = () =>{
    const product = [
         {icon:'📱' ,product:'mobile' ,amount:'100k' } ,
         {icon:'🥿' ,product:'shoes' ,amount:'50k' } ,
,         {icon:'👕' ,product:'t-shirt' ,amount:'46k' } ,
         {icon:'🍺' ,product:'mug' ,amount:'30k' } ,
         {icon:'🕓' ,product:'clock' ,amount:'28k' } ,
,         {icon:'📚' ,product:'books' ,amount:'26k' }, 
,         {icon:'🍫' ,product:'chocolate' ,amount:'23k' } ,
         {icon:'☕' ,product:'coffee' ,amount:'19k' } ,
         {icon:'🌻' ,product:'flower' ,amount:'17k' } ,
         {icon:'🧩' ,product:'jigsaw' ,amount:'16k' } ,
         {icon:'🍪' ,product:'cookie' ,amount:'15k' } ,
         {icon:'🍦' ,product:'ice-cream' ,amount:'13k' } ,
         {icon:'⚽' ,product:'football' ,amount:'9k' } ,
    ]


     return (
        <div className="container flex mx-auto w-full   items-center justify-center">
        
        <ul className="flex flex-col w-full bg-gray-600 p-4  ">
             <li className='text-center text-lg pb-2 text-amber-500 font-bold uppercase drop-shadow-md   underline underline-offset-2'>Top Sales</li>
             {product.map((item,i)=>{ 
                 return (
             <li key={i} className="border-gray-400 flex flex-row mb-2">
               <div className="select-none cursor-pointer bg-slate-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                 <div className="flex flex-col rounded-md w-10 h-10 bg-yellow-50 justify-center items-center mr-4">{item.icon}</div>
                 <div className="flex-1 pl-1 mr-16">
                   <div className="font-medium text-gray-500  lowercase">{item.product}</div>
                   
                 </div>
                 <div className="text-gray-400 text-xs lowercase"><p>Amount</p> <span className='text-sky-700 font-medium text-sm '>{item.amount}</span></div>
               </div>
             </li>
              ) })
            }
         </ul>
         
       </div>



     )
}
export default TopList