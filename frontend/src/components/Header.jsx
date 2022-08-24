import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <div className='nav-header'>
        <h1>Triage</h1>
        <nav>
          <ul>
            {user && (
              <li>
                <button onClick={onLogout} className='btn-logout'>
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Header;
