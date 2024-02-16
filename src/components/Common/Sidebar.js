import React, { useContext } from 'react'; // Import useContext

import { Link, NavLink } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar';
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
  FaList,
  FaRegLaughWink,
  ImTable,
  HiTableCells,
  FaSearch,
  FaHeart,
  FaTable,
} from 'react-icons/fa';
import { ImStatsBars } from 'react-icons/im';
import { MdAddToPhotos } from "react-icons/md";

import { DiCodeigniter } from "react-icons/di";

import "./Sidebar.scss"
import RecordDrill from "../../pages/RecordDrill";
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa'; // Importing icons
import { FaSignOutAlt } from 'react-icons/fa'; // Importing logout icon
import { wordContext} from "../../contexts/wordContext";

const Sidebar = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange
}) => {


  const { isLoggedIn, setIsLoggedIn } = useContext(wordContext);

 // console.log(isLoggedIn)
  console.log("localstorage-token:  " ,localStorage.getItem('token'))

  const handleLogout = () => {
    localStorage.removeItem('accesstoken'); // Remove the token to handle logout
    setIsLoggedIn(false);

  };


  const style = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
    },
    link: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    },
    icon: {
      marginRight: '8px',
    },
    span: {
      fontSize: "15" ,
      fontWeight: 'bold', // Make text bold
      color: 'rgba(51, 0, 0, 1)', // Correct property for text color

    }
  };

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: '9px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 15,
                  letterSpacing: '1px'
                }}
              >
                The Test Grinder 
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
            suffix={<span className="badge red">NEW</span>}
          >
            Home 
            <NavLink to="/home" />
          </MenuItem>
          {/* <MenuItem icon={<FaGem />}>Components </MenuItem> */}
          <MenuItem icon={<MdAddToPhotos />}>
            Create cards  <Link to="/card_dashboard" />
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            Take Test <Link to="/Take_test" />
          </MenuItem>
          <MenuItem icon={< DiCodeigniter/>}>
            Start Drill <Link to="/TakeDrill" />
          </MenuItem>



          <SubMenu
              title={'Records'}
              icon={<FaTable />}
          >
            <MenuItem>
              Test-records <Link to="/ResultTable" />
            </MenuItem>
            <MenuItem>
              Drill-records <Link to="/Drill_table" />
            </MenuItem>

            <MenuItem>
              word-result records  <Link to="/WordResultTable" />
            </MenuItem>
          </SubMenu>

          <MenuItem icon={<ImStatsBars />}>
            Statistics <Link to="/statistics" />
          </MenuItem >


        
        
        </Menu>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter style={{ textAlign: 'center' }}>
        <div className="sidebar-btn-wrapper" style={{ padding: '20px' }}>
          {!isLoggedIn ? (
              // Render these buttons if the user is not logged in
              <>
                <div style={style.container}>
                  <Link to="/signin" className="sidebar-btn" style={style.link}>
                    <FaSignInAlt style={style.icon} />
                    <span style={style.span }>Sign In</span>
                  </Link>
                  <Link to="/signup" className="sidebar-btn" style={style.link}>
                    <FaUserPlus style={style.icon} />
                    <span style={style.span }>Sign up</span>
                  </Link>
                </div>
              </>
          ) : (
              // Render this link if the user is logged in
              <div style={style.container}>

                <Link className="sidebar-btn" style={{ cursor: 'pointer' }} to="/profile">
                  <FaUser />
                  <span>My Account</span>
                </Link>
                <Link className="sidebar-btn" onClick={handleLogout} to="/home">
                  <FaSignOutAlt />
                  <span> logout </span>
                </Link>
              </div>
          )}
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
