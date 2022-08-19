import React from "react";

function VerifyPass() {
  return (
    <section className='verify-pass'>
      <h1 className='verify-heading'>Reset My Password</h1>

      <div className='form-group'>
        <form>
          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' />
          <label htmlFor='confPass'>Confirm Password:</label>
          <input type='password' id='confPass' />

          <button className='btn-primary'>Submit</button>
        </form>
      </div>
    </section>
  );
}

export default VerifyPass;
