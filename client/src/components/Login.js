import React, { useState } from "react";
import axiosWithAuth from "../axiosWithAuth";

const Login = ({ history }) => {
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
    let [login, setLogin] = useState({
        credentials: {
            username: "",
            password: "",
        },
    });
    const changeHandler = (e) => {
        setLogin({
            credentials: {
                ...login.credentials,
                [e.target.name]: e.target.value,
            },
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axiosWithAuth()
            .post("/login", login.credentials)
            .then((res) => {
                console.log("axios post res", res);
                localStorage.setItem("token", res.data.payload);
                history.push("/bubblepage");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="login-wrapper">
            <h1>Welcome to the Bubble App!</h1>
            <form onSubmit={submitHandler}>
                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    name="username"
                    value={login.credentials.username}
                    onChange={changeHandler}
                />
                <label htmlFor="password">Password: </label>

                <input
                    type="password"
                    name="password"
                    value={login.credentials.password}
                    onChange={changeHandler}
                />
                <button>Log In</button>
            </form>
        </div>
    );
};

export default Login;
