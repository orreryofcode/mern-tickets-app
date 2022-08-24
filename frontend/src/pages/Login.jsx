import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Destructure formData
  const { email, password } = formData;

  // Initialize useNavigate and useDispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Destructure values obtained from auth
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/");
    }

    dispatch(reset);
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  // Handle form data
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className='login'>
      <h1 className='login-heading'>Login</h1>

      <div className='form-group'>
        <form onSubmit={onSubmit}>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={onChange}
            name='email'
          />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={onChange}
            name='password'
          />
          <button className='btn-primary' type='submit'>
            Login
          </button>
        </form>
      </div>

      <Link to='/forgot-password' className='forgot-pass-link'>
        Forgot My Password
      </Link>

      <p>Need to register an account?</p>
      <Link to='/register'>We can help.</Link>
    </section>
  );
}

export default Login;
