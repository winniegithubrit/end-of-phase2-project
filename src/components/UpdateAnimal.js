import React, { useState } from "react";

function UpdateAnimal({ animals, setAnimals, onUpdate }) {
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
          prevAnimals.map((animal) => (animal.id === data.id ? data : animal))
        );
        onUpdate();
      });
  }

  return (
    <div className="">
      <form className="form" onSubmit={handleSubmit}>
        <br />
        <label type="text">name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <label type="text">breed:</label>
        <input
          type="text"
          id="breed"
          value={formData.breed}
          onChange={(e) =>
            setFormData({ ...formData, breed: e.target.value })
          }
        />
        <br />
        <label type="text">age:</label>
        <input
          type="number"
          id="age"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <label type="text">gender:</label>
        <input
          type="text"
          id="gender"
          value={formData.gender}
          onChange={(e) =>
            setFormData({ ...formData, gender: e.target.value })
          }
        />
        <br />
        <label type="text">size:</label>
        <input
          type="number"
          id="size"
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
        />
        <label type="text">weight:</label>
        <input
          type="text"
          id="weight"
          value={formData.weight}
          onChange={(e) =>
            setFormData({ ...formData, weight: e.target.value })
          }
        />
        <br />
        <label type="text">personality:</label>
        <input
          type="text"
          id="personality"
          value={formData.personality}
          onChange={(e) =>
            setFormData({ ...formData, personality: e.target.value })
          }
        />
        <label type="text">healthStatus:</label>
        <input
          type="text"
          id="healthStatus"
          value={formData.healthStatus}
          onChange={(e) =>
            setFormData({ ...formData, healthStatus: e.target.value })
          }
        />
        
      </form>
    </div>
  );
}

export default UpdateAnimal;
