import { Link } from "react-router-dom";
import "./card.css";

export default function Card({ card }) {
  const PF = "http://localhost:3000/images/";
  return (
    <div>
      <div className="card">
        <Link to={`/post/${card._id}`} className="link">
          {card.photo && (
            <img className="postImg" src={PF + card.photo} alt={card.title} />
          )}

          <div className="postInfo">
            <div className="postCats">
              {card.categories.map((c) => (
                <span className="postCat">{c.name}</span>
              ))}
            </div>
            <h5 className="postTitle">{card.title}</h5>
            <p className="postDesc  pt-2">
              <b>Tel: </b>
              {card.phone}
              <br />
              <b>Address: </b>
              {card.address}
            </p>
            <p className="postDesc">{card.desc}</p>
            <span className="postDate">
              {new Date(card.createdAt).toDateString()}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
