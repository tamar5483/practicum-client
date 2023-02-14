

import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import ChildForm from "./ChildForm";
import { userContext } from "./UserContext";
import MyRouter from "./MyRouter";
// import axios from "axios";
import axios, * as others from 'axios';
import { useNavigate } from "react-router-dom";


export default () => {

    const navigate = useNavigate()

    const userCtxt = useContext(userContext);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleUpdated = () => {
        navigate("/Confirm")
        userCtxt.setUser({
            FirstName: null,
            LastName: null,
            Identity: null,
            Gender: null,
            BirthDate: null,
            HMO: null
        })
        userCtxt.setChildren([])
        userCtxt.setChildrenElements([])
        setShowForm(true)
    }

    const onFormSubmit = data => {
        console.log(userCtxt.user)
        console.log(userCtxt.children)
        setShowForm(false)

        axios.post("https://localhost:7189/api/Users", userCtxt.user)
            .then(res => {
                console.log("user post", res.data)
                console.log("user post", res.data.id)
                userCtxt.children.forEach(child => {

                    axios.get(`https://localhost:7189/api/Children/${child.identity}`)
                        .then(RES => {
                            const c = {
                                Name: child.name, Identity: child.identity
                                , BirthDate: child.birthdate, Parent1Id: res.data.id
                            }
                            if (RES.data != null&&RES.data != "") {
                                c.Parent1Id = RES.data.id
                                c.Parent2Id = res.data.id
                                console.log("child put:", c)
                                axios.put(`https://localhost:7189/api/Children/${RES.data.id}`, c).then(

                                ).catch()
                            }
                            else

                                console.log(c)
                            axios.post("https://localhost:7189/api/Children", c).then(data => {
                                console.log("child post", data.data)
                            }).catch((e) => {
                                console.log(e)
                            })
                        })

                        .catch()

                        
            })
        handleUpdated()
    }).catch (e => {
        console.log('error: ', e)
    })

    // axios.get("https://localhost:7189/api/Users").then(data => console.log(data.data)).error(e => console.log(e))
    // axios.get(`https://localhost:7189/api/Users/${xc}`).then(data => console.log(data.data)).error(e => console.log(e))



}

const onErrors = errors => console.error(errors);

const [showForm, setShowForm] = useState(true)

const pushChildrenInputs = (num) => {
    const c = [];
    const ch = [];

    for (let index = 0; index < num; index++) {
        c.push(
            <ChildForm key={index} index={index} register={register} errors={errors}  {...register('child')}/>
        )
        ch.push({ name: null, identity: null, birthdate: null })
    }

    userCtxt.setChildrenElements(c);
    userCtxt.setChildren(ch)
}


return (
    <div>
        {showForm ? <div
            className="card bg-light" style={{
                width: "50vw", borderRadius: "5%", margin: "auto",
                marginTop: "5vh", maxWidth: "500px", height: "67vh", overflowY: "scroll"
            }}
        >
            <form onSubmit={handleSubmit(onFormSubmit, onErrors)} className="card-body mx-auto" style={{ marginTop: "10%", width: "80%" }} >
                <div className="input-group-prepend">
                    <label>FirstName</label>
                    <input name="firstName" className="form-control"
                        defaultValue={userCtxt.user.FirstName}
                        {...register('firstName', { required: { value: true, message: "first name is requierd" } })}
                        onChange={(e) => {
                            const user = userCtxt.user;
                            user.FirstName = e.target.value;
                            userCtxt.setUser(user)
                        }}></input>
                    <small className="text-danger">
                        {errors?.firstName && errors.firstName.message}
                    </small>
                </div>

                <div className="input-group-prepend">
                    <label>LastName</label>
                    <input name="lastName" className="form-control"
                        defaultValue={userCtxt.user.LastName}
                        {...register('lastName', { required: { value: true, message: "last name is requierd" } })}
                        onChange={(e) => {
                            const user = userCtxt.user;
                            user.LastName = e.target.value;
                            userCtxt.setUser(user)
                        }} />
                    <small className="text-danger">
                        {errors?.lastName && errors.lastName.message}
                    </small>
                </div>

                <div className="input-group-prepend">
                    <label>Identity</label>
                    <input name="identity" className="form-control" //minLength={9} maxLength={9}
                        defaultValue={userCtxt.user.Identity}
                        {...register('identity', {
                            required: { value: true, message: "identity is requierd" },
                            minLength: { value: 9, message: "identity must have 9 digits" },
                            maxLength: { value: 9, message: "identity must have 9 digits" },
                            // pattern: { value: /[0-9.]/, message: "digits only" }
                            pattern: "/[0-9]*/"
                        })}
                        onChange={(e) => {
                            const user = userCtxt.user;
                            user.Identity = e.target.value;
                            userCtxt.setUser(user)
                        }} />
                    <small className="text-danger">
                        {errors?.identity && errors.identity.message}
                    </small>
                </div>

                <div className="input-group-prepend">
                    <label>Birthdate</label>
                    <input type="date" name="birthdate" className="form-control"
                        defaultValue={userCtxt.user.BirthDate}
                        {...register('birthdate', { required: { value: true, message: "birthdate is requierd" } })}
                        onChange={(e) => {
                            const user = userCtxt.user;
                            user.BirthDate = e.target.value;
                            userCtxt.setUser(user)
                        }} />
                    <small className="text-danger">
                        {errors?.birthdate && errors.birthdate.message}
                    </small>
                </div>


                <div className="input-group-prepend">
                    <label>gender </label>
                    <div className="form-check">

                        <input type="radio" name="gender"
                            {...register('gender')}
                            className="form-check-input"
                            // className="form-control"
                            defaultChecked={userCtxt.user.Gender === 0}
                            value={0} onInput={(e) => {
                                const user = userCtxt.user;
                                user.Gender = e.target.value;
                                userCtxt.setUser(user)
                            }} />  <label className="form-check-label">Male</label>
                    </div>

                    <div className="form-check">
                        <input type="radio" name="gender"
                            {...register('gender')}
                            className="form-check-input"
                            // className="form-control"
                            defaultChecked={userCtxt.user.Gender === 1}
                            value={1} onInput={(e) => {
                                const user = userCtxt.user;
                                user.Gender = e.target.value;
                                userCtxt.setUser(user)
                            }} /><label className="form-check-label" >Female</label>
                        <small className="text-danger">
                            {errors?.gender && errors.gender.message}
                        </small>
                    </div>
                </div>

                <div className="input-group-prepend">
                    <label>HMO</label>
                    <select name="HMO" className="form-control"
                        defaultValue={userCtxt.user.HMO}
                        onChange={(e) => {
                            const user = userCtxt.user;
                            user.HMO = e.target.value;
                            userCtxt.setUser(user)
                        }}>HMO
                        <option value="0">klalit</option>
                        <option value="1">leumit</option>
                        <option value="2">macabi</option>
                        <option value="3">mehuchedet</option>
                    </select>
                </div>

                <div className="input-group-prepend">
                    <label>nunOfChildren</label>
                    <input type="number" name="nunOfChildren" className="form-control"
                        defaultValue={userCtxt.childrenNum}
                        min={0}
                        {...register('nunOfChildren')}
                        onInput={(e) => {
                            userCtxt.setChildrenNum(e.target.value)
                            pushChildrenInputs(e.target.value)
                        }} />
                    <small className="text-danger">
                        {errors?.numOfChildren && errors.numOfChildren.message}
                    </small>
                </div>

                <div>   {userCtxt.childrenElements}</div>

                <button className="form-control" style={{ marginTop: "20%" }}>Submit</button>

            </form></div> :
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status"
                    style={{ marginTop: "10%", height: "100px", width: "100px" }}>

                </div>

            </div>}
    </div>)
}