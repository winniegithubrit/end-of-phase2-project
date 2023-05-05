import React,{useState} from "react"
import { Link } from 'react-router-dom';
import './App.css';
function AddAnimal({animals,setAnimals}){
  // set initial state for form data using the useState hook
  const [formData,setFormData]=useState({
    name:"",
    breed:"",
    age:"",
    gender:"",
    size:"",
    weight:"",
    personality:"",
    healthStatus:"",
    AvailabilityStatus:"",
    image:"",
    likes:""
  })
  
  // function to handle form submission
  function handleSubmit(e){
e.preventDefault();
// create a new animal object using the form data
const newAnimal ={
  name:formData.name,
  breed:formData.breed,
  age:formData.age,
  gender:formData.gender,
  size:formData.size,
  weight:formData.weight,
  personality:formData.personality,
  healthStatus:formData.healthStatus,
  AvailabilityStatus:formData.AvailabilityStatus,
  image:formData.image,
  likes:formData.likes,
};
// send a POST request to the server with the new animal data
fetch("http://localhost:3000/animals",{
  method:"POST",
  headers: {
    "Content-Type":"application/json",
  },
  body: JSON.stringify(newAnimal)
})
.then((response)=>response.json())
.then((data)=>{
   // add the new animal to the list of animals using the setAnimals function
  setAnimals([...animals,data]);
   // reset the form data to empty strings
  setFormData({
     name:"",
    breed:"",
    age:"",
    gender:"",
    size:"",
    weight:"",
    personality:"",
    healthStatus:"",
    AvailabilityStatus:"",
    image:"",
    likes:"",

  })
})
  }
  console.log(formData)
  return(

  // display the form with input fields and a submit button
    <div className="add-animal">
       <nav>
        <Link to="/about">About</Link>
        <Link to="/contacts">Contact Us</Link>
        <Link exact to="/">Home</Link>
        </nav>
<form className="animal-form">
  <h5>ADD-ANIMAL-HERE</h5>
  <br/>
  <label type="text">name:</label>
  <input type="text" id="name" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})}/>
  <label type="text">breed:</label>
  <input type="text" id="breed" value={formData.breed} onChange={(e)=>setFormData({...formData,breed:e.target.value})}/>
  <br/>
  <label type="text">age:</label>
  <input type="number" id="age" value={formData.age} onChange={(e)=>setFormData({...formData,age:e.target.value})}/>
  <label type="text">gender:</label>
  <input type="text" id="gender" value={formData.gender} onChange={(e)=>setFormData({...formData,gender:e.target.value})}/>
  <br/>
  <label type="text">size:</label>
  <input type="number" id="size" value={formData.size} onChange={(e)=>setFormData({...formData,size:e.target.value})}/>
  <label type="text">weight:</label>
  <input type="text" id="weight" value={formData.weight} onChange={(e)=>setFormData({...formData,weight:e.target.value})}/>
  <br/>
  <label type="text">personality:</label>
  <input type="text" id="personality" value={formData.personality} onChange={(e)=>setFormData({...formData,personality:e.target.value})}/>
  <label type="text">healthStatus:</label>
  <input type="text" id="healthStatus" value={formData.healthStatus} onChange={(e)=>setFormData({...formData,healthStatus:e.target.value})}/>
  <br/>
  <label type="text">AvailabilityStatus:</label>
  <input type="text" id="AvailabilityStatus" value={formData.AvailabilityStatus} onChange={(e)=>setFormData({...formData,AvailabilityStatus:e.target.value})}/>
  <label type="text">image-url:</label>
  <input type="img" id="image" value={formData.image} onChange={(e)=>setFormData({...formData,image:e.target.value})}/>
   <label type="text">likes:</label>
  <input type="likes" id="likes" value={formData.likes} onChange={(e)=>setFormData({...formData,likes:e.target.value})}/>
  <button type="submit" onClick={handleSubmit}>ADD-ANIMAL</button>
</form>
    </div>
  )
}
export default AddAnimal