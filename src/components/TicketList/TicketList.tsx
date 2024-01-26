import { FC, useEffect, useState } from 'react';
import TicketService from '../../api/TicketService';
import { useFetching } from '../../hooks/useFetching';
import { ITickets } from '../../types/ITickets';
import TicketItem from '../TicketItem/TicketItem';

const TicketList: FC = () => {
  const [tickets, setTickets] = useState([]);

  const [fetchTickets, isTicketsLoading, ticketError] = useFetching(
    async () => {
      const response = await TicketService.getAllTickets();
      setTickets([...tickets, ...response.data]);
    }
  );

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className='list'>
      {isTicketsLoading ? (
        <>Loading...</>
      ) : (
        <>
          {tickets.map((ticket: ITickets) => (
            <div key={ticket.found_at}>
              <TicketItem ticket={ticket} />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TicketList;
