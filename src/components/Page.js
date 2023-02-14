import { useEffect, useState,useContext } from "react"

import { userContext } from "./UserContext";

export default()=>{

const userCtxt = useContext(userContext);


    return(<>
    
    <h1>hello {userCtxt.user.FirstName} {userCtxt.user.LastName}</h1>

    <p> click "form", </p>
    <p> and then fill the input fields.</p>
    <p>click "submit".</p>
    <p>good luck!</p>

     {/* <button onClick={()=>{ navigate(`/`)}}>to form</button>  */}
 

    </>)
}