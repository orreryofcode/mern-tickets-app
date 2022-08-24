import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { forgot, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function ForgotPass() {
  const [formData, setFormData] = useState("");

  const { email } = formData;

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Email sent.");
    }

    dispatch(reset());
  }, [isError, message, isSuccess, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(forgot({ email }));
    dispatch(reset());
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='forgot-pass'>
        <h1 className='forgot-pass-heading'>Forgot My Password</h1>
        <p className='forgot-pass-message'>
          A reset email will be sent to you.
        </p>
        <p className='submessage'>
          (Check your spam folder if you don't see it.)
        </p>

        <div className='form-group'>
          <form onSubmit={onSubmit}>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
            />

            <button className='btn-primary' type='submit'>
              Send Reset Link
            </button>
          </form>
        </div>

        <p>Already have an account?</p>
        <Link to='/login'>Login instead</Link>
      </section>
    </>
  );
}

export default ForgotPass;
