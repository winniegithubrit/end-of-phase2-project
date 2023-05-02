import React from "react"
import { Link } from 'react-router-dom';
function About(){
  return(
    <div className="about">
      <h1>WELCOME TO THE ABOUT PAGE</h1>
    <ul>
       <li><Link to="/">Home</Link></li>
        <li><Link to="/contacts">Contact Us</Link></li>
    </ul>
    </div>
  )
}
export default About