import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, reset } from "../features/tickets/ticketsSlice";
import TicketsItem from "../components/TicketsItem";
import Spinner from "../components/Spinner";
import SubmitTicketModal from "../components/SubmitTicketModal";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user data from state
  const { user } = useSelector((state) => state.auth);
  const { tickets, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getTicket());

    return () => {
      dispatch(reset);
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='dashboard'>
        <h1 className='dashboard-heading'>Welcome, {user && user.name}!</h1>

        <div className='dashboard-content'>
          <div className='dashboard-btn-container'>
            <button className='btn-primary' onClick={openModal}>
              New Ticket
            </button>
          </div>

          {/* Handle mapping of ticket data to TicketItem component */}

          <section>
            {tickets.length > 0 ? (
              tickets.map((ticket, index) => (
                <TicketsItem ticket={ticket} key={index} />
              ))
            ) : (
              <h3>No open tickets.</h3>
            )}
          </section>
        </div>
      </section>
      {/* Open modal based on state value */}
      {isOpen && <SubmitTicketModal closeModal={setIsOpen} />}
    </>
  );
}

export default Dashboard;
