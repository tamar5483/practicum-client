import { useContext } from "react";
import ExcelExport from "./ExcelExport"
import  { userContext } from "./UserContext"


export default()=>{
    
    const userCtxt=useContext(userContext);
    return(
        <div style={{display:"flex",justifyContent:"center",height:"50vh"}}>
        <h1>
            Thank You For Giving Us Your Details!
        </h1>
        {/* <ExcelExport excelData={{user:userCtxt.user,children:userCtxt.children}} fileName={"Excel"}/> */}
        </div>
    )
}