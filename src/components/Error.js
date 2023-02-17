import { useParams } from "react-router-dom"

export default () => {
    const { messege } = useParams();
    return (
        <div> <h1>Error {messege}</h1>
        <p>try again later</p></div>
    )
}