import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">Application</span>
      </div>
      <img
        className="headerImg"
        src="https://images.pexels.com/photos/1076885/pexels-photo-1076885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Home page picture"
      />
    </div>
  );
}