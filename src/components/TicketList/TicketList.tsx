import { FC, useEffect, useState } from 'react';
import TicketService from '../../api/TicketService';
import { useFetching } from '../../hooks/useFetching';
import { ITickets } from '../../types/ITickets';
import TicketItem from '../TicketItem/TicketItem';

interface ITicketListProps {
  transfers: number[];
  maxValue: number;
  sortByPrice: boolean;
  sortByDuration: boolean;
}

const TicketList: FC<ITicketListProps> = ({
  transfers,
  maxValue,
  sortByPrice,
  sortByDuration,
}) => {
  const [tickets, setTickets] = useState<ITickets[]>([]);
  const [randomTickets, setRandomTickets] = useState<ITickets[]>([]);

  const [fetchTickets, isTicketsLoading, ticketError] = useFetching(
    async () => {
      const response = await TicketService.getAllTickets();
      setTickets(response.data);
    }
  );

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    if (tickets.length > 0) {
      const shuffled = [...tickets].sort(() => Math.random() - 0.5);
      setRandomTickets(shuffled);
    }
  }, [tickets]);

  useEffect(() => {
    if ((!sortByPrice || !sortByDuration) && randomTickets.length > 0) {
      const random = [...randomTickets].sort(() => Math.random() - 0.5);
      setRandomTickets(random);
    }
  }, [sortByPrice, sortByDuration]);

  const filteredTickets: ITickets[] = randomTickets.filter(ticket => {
    const isLessThanFour = ticket.number_of_changes < 4;
    const isPriceLessThanMaxValue = ticket.value <= maxValue;
    if (transfers.length > 0) {
      return (
        transfers.includes(ticket.number_of_changes) && isPriceLessThanMaxValue
      );
    }
    return isLessThanFour && isPriceLessThanMaxValue;
  });

  const sortedTicketsByPrice = sortByPrice
    ? filteredTickets.sort((a, b) => a.value - b.value)
    : filteredTickets;

  const sortedTicketsByDuration = sortByDuration
    ? filteredTickets.sort((a, b) => a.duration - b.duration)
    : filteredTickets;

  const sortedTickets = sortByPrice
    ? sortedTicketsByPrice
    : sortedTicketsByDuration;

  return (
    <div className='list'>
      {isTicketsLoading ? (
        <>Loading...</>
      ) : (
        <>
          {ticketError ? (
            <>Error</>
          ) : sortedTickets.length === 0 ? (
            <>Ничего не найдено</>
          ) : (
            <>
              {sortedTickets.map((ticket: ITickets) => (
                <TicketItem ticket={ticket} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TicketList;
