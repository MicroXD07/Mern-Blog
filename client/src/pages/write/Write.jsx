import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";

export default function Write() {
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [desc, setDesc] = useState("")
    const [file, setFile] = useState(null)
    const { user, token } = useContext(Context)

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newCard = {
            username:user.username,
            title,
            address,
            phone,
            desc
        }
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newCard.photo = filename;

            try{
              await axios.post("http://localhost:3000/api/upload", data, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
              })

            }catch(err){
               console.log(err)
            }
        }
        try{
          const res = await axios.post("http://localhost:3000/api/cards", newCard, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
          })
          window.location.replace("/")

        }catch(err){
            console.log(err)
        }

       
    }
  return (
    <div className="write">
        {file &&
         <img className="writeImg" src={URL.createObjectURL(file)} alt="card picture" />
        }
       
       <form className="writeForm" onSubmit={handleSubmit}>
           <div className="writeFormGroup">
               <span>Upload image:</span>
               <label htmlFor="fileInput">
                   <i className="writeIcon fas fa-plus"></i>
               </label>
               <input type="file" id="fileInput" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
               <input type="text" placeholder="Enter your title..." 
               className="writeTitleInput" autoFocus={true} onChange={e=>setTitle(e.target.value)}/>
               <input type="text" placeholder="Enter your address..." 
               className="writeInput" onChange={e=>setAddress(e.target.value)}/>
               <input type="text" placeholder="Enter your phone number..." 
               className="writeInput" onChange={e=>setPhone(e.target.value)}/>
           </div>
           <div className="writeFormGroup">
               <textarea placeholder="Tell us about your business..."
                type="text" className="writeInput writeText" onChange={e=>setDesc(e.target.value)}></textarea>
           </div>
           <button className="writeSubmit" type="submit">Publish</button>
       </form>
    </div>
  );
}