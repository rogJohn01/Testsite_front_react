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

import { DiCodeigniter } from "react-icons/di";

import "./Sidebar.scss"
import RecordDrill from "../../pages/RecordDrill";


const Sidebar = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange
}) => {
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
        <div className="sidebar-btn-wrapper" style={{ padding: '16px' }}>
          <Link
            className="sidebar-btn"
            style={{ cursor: 'pointer' }}
            to="/profile"
          >
            <FaUser />
            <span>My Account</span>
          </Link>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
