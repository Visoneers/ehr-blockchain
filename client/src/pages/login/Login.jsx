import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';

import "./Login.scss";

const LOGIN_URL = '/auth/login';

const Login = () => {
    const { auth, setAuth } = useContext(AuthContext);
    // const {auth,setAuth}=useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ pass: pwd, email: user })
        try {
            // console.log("before")
            // console.log({ pass: pwd, email: user })
            // console.log("after")
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data), " output here");

            const accessToken = response?.data?.data.token;
            const roles = response?.data?.data.role;
            const id = response?.data?.data.id
            const users = response?.data.data.user
            const name=response?.data.data.user.name

            console.log(id, roles, accessToken, users)
            localStorage.setItem("user_token", accessToken);
            localStorage.setItem("user_id", id);
            localStorage.setItem("user_role", roles);
            localStorage.setItem("user_name",name)
            setAuth({ id: id, roles: roles, accessToken: accessToken, users: users });
            //setAuth({user:user})
            console.log(roles, "Auth")
            // console.log(process.env.ROLE_HOSPITAL_ADMIN)
            if (roles === "644e0d8ae22255e5791984b5") {
                navigate("/admin")
            }
            else if (roles ==="644e0da2e22255e5791984b6" ) {
                navigate("/admin")
            }
            else if (roles === "644e0db8e22255e5791984b7") {
                console.log("hi")
                navigate("/hospitaladmin")
            }
            else if (roles === "644e0dc7e22255e5791984b8") {
                navigate("/user")
            }
            else if (roles === "644e0ddae22255e5791984b9") {
                navigate("/doctor")
            }

            setUser('');
            setPwd('');



        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <div className="login-background">
            <div className="login-container">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p className="text">
                    Need an Account?{" "}
                    <Link className="link" to="/register">
                        Sign Up.
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login