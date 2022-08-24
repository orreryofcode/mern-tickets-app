import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Initialize formData state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confPass: "",
  });

  // Destructure data from formData
  const { name, email, password, confPass } = formData;

  // Get values from auth
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset);
  }, [isError, isSuccess, message, user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confPass) {
      toast.error("Passwords do not match.");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='register'>
        <h1 className='register-heading'>Create Your Account</h1>
        <p className='register-message'>
          A verification email will be sent to the registered email account.
        </p>
        <p className='submessage'>
          (Check your spam folder if you don't see it.)
        </p>

        <div className='form-group'>
          <form onSubmit={onSubmit}>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
            />
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
            />
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              name='password'
              onChange={onChange}
              value={password}
            />
            <label htmlFor='confPass'>Confirm Password:</label>
            <input
              type='password'
              id='confPass'
              name='confPass'
              onChange={onChange}
              value={confPass}
            />

            <button className='btn-primary' type='submit'>
              Create Account
            </button>
          </form>
        </div>

        <p>Already have an account?</p>
        <Link to='/login'>Login instead</Link>
      </section>
    </>
  );
}

export default Register;
