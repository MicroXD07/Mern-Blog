import Card from "../card/Card";
import { useState } from "react";
import "./posts.css";

export default function Posts({ posts }) {
  const [query, setQuery] = useState("");
 
  return (
<>
    <div className="wrap">
    <div className="search">
      <input type="text" className="searchTerm" 
      placeholder="Search for cards..."
      onChange={(e) => setQuery(e.target.value)}/>
    </div>
   </div>
    <div className="posts">
      {posts.filter(card=>card.title.toLowerCase()
      .includes(query)).map((p) => (
        <Card key={p._id} card={p} />
      ))}
    </div>
    </>
  );
}