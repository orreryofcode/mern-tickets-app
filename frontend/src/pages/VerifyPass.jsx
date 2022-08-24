import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verify, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function VerifyPass() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confPass: "",
  });

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { newPassword, confPass } = formData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/login");
    }

    dispatch(reset());
  }, [isError, message, isSuccess, dispatch, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      token,
      newPassword,
      confPass,
    };

    dispatch(verify(userData));
    dispatch(reset());
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className='verify-pass'>
      <h1 className='verify-heading'>Reset My Password</h1>

      <div className='form-group'>
        <form onSubmit={onSubmit}>
          <label htmlFor='newPassword'>Password:</label>
          <input
            type='password'
            id='newPassword'
            name='newPassword'
            value={newPassword}
            onChange={onChange}
          />
          <label htmlFor='confPass'>Confirm Password:</label>
          <input
            type='password'
            id='confPass'
            name='confPass'
            value={confPass}
            onChange={onChange}
          />

          <button className='btn-primary' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default VerifyPass;
