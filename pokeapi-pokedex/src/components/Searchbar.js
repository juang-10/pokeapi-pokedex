import React from "react";
const {useState} = React;

const Searchbar = () => {
    const [search, setSearch] = useState('');
    const onChange = (e) => {
        setSearch(e.target.value);
    }
    
    return <div>
        <div>
            <input type="text" placeholder="Buscar Pokemon" onChange={onChange}
            />
        </div>
        <div>
            {search}
        </div>
    </div>;
}

export default Searchbar;