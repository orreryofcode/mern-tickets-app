import { Link } from "react-router-dom";
function Register() {
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
          <form>
            <label htmlFor='name'>Name:</label>
            <input type='text' id='name' />
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' />
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' />
            <label htmlFor='confPass'>Confirm Password:</label>
            <input type='password' id='confPass' />

            <button className='btn-primary'>Create Account</button>
          </form>
        </div>

        <p>Already have an account?</p>
        <Link to='/login'>Login instead</Link>
      </section>
    </>
  );
}

export default Register;
