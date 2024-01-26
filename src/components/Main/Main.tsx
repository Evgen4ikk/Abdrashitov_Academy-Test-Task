import { FC } from 'react';
import FilterMenu from '../FilterMenu/FilterMenu';
import TicketList from '../TicketList/TicketList';

const Main: FC = () => {
  return (
    <div className='main'>
      <FilterMenu />
      <TicketList />
    </div>
  );
};

export default Main;
