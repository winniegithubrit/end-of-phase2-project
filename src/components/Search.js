import React,{useState} from "react";
//search function that will be passed to the search form
function Search({getSearch}){
const[search,setSearch]=useState("")
function handleSearch(e){
e.preventDefault()
getSearch(search)
}
  return(
    <div className="search">
      {/* search form where one can input the search details */}
      <form onSubmit={handleSearch}>
      <input type="text" id="search"value={search} placeholder="Enter animal name" onChange={e=>setSearch(e.target.value)}/><br></br>
      {/* the search button */}
      <button type="submit" id="looking">Search</button>
</form>
    </div>
  )
}
export default Search