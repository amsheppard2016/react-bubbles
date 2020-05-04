import React from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
    const history = useHistory();
    const logout = () => {
        localStorage.clear("token");
        history.push("/");
    };
    return (
        <div className="logout-wrapper">
            <button onClick={logout}>Log Out</button>
        </div>
    );
};
export default Logout;
