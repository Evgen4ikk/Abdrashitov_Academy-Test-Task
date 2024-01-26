import { FC } from 'react';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { ITickets } from '../../types/ITickets';
import { calculateArrivalTime } from '../../utils/calculateArrivalTime';
import { calculateFlightTime } from '../../utils/calculateFlightTime';
import { formatPrice } from '../../utils/formatPrice';
import { formatDateTime } from '../../utils/formattedDataTime';

interface ModalWindowProps {
  ticket: ITickets;
  onClose: () => void;
}

const ModalWindow: FC<ModalWindowProps> = ({ ticket, onClose }) => {
  const dataTime = formatDateTime(ticket.found_at);

  const flightInfo = {
    departureTime: `${dataTime.formattedTime}`,
    date: `${dataTime.day} ${dataTime.month}`,
    travelTime: `${calculateFlightTime(ticket.duration)}`,
  };

  const arrivalInfo = calculateArrivalTime(flightInfo);

  const handleBackdropClick = () => {
    onClose();
  };

  const flightClass = (tripClass: number): string => {
    if (tripClass === 0) {
      return ' Экономический';
    } else if (tripClass === 1) {
      return ' Бизнес';
    } else if (tripClass === 2) {
      return ' Первый';
    } else {
      return ' Неверный класс перелета';
    }
  };

  return (
    <div className='modal'>
      <div className='container'>
        <div className='close' onClick={handleBackdropClick}>
          Закрыть
          <span>
            <IoMdClose size={24} />
          </span>
        </div>
        <div className='route'>
          {ticket.origin}&nbsp;— {ticket.destination}
          <div className='time'>
            {calculateFlightTime(ticket.duration)} в пути
          </div>
        </div>
        <div className='total-price mb-10px'>
          <span className='title'>Цена: </span>
          <span className='rub'>{formatPrice(ticket.value)} ₽</span>
          <div>
            {ticket.actual ? (
              <div className='relevance'>
                Цена акутальная
                <IoMdCheckmark size={20} color='green' />
              </div>
            ) : (
              <div className='relevance'>
                Цена не акутальна
                <IoMdCheckmark size={20} color='red' />
              </div>
            )}
          </div>
        </div>
        <div className='information'>
          <div className='information-container'>
            <div className='flight-class mb-10px'>
              <span className='title'>Класс перелета: </span>
              <span> {flightClass(ticket.trip_class)}</span>
            </div>
            <div className='gate'>
              <span className='title'>Компания: </span>
              {ticket.gate}
            </div>
            <div className='departure mb-10px'>
              <span className='title'>Вылет: </span>
              {dataTime.day} {dataTime.month}
              <span className='hours'> в {dataTime.formattedTime}</span>
            </div>
            <div className='landing mb-10px'>
              <span className='time'>
                <span className='title'>Посадка: </span>
                {arrivalInfo.arrivalDate}
              </span>
              <span className='hours'> в {arrivalInfo.arrivalTime}</span>
            </div>
            <div className='time mb-10px'>
              <span className='title'>В пути: </span>
              {calculateFlightTime(ticket.duration)}
            </div>
            <div className='transfer mb-10px'>
              <span className='title'>Кол-во пересадок: </span>
              {ticket.number_of_changes}
            </div>
            <div className='mb-10px'>
              <span className='title'>В одну сторону: </span>
              Да
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
