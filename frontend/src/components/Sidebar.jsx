import React, { useState } from "react";
import { NavLink, Link } from 'react-router-dom'
import "./Sidebar.css";
import { 
  UilBars,
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilCommentVerify,
  UilSignOutAlt
} from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
      <motion.div className='sidebar'
      variants={sidebarVariants}
      animate={window.innerWidth<=768?`${expanded}`:''}
      >
        <div className="menu">
          <NavLink
            className={selected === 'Dashboard' ? "menuItem active" : "menuItem"}
            key='Dashboard'
            to='/'
            onClick={() => setSelected('Dashboard')}
          >
            <UilEstate />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            className={selected === 'Products' ? "menuItem active" : "menuItem"}
            key='Products'
            to='/products'
            onClick={() => setSelected('Products')}
          >
            <UilPackage />
            <span>Products</span>
          </NavLink>
          <NavLink
            className={selected === 'Votes' ? "menuItem active" : "menuItem"}
            key='Votes'
            to='/votes'
            onClick={() => setSelected('Votes')}
          >
            <UilCommentVerify />
            <span>Votes</span>
          </NavLink>
          <NavLink
            className={selected === 'Community' ? "menuItem active" : "menuItem"}
            key='Community'
            to='/community'
            onClick={() => setSelected('Community')}
          >
            <UilUsersAlt />
            <span>Community</span>
          </NavLink>
          <NavLink
            className={selected === 'Analytics' ? "menuItem active" : "menuItem"}
            key='Analytics'
            to='/analytics'
            onClick={() => setSelected('Analytics')}
          >
            <UilChart />
            <span>Analytics</span>
          </NavLink>
          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
