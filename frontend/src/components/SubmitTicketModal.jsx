import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../features/tickets/ticketsSlice";

function SubmitTicketModal({ closeModal }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // Destructure from formData
  const { title, description } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const ticketData = {
      title,
      description,
    };

    dispatch(createTicket(ticketData));
    setFormData("");
    navigate(0);
    closeModal(false);
  };

  // Close modal window function
  const closeModalWindow = () => {
    closeModal(false);
  };

  return (
    <>
      <div className='modal-container'>
        <div className='modal-box'>
          <button className='close-modal-btn' onClick={closeModalWindow}>
            X
          </button>
          <h1>Submit New Ticket</h1>

          <div className='form-group'>
            <form onSubmit={onSubmit}>
              <label htmlFor='title'>Subject:</label>
              <input type='text' id='title' name='title' onChange={onChange} />
              <label htmlFor='description'>Describe your issue:</label>
              <textarea
                name='description'
                id='description'
                resize='none'
                onChange={onChange}></textarea>

              <button className='btn-primary' type='submit'>
                Submit New Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubmitTicketModal;
