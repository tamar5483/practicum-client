import { useForm } from "react-hook-form";
import { useContext } from "react";
import { userContext } from "./UserContext";


export default ({ index ,register,errors}) => {

    const userCtxt = useContext(userContext);


    return (
        <div style={{ marginTop:"20%"}}>
        <div >
          
           <h4> Child {index+1}</h4>
          
            <div >
                <label>Name</label>
                <input className="form-control"
                       defaultValue={userCtxt.children[index].name}
                       {...register('firstName',  {required:{value:true,message:"name is requierd"}})}
                       name={`childName${index}`} 
                       onChange={(e) => {
                       const children = userCtxt.children;
                       children[index].name = e.target.value
                       userCtxt.setChildren(children)

                    }} /> 
                <small className="text-danger">
                    {errors?.name && errors.name.message}
                </small>
            </div>

            <div>
                <label>Identity</label>
                <input className="form-control"
                       defaultValue={userCtxt.children[index].identity}
                       {...register('identity',  {required:{value:true,message:"identity is requierd"},
                       minLength:{value:9,message:"identity must have 9 digits"},
                        maxLength:{value:9,message:"identity must have 9 digits"}})}
                       name={`childIdentity${index}`}
                       onChange={(e) => {
                       const children = userCtxt.children;
                       children[index].identity = e.target.value
                       userCtxt.setChildren(children)
                    }} />
                <small className="text-danger">
                    {errors?.identity && errors.identity.message}
                </small>
            </div>

            <div>
                <label>Birthdate</label>
                <input className="form-control"
                       defaultValue={userCtxt.children[index].birthdate}
                       {...register('birthdate', {required:{value:true,message:"name is requierd"}})}
                       type="date" name={`childBirthDate${index}`} 
                       onChange={(e) => {
                       const children = userCtxt.children;
                       children[index].birthdate = e.target.value
                       userCtxt.setChildren(children)
                    }} />
                <small className="text-danger">
                    {errors?.birthdate && errors.birthdate.message}
                </small>
            </div>

        </div></div>
    )
}