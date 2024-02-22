import React ,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom'
// import { toast } from "react-toastify";
// import loaderimg from "../../assets/image/loader.gif";

const URL = process.env.REACT_APP_URL;

const TopNavbar = () => {
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

  
  return (
   <>
      {/* <!-- Navbar --> */}
      <nav class="main-header navbar navbar-expand navbar-white navbar-light bg_redcolor">
        {/* <!-- Left navbar links --> */}
        <ul class="navbar-nav">
          <li class="nav-item">
          {/* {mobile?<Link class="nav-link" data-widget="pushmenu" to="" role="button"><i class="fas fa-bars"></i></Link>:'.'}    */}
          
          </li>
          {/* <li class="nav-item d-none d-sm-inline-block">
            <Link to="/" class="nav-link">Home</Link>
          </li>
          <li class="nav-item d-none d-sm-inline-block">
            <Link to="/" class="nav-link">Contact</Link>
          </li> */}
        </ul>

        {/* <!-- Right navbar links --> */}
        <ul class="navbar-nav ml-auto">
          {/* <!-- Navbar Search --> */}
          <li class="nav-item">
            {/* <Link class="nav-link" data-widget="navbar-search" to="/" role="button">
              <i class="fas fa-user"></i>
            </Link> */}
            {mobile?<Link class="nav-link" data-widget="pushmenu" to="" role="button"><i class="fas fa-bars"></i></Link>:'.'}   
          
            {/* <div class="navbar-search-block">
              <form class="form-inline">
                <div class="input-group input-group-sm">
                  <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                  <div class="input-group-append">
                    <button class="btn btn-navbar" type="submit">
                      <i class="fas fa-search"></i>
                    </button>
                    <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div> */}
          </li>

       
          
        </ul>
      </nav>
      {/* <!-- /.navbar --> */}
      </>
  )
}

export default TopNavbar