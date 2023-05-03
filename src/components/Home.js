

import React,{useState,useEffect} from "react"
import { Link } from 'react-router-dom';
import AddAnimal from "./AddAnimal"
import Search from "./Search";
import UpdateAnimal from "./UpdateAnimal";

function Home(){
  const [animals,setAnimals] = useState([])
  const [totalLikes,setTotalLikes] =useState(0)
  const[selectedBreed,setSelectedBreed]= useState("All")
   const [showForm, setShowForm] = useState(false);

  function handleUpdateClick() {
    setShowForm(true);
  }
  // const [showDetails, setShowDetails] = useState(false);

  const allBreeds=[
    "Dog",
    "Cat",
    "Horse",
    "Rabbit",
    "Panda",
    "Bird",
]
 
useEffect(() => {
  // fetch animals data
  fetch("http://localhost:3000/animals")
    .then((response) => response.json())
    .then((data) =>
      setAnimals(
        data.map((animal) => ({
          ...animal,
          liked: false, // here we are adding the like state to each animal
        }))
      )
    )

  // fetch likes data
  fetch("http://localhost:3000/likes")
    .then((response) => response.json())
    .then((data) => {
      const likes = data.reduce(
        (acc, cur) => ({ ...acc, [cur.animalId]: cur.likes }),
        {}
      )
      setTotalLikes(likes)
    })
}, [])


  
  //handling the delete function
  function handleDelete(id){
fetch(`http://localhost:3000/animals/${id}`,{
  method:"DELETE",
})
.then(()=>{
  setAnimals(animals.filter((animal)=> animal.id !== id))
})
  }
  //handling the like function for the likes in the web app
  
  function handleLike(id) {
    setTotalLikes((prevLikes) => {
      const newLikes = { ...prevLikes, [id]: (prevLikes[id] || 0) + 1 };
      fetch(`http://localhost:3000/animals/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likes: newLikes[id],
        }),
      }).then((response) => response.json());
      return newLikes;
    })
  
    setAnimals((prevAnimals) =>
      prevAnimals.map((animal) =>
        animal.id === id ? { ...animal, liked: !animal.liked } : animal
      )
    );
  }
  

  
  //on line 41 we are displaying the number of total likes
  function fetchSearch(search){
const results=animals.filter(animal=>animal.name === search)
setAnimals(results)
  }
  function handleBuy(id) {
  const animal = animals.find(animal => animal.id === id);

  fetch(`http://localhost:3000/animals/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...animal,
      AvailabilityStatus: "not available already bought",
      disabled:true,
    })
  })
  .then(response => response.json())
  .then(data => {
    setAnimals(animals.map(animal => {
      if (animal.id === id) {
        return {
          ...animal,
          AvailabilityStatus: data.AvailabilityStatus,
          disabled:true,
        };
      } else {
        return animal;
      }
    }));
  })
  
}
function handleBreed(e){
  setSelectedBreed(e.target.value)
}
//   function handleShowDetails(id) {
//   setAnimals(prevAnimals =>
//     prevAnimals.map(animal =>
//       animal.id === id ? { ...animal, showDetails: !animal.showDetails } : animal
//     )
//   );
// }


  return(
    <div className="home-animal-card" >
      <header> THE PET KINGDOM </header>
      <Search getSearch={fetchSearch}/>
      <label className="filter">
  Filter by breed:
  <select value={selectedBreed} onChange={handleBreed} className="select">
    {allBreeds.map((breed) => (
      <option key={breed} value={breed}>
        {breed}
      </option>
    ))}
  </select>
</label>

<ul>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contacts">Contact Us</Link></li>
</ul>
<div className="animal-container" >
    {/* Filter animals based on breed */}
    {animals  
      .filter((animal) => selectedBreed === "All" || animal.breed === selectedBreed)
      .map((animal) => {
        const likeButton = animal.liked ? "Liked" : "Like";
        return (
          <div className={`animal-card ${animal.disabled ? "disabled" : ""}`}>
            <img src={animal.image} alt={animal.name} />
            <h3>NAME: {animal.name}</h3>
            <h3>BREED: {animal.breed}</h3>
            <h3>AGE: {animal.age}</h3>
            {/* {showDetails && (<div className="showdetails"> */}
            <h3>GENDER: {animal.gender}</h3>
            <h3>SIZE: {animal.size}</h3>
            <h3>WEIGHT: {animal.weight}</h3>
            <h3>PERSONALITY: {animal.personality}</h3>
            <h3>HEALTH:{animal.healthStatus}</h3>
            <h3>STATUS: {animal.AvailabilityStatus}</h3>
            {/* </div>)} */}
            <button type="submit" onClick={() => handleBuy(animal.id)}>
              Buy
            </button>
            <button onClick={() => handleLike(animal.id)}>{likeButton}</button>
            <p>{totalLikes[animal.id] || 0} likes</p>
            <button onClick={() => handleDelete(animal.id)}>DELETE</button>
        
             {/* <button onClick={()=>handleShowDetails(animal.id)}>
                {showDetails ? "Show Less" : "Show More"}
              </button> */}
              <button onClick={handleUpdateClick}>Update an Animal</button>
      {showForm && (
        <UpdateAnimal animals={animals} setAnimals={setAnimals} />
      )}
          </div>
        );
      })}
  </div>

  <AddAnimal animals={animals} setAnimals={setAnimals}/>
  
 
  <footer>All rights reserved@2023</footer>
</div>
);
}
export default Home;