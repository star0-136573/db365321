import {useContext} from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import {Link} from 'react-router-dom'
import {CgMenu} from 'react-icons/Cg'
import {RiDashboardFill,RiServiceFill} from 'react-icons/Ri'
import {FaRegChartBar} from 'react-icons/Fa'
// import {BsDatabaseFillLock} from 'react-icons/Bs'
import {BiLogOutCircle} from 'react-icons/Bi'
import {MdRateReview} from 'react-icons/Md'
import {VscProject} from 'react-icons/Vsc'
// import './Sidebar.css'
import { useState } from "react"
import { AuthContext } from '../context/AuthContxt'


const Sibar = () => {
  const [collapsed, setCollapsed] = useState(true);
  

  const roll =()=>{
      if(window.scrollY>98) setCollapsed(true)
  }
  window.addEventListener('scroll', roll)

  const auth = useContext(AuthContext)
  const LogoutHandler = () =>{
    auth.logout(false)
  }
   return (
  
  

    <div className='appdiv   z-10  '>

     {/* <Sidebar className="app" collapsed={collapsed}> */}
    <Sidebar 
     className='app '  width={170} collapsedWidth='55px'  collapsed={collapsed}>
      <Menu>
        <MenuItem className="menu1" icon={<CgMenu onClick={()=>{setCollapsed(!collapsed)}}/>}
                // component={<Link to="/" className="link" />}
                >

        </MenuItem>

        <MenuItem 
           component={<Link to="dashboard" className="link" />}
           icon={<RiDashboardFill />}> Dashboard </MenuItem>
      { (auth.role.toUpperCase()=='MANAGER') && <MenuItem 
        component={<Link to="customers" className="link" />}
        icon={<RiServiceFill/>}> Customers </MenuItem>}
        <MenuItem 
        component={<Link to="project" className="link" />}
        icon={<VscProject/>}> Project </MenuItem>
        {/* <SubMenu label="Charts"
         icon={<FaRegChartBar/>}>
          <MenuItem> Timeline Chart </MenuItem>
          <MenuItem> Bubble Chart </MenuItem>
        </SubMenu> */}
        <MenuItem label="Reviews"
        icon={<MdRateReview/>}  component={<Link to="Reviews" className="link" />}>
          Reviews
        </MenuItem>
        {/* <MenuItem> Transactions </MenuItem>
        <SubMenu label="Settings">
        <MenuItem> Account </MenuItem>
        <MenuItem> Privacy </MenuItem>
        <MenuItem> Notifications </MenuItem>
      </SubMenu> */}
        <MenuItem icon={<BiLogOutCircle/>} onClick={LogoutHandler} component={<Link to="/" className="link" />}> Logout </MenuItem>
      </Menu>
    </Sidebar>
        </div>
    
    

  
   )
};

export default Sibar;
