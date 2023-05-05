
import React, { useState } from "react"
import { useHistory,Link } from "react-router-dom";

function Contacts(){
  //declare history variable
  const history = useHistory()

  //declare form variables
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")

  function handleSubmit(e){
    e.preventDefault()

    //object that will hold data
    const newMessage = {
      name:name,
      email:email,
      message:message,
    }
    //adding a new message to the history
      fetch("http://localhost:3000/messages",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(newMessage)
    })
    .then((r) => r.json())
    .then((data) => console.log(data))
    setInputClear()

    history.push("/");
  }

  function setInputClear(){
    setName("")
    setMessage("")
    setEmail("")
  }
  return(
    <div>
     <nav>
      {/* the links for navigation */}
        <Link to="/about">About Us</Link>
        <Link exact to="/">Home</Link>
        <Link to="/add-animal">Add Animal</Link>
        </nav>
    <form className="addanimals" onSubmit={handleSubmit}>
      <h2 style={{textAlign:"center"}}>Contacts Page</h2>
      <p style={{textAlign:"center"}}>Reach out to us by filling the form</p>
{/* The contact us form */}
      <label for="name">Name</label>
      <input type="text" id="name" value={name} placeholder="Enter name" onChange={e => setName(e.target.value)}/>

      <label for="email">Email Address</label>
      <input type="text" id="email" value={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>

      <label for="name">Comments</label>
      <input type="text" id="message" value={message} placeholder="Comments" onChange={e => setMessage(e.target.value)}/>

      <button className="submit-message" type="submit">Submit</button>

    </form>
    </div>
  )
}
export default Contacts;
