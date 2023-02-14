import { useParams } from "react-router-dom"

export default()=>{
const {messege}=useParams();
    return(
        <div> Error {messege}</div>
    )
}