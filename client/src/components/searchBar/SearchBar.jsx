import React, {useState} from "react";
import "./searchBar.css";

function SearchBar(props) {
    const [searchTerms, setSearchTerms] = useState("");

    const onChangeSearch = (e) => {
        setSearchTerms(e.currentTarget.value)

        props.refreshFunction(e.currentTarget.value)
    }

    return (
        <div>
          <input
             value={searchTerms}
             className="searchBar"
             placeholder="Search..."
             onChange={onChangeSearch}
             />
          </div>
    )
}

export default SearchBar