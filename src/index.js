import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import './index.css';
import App from './App';
import Home from './page/Home';
import ErrorPage from './page/ErrorPage';
import Story from './page/Story';
import UserPage from './page/UserPage';
import Products from './page/Products';
import ProductDetail from './page/ProductDetail';
import Login from './page/Login';
import reportWebVitals from './reportWebVitals';
import EditUserName from './page/EditUserName';
import EditIntroduction from './page/EditIntroduction';
import EditProfileImage from './page/EditProfileImage';
import AddStory from './page/AddStory';
import AddProducts from './page/AddProducts';
import OneStoryPage from './page/OneStoryPage';



const router = createBrowserRouter([
  {
    path: "/",
    errorElement : <ErrorPage/>,    
    element: <App/>, //Navbar가 위치 해 있음
    children : [
      {index:true, element:<Home/>},
      {path:"story", element:<Story/>},
      {path:'join', element:<Login/>},
      {path:"me", element:<UserPage/>},
      {path:"me/editName", element:<EditUserName/>},
      {path:"me/edit-introduction", element:<EditIntroduction/>},
      {path:"me/edit-profile-image", element:<EditProfileImage/>},
      {path:"addProducts", element:<AddProducts/>},
      {path:"products", element:<Products/>},
      {path:"productDetail", element:<ProductDetail/>},
      {path:"me/add-story", element:<AddStory/>},
      {path:"mystory/:storyid", element:<OneStoryPage/>}
    ]
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
