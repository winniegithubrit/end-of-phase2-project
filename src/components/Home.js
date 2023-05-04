import React,{useState,useEffect} from "react"
import { Link } from 'react-router-dom';
import Search from "./Search";

//the home function that acts as a container for the delete functionality,search functionality
//filter by breed functionality,likes functionality and also the dark and light mode functionality
function Home(){
  //setting the states to be used for breed,mode...
  const [animals,setAnimals] = useState([])
  const[selectedBreed,setSelectedBreed]= useState("All")
  const [isDarkMode, setIsDarkMode] = useState(false);
  //creating an array of breeds available
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
               likes: animal.likes || 0, 
            
          }))
        )
      )
  }, [])
  //this the function that handles the toggle dark and light mode
 const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  //the function that handles the delete functionality per animal card thats why we have specified the id
  function handleDelete(id){
    fetch(`http://localhost:3000/animals/${id}`,{
      method:"DELETE",
    })
    .then(()=>{
      setAnimals(animals.filter((animal)=> animal.id !== id))
    })
  }
  //the function that handles the search functionality
  function fetchSearch(search){
    const results=animals.filter(animal=>animal.name === search)
    setAnimals(results)
  }
  //the function that handles the buying functionality it sends a patch request then changes the availability status of the animal to not available when the animal is bought
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
        //here this enables the card to get disabled when it is clicked
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
            //enables card disabling
            disabled:true,
          };
        } else {
          return animal;
        }
      }));
    })
  }
  //function that handles the like button it sends a patch request to the server and whenever the like 
  //button is clicked the likes update themselves in the backend 
  function handleLike(id) {
    const animal = animals.find((animal) => animal.id === id);

    fetch(`http://localhost:3000/animals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...animal,
        likes: animal.likes + 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAnimals(
          animals.map((animal) => {
            if (animal.id === id) {
              return {
                ...animal,
                likes: data.likes,
              };
            } else {
              return animal;
            }
          })
        );
      });
  }
  //here this is the handle breed function 
  function handleBreed(e){
    setSelectedBreed(e.target.value)
  }
  
  return(
    <div className="home-animal-card" >
      <header> THE PET KINGDOM </header>
      {/* toggle mode functionality */}
      <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
          <span className="slider round"></span>
        </label>
        <nav>
        <Link to="/about">About Us</Link>
        <Link to="/contacts">Contact Us</Link>
        <Link to="/add-animal">Add Animal</Link>
        </nav>
      </div>

      
    
      <Search getSearch={fetchSearch}/>
      <label className="filter">
  Choose Animal by breed:
  {/* here this is the drop down with the breeds available */}
  <select value={selectedBreed} onChange={handleBreed} className="select">
    {allBreeds.map((breed) => (
      <option key={breed} value={breed}>
        {breed}
      </option>
    ))}
  </select>
</label>


<div className="animal-container" >
    {/* Filter animals based on breed */}
    {animals  
      .filter((animal) => selectedBreed === "All" || animal.breed === selectedBreed)
      .map((animal) => {
      
        return (
          <div className={`animal-card ${animal.disabled ? "disabled" : ""}`}>
            <img src={animal.image} alt={animal.name} />
            <h3>NAME: {animal.name}</h3>
            <h3>BREED: {animal.breed}</h3>
            <h3>AGE: {animal.age}</h3>
            <h3>GENDER: {animal.gender}</h3>
            <h3>SIZE: {animal.size}</h3>
            <h3>WEIGHT: {animal.weight}</h3>
            <h3>PERSONALITY: {animal.personality}</h3>
            <h3>HEALTH:{animal.healthStatus}</h3>
            <h3>STATUS: {animal.AvailabilityStatus}</h3>
           
            <button type="submit" onClick={() => handleBuy(animal.id)}>
              Buy
            </button>
            
            <button onClick={() => handleDelete(animal.id)}>DELETE</button>
            <button onClick={() => handleLike(animal.id)}>
                      {`Like (${animal.likes})`}
                        </button>
            
            <Link to={`/${animal.id}`}>ShowMore</Link>
            
        
            
          </div>
        );
      })}
  </div>

  
 
  
</div>
</div>
);
}
export default Home;