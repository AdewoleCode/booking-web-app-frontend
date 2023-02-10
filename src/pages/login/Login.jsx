import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../redux/slices/AuthSlice";

const Login = () => {
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
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
                const res = await axios.post("http://localhost:8000/api/auth/login", credentials);
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
        const { username, password } = credentials;
        if (username === undefined || password === undefined) {
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
                <div   className="already-btn">Dont have an account? <Link style={{ textDecoration: "underline", color: "green" }} to="/register">Register</Link></div>
            </div>
        </div>
    );
};

export default Login;