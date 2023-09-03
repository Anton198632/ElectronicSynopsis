import { useEffect, useRef, useState } from "react";
import "./authorization-form.css";
import useDataBaseService from "../../services/DataBaseService";
import { useDispatch } from "react-redux";

import { setUser } from "../../redux/actions";

export default function (props) {


    const loginRef = useRef(null);
    const passRef = useRef(null);

    const [error, setError] = useState("")

    const {logIn} = useDataBaseService();

    const dispatch = useDispatch();



    const onClickHandle = () => {


        setError("");

        logIn(loginRef.current.value, passRef.current.value).then(response => {

            if (response.registration) {
                setError(response.registration)
            }
            else {
                props.setDataUser(response.user)
                // dispatch(setUser(response.user));
            }

        })
    }



    return (
        <div className="authorization-form">
            <input type="text" placeholder="login" ref={loginRef}/>
            <input type="password" placeholder="password" ref={passRef}/>
            <button onClick={onClickHandle}>Войти</button>

            <span className="error">{error}</span>
        </div>
    )

}