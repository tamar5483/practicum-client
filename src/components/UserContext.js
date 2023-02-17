import { createContext, useEffect, useState } from "react"


export const userContext=createContext();


export default function UserContext(props){
   const[user,setUser]=useState({
    FirstName: null,
    LastName: null,
    Identity: null,
    Gender: null,
    BirthDate: null,
    HMO: ""
  });
   const[children,setChildren]=useState([])
   const [childrenElements, setChildrenElements] = useState([]);
   const[childrenNum,setChildrenNum]=useState()
    return(
<userContext.Provider value={{user,setUser,children,setChildren,childrenElements,setChildrenElements,childrenNum,setChildrenNum}}>
    {props.children}
</userContext.Provider>
    )
}