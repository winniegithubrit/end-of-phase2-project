// import React, { useState } from "react";


// function UpdateAnimal({ animals, setAnimals}) {
//   const [formData, setFormData] = useState({
//     name: animals.name,
//     breed: animals.breed,
//     age: animals.age,
//     gender: animals.gender,
//     size: animals.size,
//     weight: animals.weight,
//     personality: animals.personality,
//     healthStatus: animals.healthStatus,
//     availabilityStatus: animals.availabilityStatus,
//     image: animals.image,
//   });

//   function handleSubmit(e) {
//     e.preventDefault();
//     fetch(`http://localhost:3000/animals/${animals.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setAnimals((prevAnimals) =>
//           prevAnimals.map((animal) => (animal.id === data.id ? data : animal))
//         );
        
//       });
//   }

//   return (
//     <div className="">
//       <form className="form" onSubmit={handleSubmit}>
//         <br />
//         <label type="text">name:</label>
//         <input
//           type="text"
//           id="name"
//           value={formData.name}
//           onChange={(e) =>
//             setFormData({ ...formData, name: e.target.value })
//           }
//         />
//         <label type="text">breed:</label>
//         <input
//           type="text"
//           id="breed"
//           value={formData.breed}
//           onChange={(e) =>
//             setFormData({ ...formData, breed: e.target.value })
//           }
//         />
//         <br />
//         <label type="text">age:</label>
//         <input
//           type="number"
//           id="age"
//           value={formData.age}
//           onChange={(e) => setFormData({ ...formData, age: e.target.value })}
//         />
//         <label type="text">gender:</label>
//         <input
//           type="text"
//           id="gender"
//           value={formData.gender}
//           onChange={(e) =>
//             setFormData({ ...formData, gender: e.target.value })
//           }
//         />
//         <br />
//         <label type="text">size:</label>
//         <input
//           type="number"
//           id="size"
//           value={formData.size}
//           onChange={(e) => setFormData({ ...formData, size: e.target.value })}
//         />
//         <label type="text">weight:</label>
//         <input
//           type="text"
//           id="weight"
//           value={formData.weight}
//           onChange={(e) =>
//             setFormData({ ...formData, weight: e.target.value })
//           }
//         />
//         <br />
//         <label type="text">personality:</label>
//         <input
//           type="text"
//           id="personality"
//           value={formData.personality}
//           onChange={(e) =>
//             setFormData({ ...formData, personality: e.target.value })
//           }
//         />
//         <label type="text">healthStatus:</label>
//         <input
//           type="text"
//           id="healthStatus"
//           value={formData.healthStatus}
//           onChange={(e) =>
//             setFormData({ ...formData, healthStatus: e.target.value })
//           }
//         />
        
//       </form>
//     </div>
//   );
// }

// export default UpdateAnimal;
// import React, { useState } from "react";

// function UpdateAnimal({ animals, setAnimals }) {
//   const [formData, setFormData] = useState({
//     name: animals.name,
//     breed: animals.breed,
//     age: animals.age,
//     gender: animals.gender,
//     size: animals.size,
//     weight: animals.weight,
//     personality: animals.personality,
//     healthStatus: animals.healthStatus,
//     availabilityStatus: animals.availabilityStatus,
//     image: animals.image,
//   });

//   function handleSubmit(updatedData) {
//     fetch(`http://localhost:3000/animals/${animals.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setAnimals((prevAnimals) =>
//           prevAnimals.map((animal) => (animal.id === data.id ? data : animal))
//         );
//         setFormData(data)
//       });
//   }

//   function handleUpdateClick(id) {
//     const name = prompt("Enter name");
//     const breed = prompt("Enter breed");
//     const age = prompt("Enter age");
//     const gender = prompt("Enter gender");
//     const size = prompt("Enter size");
//     const weight = prompt("Enter weight");
//     const personality = prompt("Enter personality");
//     const healthStatus = prompt("Enter health status");
//     const AvailabilityStatus = prompt("Enter the availabilityStatus")
//     const image=prompt("Enter the image url");

//     const updatedData = {
//       ...formData,
//       name,
//       breed,
//       age,
//       gender,
//       size,
//       weight,
//       personality,
//       healthStatus,
//       AvailabilityStatus,
//       image,
      
//     };

//     handleSubmit(updatedData);
//   }

//   return (
//     <div className="update-container">
//       <button className="updating" onClick={()=> handleUpdateClick(animals.id)}>
//         UPDATE
//       </button>
//     </div>
//   );
// }

// export default UpdateAnimal;

import React, { useState ,useEffect} from "react";

function UpdateAnimal({ animals, setAnimals }) {
  const [formData, setFormData] = useState({
    name: animals.name,
    breed: animals.breed,
    age: animals.age,
    gender: animals.gender,
    size: animals.size,
    weight: animals.weight,
    personality: animals.personality,
    healthStatus: animals.healthStatus,
    availabilityStatus: animals.availabilityStatus,
    image: animals.image,
  });

   useEffect(() => {
    setFormData({
      name: animals.name,
      breed: animals.breed,
      age: animals.age,
      gender: animals.gender,
      size: animals.size,
      weight: animals.weight,
      personality: animals.personality,
      healthStatus: animals.healthStatus,
      availabilityStatus: animals.availabilityStatus,
      image: animals.image,
    });
  }, [animals]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/animals/${animals.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setAnimals((prevAnimals) =>
          prevAnimals.map((a) => (a.id === data.id ? data : a))
        );
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }


  return (
    <div className="update-container">
      <form className="form">
        <h1>UPDATE ANIMAL HERE</h1>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Breed:
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Size:
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Weight:
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Personality:
          <input
            type="text"
            name="personality"
            value={formData.personality}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Health status:
          <input
            type="text"
            name="healthStatus"
            value={formData.healthStatus}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Availability status:
          <input
            type="text"
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </label>
       <button className="submit" onClick={handleSubmit}>ENTER</button>
      </form>
    </div>
  );
}

export default UpdateAnimal;
