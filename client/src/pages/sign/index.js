import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sign, register } from "../../services/api";

const Sign = () => {
    var login = true;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const reduxData = useSelector(({ account }) => {
        return account;
    });

    if (JSON.stringify(reduxData) != "{}") navigate("/home");

    const handleCallBackResponse = (response) => {
        const emailData = jwtDecode(response.credential);
        if (login) {
            const { email } = emailData;
            sign({ email }, {}).then(({ data }) => {
                if (data.status == "Success") {
                    dispatch({
                        type: "ADD_ACCOUNT",
                        payload: { ...emailData, ...data.data}
                    })
                    navigate("/home");
                }
            }).catch(() => {
                toast.warn('Tài khoản chưa được đăng ký', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
        } else {
            const {email, name, picture} = emailData;
            register({email, email_name : name, email_picture : picture}, {}).then(({data}) => {
                if(data.status == "Success") {
                    dispatch({
                        type: "ADD_ACCOUNT",
                        payload: { ...emailData, ...data.data}
                    })
                    navigate("/home");
                }
            }).catch(() => {
                toast.warn('Tài khoản đã được đăng ký', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
        }
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "670530002027-krsehi8cfgimal4duaia16tv65rqbctc.apps.googleusercontent.com",
            callback: handleCallBackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInButton"),
            { theme: "outline", size: "large", text: "signin_with", shape: "circle", click_listener : () => login = true },
        )
        google.accounts.id.renderButton(
            document.getElementById("signUpButton"),
            { theme: "filled_blue", size: "large", text: "signup_with", shape: "circle", click_listener : () => login = false },
        )
    }, [login])

    return (
        <div className="sign">
            <div id="signInButton" className="d-flex justify-content-center align-items-center"></div>
            <div id="signUpButton" className="d-flex justify-content-center align-items-center"></div>
            <ToastContainer />
        </div>
    )
}

export default Sign;