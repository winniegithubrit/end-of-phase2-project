import React from "react"
import { Link } from 'react-router-dom'
function Contacts(){
  return(
    <div className="contact">
      <h1>WELCOME TO THE CONTACTS PAGE</h1>
<ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
</ul>
    </div>
  )
}
export default Contacts