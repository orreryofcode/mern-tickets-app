import { Link } from "react-router-dom";

function ForgotPass() {
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
          <form>
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' />

            <button className='btn-primary'>Send Reset Link</button>
          </form>
        </div>

        <p>Already have an account?</p>
        <Link to='/login'>Login instead</Link>
      </section>
    </>
  );
}

export default ForgotPass;
