import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./singlePost.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";


export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [card, setCard] = useState({});
  const PF = "http://localhost:3000/images/";
  const { user, token } = useContext(Context);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);


useEffect(()=>{
  const getCard = async ()=>{
    const res = await axios.get("http://localhost:3000/api/cards/" + path, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    });
    setCard(res.data)
    setTitle(res.data.title)
    setAddress(res.data.address)
    setPhone(res.data.phone)
    setDesc(res.data.desc)
  };
  getCard()
},[path])

const handleDelete = async ()=>{
  try{
     await axios.delete(`http://localhost:3000/api/cards/${card._id}`, {
       data: { username:user.username },
       headers: {
        'Authorization': 'Bearer ' + token,
       }
      });
     window.location.replace("/")
  }catch(err){
    console.log(err)
  }}

  const handleUpdate = async ()=>{
    try{
      await axios.put(`http://localhost:3000/api/cards/${card._id}`, {      
        username:user.username,
        title,
        address,
        phone,
        desc,
      }, {
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      });
      setUpdateMode(false)
    }catch(err){
      console.log(err)
    }}

  return (
    <div className="singlePost">
       <div className="singlePostWrapper">
         {card.photo && 
         <img src ={PF + card.photo} 
         alt={card.title}
         className = "singlePostImg"/>
         } 
         {
           updateMode ? <input type="text" className="singlePostTitleInput" autoFocus value={title} onChange={(e)=>setTitle(e.target.value)}/> : (
             <h1 className="singlePostTitle">{title}
              {card.username === user?.username && (
                <div className="singlePostEdit">
               <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
               <i className="singlePostIcon  far fa-trash-alt" onClick={handleDelete}></i>
           </div>
              )}
           
           </h1>
           )
         }
           
           <div className="singlePostInfo">
               <span className="singlePostUser">User: 
               <Link to={`/?user=${card.username}`}>
                {card.username}
               </Link>
               
               </span>
               <span className="singlePostDate">{new Date(card.createdAt).toDateString()}</span>
           </div>

          {
            updateMode ? (
              <input type="text" className="singlePostTitleInput" value={address} onChange={(e)=>setAddress(e.target.value)}/>
            ) : (
              <p className="singlePostInfo">Address: {address}</p>
            )}
           
           {
             updateMode ? (
              <input type="text" className="singlePostTitleInput" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
             ) : (
               <p className="singlePostInfo">Phone: {phone}</p>
             )}
           
           {
             updateMode ? (
             <textarea className="singlePostTitleInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
              ) : (
                <p className="singlePostDesc">{desc}</p>
              )}
              { updateMode && 
              <button className="singlePostButton" onClick={handleUpdate} >Update</button>
              }
       </div>
    </div>
  );
}