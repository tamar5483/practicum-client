import { returnStatement, pipelineBareFunction } from "@babel/types";
import MyRouter from "./components/MyRouter";
import UserContext from "./components/UserContext";






export default()=>{
  return(

<UserContext>
<MyRouter/></UserContext>

  )
}