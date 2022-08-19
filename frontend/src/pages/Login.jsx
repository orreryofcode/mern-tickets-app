import { Link } from "react-router-dom";

function Login() {
  return (
    <section className='login'>
      <h1 className='login-heading'>Login</h1>

      <div className='form-group'>
        <form>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' />
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' />
          <button className='btn-primary'>Login</button>
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
