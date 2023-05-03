import React from "react";
function Comment (){
  
  return(
    <div className="comment">
      
      <form>
        <h3>Add Comment</h3>
<label type="name">name</label>
<input type="text" id="name"/>
<br/>
<label type="email">email-address</label>
<input type="email" id="email"/>
<br/>
<label type="text">comment</label>
<input type="text" id="name"/>
<br/>
<button>COMMENT</button>
</form>
    </div>
  )
}
export default Comment