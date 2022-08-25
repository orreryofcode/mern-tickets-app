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
            {ticket.status === "Open" ? <p>Open</p> : <p>Solved</p>}
          </div>
        </div>

        <div className='ticket-date'>
          Submitted On: {new Date(ticket.createdAt).toLocaleDateString("en-us")}
        </div>

        <div className='ticket-body'>{ticket.description}</div>
      </div>
    </>
  );
}

export default TicketsItem;
