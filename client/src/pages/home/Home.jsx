import { useEffect, useState, useContext } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import { Context } from "../../context/Context";


export default function Home() {
  const [cards, setCards] = useState([]);
  const { search } = useLocation();
  const { token } = useContext(Context);

  useEffect(() => {
    const fetchCards = async () => {
      const res = await axios.get("http://localhost:3000/api/cards" + search,
      {
        headers: {
          "Authorization": "Bearer " + token,
        }
      });
      setCards(res.data);
    };
    fetchCards();
  }, [search]);



  return (
    <>
      <Header />
      <div className="home">
        {<Posts posts={cards} />}
        <Sidebar />
      </div>
    </>
  );
}