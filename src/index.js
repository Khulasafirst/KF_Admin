import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import PageNotFound from './components/pages/PageNotFound';
import App from './App';
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import News from './components/pages/News';
import SubStaff from './components/pages/SubStaff';
import AddSubStaff from './components/pages/Add_substaff'
import EditSubStaff from './components/pages/Edit_Substaff'
import City from './components/pages/City';
import State from './components/pages/State';
import Tags from './components/pages/Tags';
import Video from './components/pages/Video';
import Users from './components/pages/Users';
import Categories from './components/pages/Categories';
import Addnews from './components/pages/Addnews';
import Addcategories from './components/pages/Add_category';
import Addcity from './components/pages/Add_city.js';
import Addstate from './components/pages/Add_state';
import Addtags from './components/pages/Add_tags';
import Addvideo from './components/pages/Add_video';
import EditVideo from './components/pages/EditVideo';
import Editnews from './components/pages/Editnews';
import EditCategories from './components/pages/EditCategories';
import EditCity from './components/pages/EditCity';
import EditState from './components/pages/EditState';
import EditTags from './components/pages/EditTags';
import Login from './components/pages/Login';
import Advertisement from './components/pages/Advertisement';
import AddAdvertisement from './components/pages/Add_advertisement';
import EditAdvertisement from './components/pages/EditAdvertisement';
import Configuration from './components/pages/Configuration';
import AddConfiguration from './components/pages/Add_Config';
import EditConfiguration from './components/pages/Edit_config';
import Getallepaper from './components/pages/Epaper';
import Addepaper from './components/pages/Add_epaper';
import EpaperImageUpload from './components/pages/Epaper_uploadimage';
import Crop from './components/pages/Crop';
import OrderedNews from './components/pages/OrderedNews';
import Feedback from './components/pages/Feedback';
import ProtectedRoute from "./components/Template/ProtectedRoute";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <BrowserRouter basename="/headlines/">
     <ToastContainer />
        <Routes>
            <Route path="/" element={<App />}>
            <Route index path="login" element={<Login />} />
 {/* private start */}
 <Route element={<ProtectedRoute />}> 
                <Route index path="/" element={<Home />} />
                <Route index path="/dashboard" element={<Home />} />
                
                <Route index path="news" element={<News />} />
                <Route index path="city" element={<City />} />
                <Route index path="state" element={<State />} />
              
                <Route index path="tags" element={<Tags />} />
                <Route index path="video" element={<Video />} />
                <Route index path="crop" element={<Crop />} />
                <Route index path="substaff" element={<SubStaff />} />
                <Route index path="addstaff" element={<AddSubStaff />} />
                <Route index path="user" element={<Users />} />
                <Route index path="categories" element={<Categories />} />
                <Route index path="addcategories" element={<Addcategories />} />
                <Route index path="addcity" element={<Addcity />} />
                <Route index path="addstate" element={<Addstate />} />
                <Route index path="addtags" element={<Addtags />} />
                <Route index path="addvideo" element={<Addvideo />} />
                <Route index path="add-news" element={<Addnews />} />
                <Route index path="edit-news/:id" element={<Editnews />} />
                <Route index path="edit-Configuration/:id" element={<EditConfiguration />} />
                <Route index path="edit-city/:id" element={<EditCity />} />
                <Route index path="edit-Video/:id" element={<EditVideo />} />
                <Route index path="edit-state/:id" element={<EditState />} />
                <Route index path="edit-tags/:id" element={<EditTags />} />
                <Route index path="edit-Categories/:id" element={<EditCategories />} />
                <Route index path="edit-SubStaff/:id" element={<EditSubStaff />} />
                <Route index path="advertisement" element={<Advertisement />} />
                <Route index path="addadvertisement" element={<AddAdvertisement />} />
                <Route index path="edit-advertisement/:id" element={<EditAdvertisement />} />
                <Route index path="Configuration" element={<Configuration />} />
                <Route index path="addconfig" element={<AddConfiguration />} />
                <Route index path="getallepaper" element={<Getallepaper />} />
                <Route index path="addepaper" element={<Addepaper />} />
                <Route index path="epaperimageupload" element={<EpaperImageUpload />} />
                <Route index path="OrderedNews" element={<OrderedNews />} />
                <Route index path="Feedback" element={<Feedback />} />
             
             
                </Route>
                {/* private route end */}
                <Route path='*' element={<PageNotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

