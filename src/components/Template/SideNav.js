import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import loaderimg from "../../assets/image/loader.gif";

// const URL = process.env.REACT_APP_URL;

const SideNav = ({ isActive3 }) => {
  const [mobile, setMobile] = useState(window.innerWidth <= 500);
  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 500);
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);
  //  const [openclose,setOpenClose]=useState('sidebar-mini layout-fixed sidebar-collapse');

  //  const closeSidebar = () =>{
  //   setOpenClose('sidebar-mini layout-fixed sidebar-collapse');
  //  }
  //  const openSidebar = () =>{
  //   setOpenClose('sidebar-mini layout-fixed');
  //  }
    //sidebar-mini layout-fixed sidebar-collapse     <<close
    // sidebar-mini layout-fixed                        << Open

   const [isActive,setisActive]=useState(1);
   const setdataActive = (n) =>{
   setisActive(n);
  
   }
  
  const permission = localStorage.getItem("permission");
  const x = permission;

  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();

    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  
  return (
    <>
      {/* <!-- Main Sidebar Container --> */}
      {/* <aside class="main-sidebar  elevation-4"> */}
     
      {/* style={`display:${isActive}`} */}
      <aside class={`main-sidebar  elevation-4 `} >
        {/* <!-- Brand Logo --> */}
        <Link to="/" class="brand-link">
          <img src={require('../img/khulasalogo.png')} alt="Khulasa News" className="brand-image " style={{ opacity: ".8" }} />
          <span class="brand-text font-weight-light">.</span>
        </Link>

        {/* <!-- Sidebar --> */}
        {/* class={`sidebar ${
        isActive === "active" ? "sidebar-closed sidebar-collapse" : ""
      }`} */}
        <div class="sidebar" >
          {/* <!-- Sidebar user panel (optional) --> */}
          {/* <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
              <img src={require('../img/user2-160x160.jpg')} class="img-circle elevation-2" alt="UserImage" />
            </div>
            <div class="info">
              <Link to='/' class="d-block">Alexander Pierce</Link>
            </div>
          </div> */}

          {/* <!-- SidebarSearch Form --> */}
          {/* <div class="form-inline">
            <div class="input-group" data-widget="sidebar-search">
              <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div class="input-group-append">
                <button class="btn btn-sidebar">
                  <i class="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div> */}

          {/* <!-- Sidebar Menu --> */}
          <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* <!-- Add icons to the links using the .nav-icon class
                 with font-awesome or any other icon font library --> */}

              <li class="nav-item ">
              
                <Link to='/' className={`nav-link ${isActive === 1 ?'active':null}`} data-widget={`${mobile?'pushmenu':''}`}  
          onClick={()=>setdataActive(1)}
          >
                  <i class="nav-icon fas fa-th"></i>
                  <p>
                   Dashboard 
                   
                  </p>
                </Link>
              </li>
              {x.includes("1") ? (  <li class="nav-item">
                <Link to='/substaff' onClick={()=>setdataActive(2)} className={`nav-link ${isActive === 2 ?'active':null}`}  data-widget={`${mobile?'pushmenu':''}`}>
                  <i class="nav-icon fas fas fa-user-friends"></i>
                  <p>
                  Sub Staff
                   
                  </p>
                </Link>
              </li> ) : (
          ""
        )}
        {x.includes("4") ? (
              <li class="nav-item">
                <Link to='/user' onClick={()=>setdataActive(3)} className={`nav-link ${isActive === 3 ?'active':null}`}  data-widget={`${mobile?'pushmenu':''}`}>
                  <i class="nav-icon fas fa-user"></i>
                  <p>
                  Users
                   
                  </p>
                </Link>
              </li> ) : (
          ""
        )}
        {x.includes("5") ? (
              <li class="nav-item">
                <Link to='/getallepaper' onClick={()=>setdataActive(4)} className={`nav-link ${isActive === 4 ?'active':null}`}  data-widget={`${mobile?'pushmenu':''}`}>
                  <i class="nav-icon fas fa-user"></i>
                  <p>
                  Epaper
                   
                  </p>
                </Link>
              </li> ) : (
          ""
        )}
        {x.includes("6") ? (
              <li class="nav-item">
                <Link to='/categories' onClick={()=>setdataActive(5)} className={`nav-link ${isActive === 5 ?'active':null}`}  data-widget={`${mobile?'pushmenu':''}`}>
                  <i class="nav-icon fas fa-list-alt"></i>
                  <p>
                   Categories
                   
                  </p>
                </Link>
              </li> ) : (
          ""
        )}
        {/* {x.includes("2") ? (
              <li class="nav-item">
                <Link to='/tags' class="nav-link">
                  <i class="nav-icon fas fa-tag"></i>
                  <p>
                   Tags
                   
                  </p>
                </Link>
              </li> ) : (
          ""
        )} */}
        {x.includes("2") ? (
              <li class="nav-item">
                <Link to='/news' onClick={()=>setdataActive(6)} className={`nav-link ${isActive === 6 ?'active':null}`}  data-widget={`${mobile?'pushmenu':''}`}>
                  <i class="nav-icon fas fa fa-newspaper"></i>
                  <p>
                    News
                   
                  </p>
                </Link>
              </li> ) : (
          ""
        )}
        {x.includes("2") ? (
              <li class="nav-item">
                <Link to='/OrderedNews' onClick={()=>setdataActive(12)} className={`nav-link ${isActive === 12 ?'active':null}`}  data-widget={`${mobile?'pushmenu':''}`}>
                  <i class="nav-icon fas fa fa-newspaper"></i>
                  <p>
                  OrderedNews
                   
                  </p>
                </Link>
              </li> ) : (
          ""
        )}
        {x.includes("3") ? (
              <li class="nav-item">
                <Link to='/video' onClick={()=>setdataActive(7)} className={`nav-link ${isActive === 7 ?'active':null}`}  data-widget={`${mobile?'pushmenu':''}`}>
                  <i class="nav-icon fas fa fa-video"></i>
                  <p>
                  Videos
                 
                  </p>
                </Link>
              </li> ) : (
          ""
        )}
        {x.includes("9") ? (
             
              <li class="nav-item">
                <Link to='/city' onClick={()=>setdataActive(8)} className={`nav-link ${isActive === 8 ?'active':null}`}  data-widget={`${mobile?'pushmenu':''}`}>
                  <i class="nav-icon fas fa-city"></i>
                  <p>
                   City
                   
                  </p>
                </Link>
              </li> ) : (
          ""
        )}
        {x.includes("10") ? (
              <li class="nav-item">
                <Link to='/state' onClick={()=>setdataActive(9)} className={`nav-link ${isActive === 9 ?'active':null}`}  data-widget={`${mobile?'pushmenu':''}`}>
                  <i class="nav-icon fas fa-flag"></i>
                  <p>
                   State
                   
                  </p>
                </Link>
              </li> ) : (
          ""
        )}
        {x.includes("7") ? (
              <li class="nav-item">
                <Link to='/advertisement'  onClick={()=>setdataActive(10)} className={`nav-link ${isActive === 10 ?'active':null}`}  data-widget={`${mobile?'pushmenu':''}`}>
                  <i class="nav-icon fas fa-ad"></i>
                  <p>
                   Advertisement                  
                  </p>
                </Link>
              </li> ) : (
          ""
        )}
        {x.includes("8") ? (
              <li class="nav-item">
                <Link to='/Configuration' onClick={()=>setdataActive(13)} className={`nav-link ${isActive === 13 ?'active':null}`}  data-widget={`${mobile?'pushmenu':''}`}>
                  <i class="nav-icon fas fa fa-cog"></i>
                  <p>
                  Configuration                  
                  </p>
                </Link>
              </li> ) : (
          ""
        )}
        
        {x.includes("11") ? (
              <li class="nav-item">
                <Link to='/Feedback' onClick={()=>setdataActive(11)} className={`nav-link ${isActive === 9 ?'active':null}`}  data-widget={`${mobile?'pushmenu':''}`}>
                  <i class="nav-icon fas fa-flag"></i>
                  <p>
                  Feedback
                   
                  </p>
                </Link>
              </li> ) : (
          ""
        )}

              <li class="nav-item">
                <Link to=''  class="nav-link" onClick={logout}>
                  <i class="nav-icon fas fa-sign-out-alt"></i>
                  <p>
                   Logout                  
                  </p>
                </Link>
              </li>
         
       
            </ul>
          </nav>
          {/* <!-- /.sidebar-menu --> */}
        </div>
        {/* <!-- /.sidebar --> */}
      </aside>

    </>
  )
}

export default SideNav