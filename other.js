"homepage":"http://new.khulasafirst.com/headlines/"


// "homepage": "http://localhost:3000/Khulasaadmin/",
// "proxy": "http://localhost:8080",

// "homepage":"http://206.189.130.102/Khulasaadmin/"
// "proxy": "http://localhost:9000",
// "homepage": "http://localhost:3000/Khulasaadmin/",

// 1)htaccess 
// 2).export const exportVariable = localVariable;
// 3)package json   // "homepage": "http://localhost:3000/Khulasaadmin/",
                    // "homepage":"http://206.189.130.102/Khulasaadmin/"
 import { toast } from "react-toastify";
 import loaderimg from "../../assets/image/loader.gif";
                    
 const [showloader, setShowLoader] = useState("none");
 setShowLoader("block");

 toast.success("Data Add Successful...");
 setShowLoader("none");

 setShowLoader("none");
 toast.error("Invalid Credentials...");
 
 
 async
 const fetchdata =
 const response = await fetchdata;
 const res = await response.json();

 if (response.status === 200) {
   toast.success("Data Add Successfully...");
setShowLoader("none");

 // navigate("/tags");
 } else {
   setShowLoader("none");
toast.error("Invalid Credentials...");
 }