import { useState, useCallback,createContext,useContext,useEffect} from 'react';
import { BrowserRouter, Routes, Route, useNavigate 
   } from 'react-router-dom'



import Footer from './components/Footer'
import Sibar  from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Reviews from './pages/Reviews'
import Customers from './pages/Customers'
import Login from './pages/Login'
import Project from './pages/Project'
import {AuthContext} from './context/AuthContxt'
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('Hello');
  const [role, setRole] = useState('');
  const auth = useContext(AuthContext)
  let pageShow
  const login = useCallback(data => {
   
    localStorage.setItem('token',data.token)
    setIsLoggedIn(data.auth)
    setRole(data.role)
  
    setUser(data.name)
  
    
  }, [])
  const logout = useCallback(user => {
    
    setIsLoggedIn(false)
   
  }, [])

  
  const [time,setTime] = useState(new Date())

  useEffect(()=>{
      setInterval(() =>{ 
       setTime(new Date())
      
  }, 1000);
  },[])


  if(isLoggedIn){
  pageShow = (  
  <BrowserRouter >
  <div className=' bg-gray-600'>
  <div className='grid grid-cols-12 gap-4  pt-5 '>
  <span className="text-lg text-center col-start-6 font-semibold inline-block py-1 px-2 uppercase rounded-full text-slate-400 bg-orange-300 uppercase last:mr-0 mr-1">
 {user}
</span>
  <span className="text-lg col-end-11 col-span-1 font-semibold inline-block py-1 px-5 uppercase rounded-lg text-stone-600 bg-stone-200 uppercase last:mr-0 mr-1">
  {time.toLocaleDateString('en-GB')} 
 </span>   
  <span className="text-md text-center col-end-12  col-span-1  font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200 uppercase last:mr-0 mr-1">
       {time.toLocaleTimeString('en-GB')}  </span> 
  </div>
  <Sibar/>
    <section className='bg-gray-600 ' >
   <Routes>
     <Route path="/" element={<Dashboard />}/>
     <Route path="dashboard" element={<Dashboard />}/>
     <Route path="project" element={<Project/>}/>
   {(role.toUpperCase()=='MANAGER')  &&<Route path="customers" element={<Customers />}/>}
  
     <Route path="Reviews" element={<Reviews />}/>
   

   </Routes>
    </section>
    
   <Footer/>
   </div>

   </BrowserRouter>
  )
  }else{
    pageShow =   <Login/>
  }
  return (
   
   <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout:logout,role:role}}>

   {pageShow}
   </AuthContext.Provider>
    
   

   
  
  );
};

export default App;
