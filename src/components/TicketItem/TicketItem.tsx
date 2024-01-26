import { FC } from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { PiAirplaneLandingLight, PiAirplaneTakeoffThin } from 'react-icons/pi';
import { TbTransfer } from 'react-icons/tb';
import { ITickets } from '../../types/ITickets';
import { calculateArrivalTime } from '../../utils/calculateArrivalTime';
import { calculateFlightTime } from '../../utils/calculateFlightTime';
import { formatPrice } from '../../utils/formatPrice';
import { formatDateTime } from '../../utils/formattedDataTime';

interface ITicketItem {
  ticket: ITickets;
}

const TicketItem: FC<ITicketItem> = ({ ticket }) => {
  const dataTime = formatDateTime(ticket.found_at);

  const flightInfo = {
    departureTime: `${dataTime.formattedTime}`,
    date: `${dataTime.day} ${dataTime.month}`,
    travelTime: `${calculateFlightTime(ticket.duration)}`,
  };

  const arrivalInfo = calculateArrivalTime(flightInfo);

  return (
    <div className='ticket'>
      <div className='container'>
        <div className='title'>
          <div className='price'>{formatPrice(ticket.value)} ₽</div>
          <div className='gate'>{ticket.gate}</div>
        </div>
        <div className='information'>
          <button className='btn'>Купить</button>
          <div className='road'>
            <div className='data'>
              <div className='hours'>{dataTime.formattedTime}</div>
              <div className='city'>{ticket.origin}</div>
              <div className='time'>
                {dataTime.day} {dataTime.month}
              </div>
            </div>
            <div className='arrow'>
              <IoMdArrowForward size={26}/>
            </div>
            <div className='departure'>
              <div className='travel-time'>
                <PiAirplaneTakeoffThin size={20} />
                <span>В пути {calculateFlightTime(ticket.duration)}</span>
                <PiAirplaneLandingLight size={20} />
              </div>

              {ticket.number_of_changes === 0 && <div className='transit' />}

              {ticket.number_of_changes === 1 && (
                <div className='transfers'>
                  <div className='one-transfer' />
                  <div className='transfer'>
                    <span>
                      <TbTransfer />
                    </span>
                  </div>
                  <div className='one-transfer' />
                </div>
              )}

              {ticket.number_of_changes === 2 && (
                <div className='transfers'>
                  <div className='two-transfer' />
                  <div className='transfer'>
                    <span>
                      <TbTransfer />
                    </span>
                  </div>
                  <div className='two-transfer' />
                  <div className='transfer'>
                    <span>
                      <TbTransfer />
                    </span>
                  </div>
                  <div className='two-transfer' />
                </div>
              )}

              {ticket.number_of_changes === 3 && (
                <div className='transfers'>
                  <div className='three-transfer' />
                  <div className='transfer'>
                    <span>
                      <TbTransfer />
                    </span>
                  </div>
                  <div className='three-transfer' />
                  <div className='transfer'>
                    <span>
                      <TbTransfer />
                    </span>
                  </div>
                  <div className='three-transfer' />
                  <div className='transfer'>
                    <span>
                      <TbTransfer />
                    </span>
                  </div>
                  <div className='three-transfer' />
                </div>
              )}

              <div className='city'>
                <div>{ticket.origin}</div>
                <div>{ticket.destination}</div>
              </div>
            </div>
            <div className='data'>
              <div className='hours'>{arrivalInfo.arrivalTime}</div>
              <div className='city'>{ticket.destination}</div>
              <div className='time'>{arrivalInfo.arrivalDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketItem;
