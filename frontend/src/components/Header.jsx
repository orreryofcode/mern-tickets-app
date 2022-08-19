import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className='nav-header'>
        <h1>Triage</h1>
        <nav>
          <ul>
            <li>
              <Link to='/login' className='header-link'>
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
