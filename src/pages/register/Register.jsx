import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login/Login.css";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../redux/slices/AuthSlice";

const Register = () => {
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        email: undefined
    });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')


    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if(validateForm()){

            dispatch(AuthActions.loginStart)
            try {
                setLoading(true)
                const res = await axios.post("http://localhost:8000/api/auth/register", credentials);
                console.log(res.data);
                dispatch(AuthActions.loginSuccess(res.data.userDetails));
                localStorage.setItem('user', JSON.stringify(res.data.userDetails))
                // localStorage.setItem('user', res.data.userDetails)
                setLoading(false)
                navigate("/")
            } catch (err) {
                setError(true)
                setLoading(false)
                setErrorMsg(err.response.data.message)
            }
        }
    };

    const validateForm = () => {
        const { username, password, email } = credentials;
        if (username === undefined || password === undefined || email === undefined) {
            setError(true)
            setErrorMsg('please provide valid credentials!')
          return false;
        } 
        return true;
      };
    


    return (
        <div className="login">
            <div className="lContainer">
            <input
                    type="email"
                    placeholder="email"
                    id="email"
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="text"
                    placeholder="username"
                    id="username"
                    onChange={handleChange}
                    className="lInput"
                />
                <input
                    type="password"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                    className="lInput"
                />
              
                <button disabled={loading} onClick={handleClick} className="lButton">
                    Login
                </button>
                {error && <span>{errorMsg}</span>}
                <div className="already-btn">Already have an account? <Link style={{ textDecoration: "underline", color: "green" }} to="/login">Login</Link></div>
            </div>
        </div>
    );
};

export default Register;