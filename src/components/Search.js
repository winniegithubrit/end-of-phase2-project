import React,{useState} from "react";

function Search({getSearch}){
const[search,setSearch]=useState("")
function handleSearch(e){
e.preventDefault()
getSearch(search)
}
  return(
    <div className="search">
      <form onSubmit={handleSearch}>
      <input type="text" id="search"value={search} placeholder="Enter animal name" onChange={e=>setSearch(e.target.value)}/><br></br>
      <button type="submit" id="looking">Search</button>
</form>
    </div>
  )
}
export default Search