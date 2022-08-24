function TicketsItem({ ticket }) {
  return (
    <>
      <div className='ticket-item'>
        <div className='ticket-heading'>
          <div className='ticket-heading-title-container'>
            <h3 className='ticket-title'>{ticket.title}</h3>
            <p className='ticket-id'>(id: {ticket._id})</p>
          </div>
          <div className='ticket-status'>
            <p>Solved</p>
          </div>
        </div>

        <div className='ticket-date'>Submitted on: Mon, September 20, 2022</div>

        <div className='ticket-body'>{ticket.description}</div>
      </div>
    </>
  );
}

export default TicketsItem;
