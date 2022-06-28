import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./sidebar.css";

export default function Sidebar() {
    const [cats, setCats] = useState([]);
    const { token } = useContext(Context);

    useEffect(()=>{
       const getCats = async ()=>{
           const res = await axios.get("http://localhost:3000/api/categories", {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
           });
           setCats(res.data)
       }
       getCats();
    },[])
  return (
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">About This App</span>
            <img className="sidebarImg"
             src="https://www.appstudio.ca/blog/wp-content/uploads/2020/10/Mern-Stack-Development-in-Canada.jpg"
             alt="Mern-stack about picture"/>
             <p>
                 This app was built by Emanuel Epshtein, with the help of "Lama Dev" from Youtube.
                 <br/>
                 For building this app i used: React, Node.js, express and MongoDB. 
             </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">Categories</span>
            <ul className="sidebarList">
              {cats.map((c,i)=>(
                  <Link key={i} to={`/?cat=${c.name}`}>
                     <li key={c.name} className="sidebarListItem link">{c.name}</li>
                  </Link>
              ))}
                
            </ul>
        </div> 
        <div className="sidebarItem">
            <span className="sidebarTitle">Follow Me</span>
            <div className="sidebarSocial">
                <i  className="sidebarIcon fab fa-facebook-square"></i>
                <i  className="sidebarIcon fab fa-linkedin"></i>
                <i  className="sidebarIcon fab fa-pinterest-square"></i>
                <i  className="sidebarIcon fab fa-instagram-square"></i>
            </div>
        </div>
    </div>
  );
}