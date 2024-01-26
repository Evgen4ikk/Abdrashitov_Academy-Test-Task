import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FC, useState } from 'react';
import TicketList from '../TicketList/TicketList';

const Main: FC = () => {
  const [maxValue, setMaxValue] = useState<number>(100000);
  const [sortByPrice, setSortByPrice] = useState<boolean>(false);
  const [sortByDuration, setSortByDuration] = useState<boolean>(false);
  const [transfers, setTransfers] = useState<number[]>([]);

  const handleTransfersChange = (transfer: number) => {
    if (transfers.includes(transfer)) {
      setTransfers(transfers.filter(t => t !== transfer));
    } else {
      setTransfers([...transfers, transfer]);
    }
  };

  const handleSortByPriceChange = () => {
    setSortByPrice(!sortByPrice);
  };

  const handleSortByDurationChange = () => {
    setSortByDuration(!sortByDuration);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSliderChange = (newValue: any) => {
    setMaxValue(newValue);
  };

  return (
    <div className='main'>
      <>
        <div className='menu'>
          <div className='list'>
            <h4 className='title'>Пересадки</h4>
            <div className='checkbox'>
              {[0, 1, 2, 3].map(transferCount => (
                <label key={transferCount} className='label'>
                  <input
                    type='checkbox'
                    className='input'
                    checked={transfers.includes(transferCount)}
                    onChange={() => handleTransfersChange(transferCount)}
                  />
                  <span className='mark'></span>
                  <span className='name'>{`${
                    transferCount === 0 ? 'Без' : transferCount
                  } пересад${transferCount !== 1 ? 'ки' : 'ка'}`}</span>
                </label>
              ))}
            </div>
            <div className='price'>
              <h4 className='title'>Цена</h4>
              <div className='price-slider'>
                <div className='price-label'>
                  <div className='total'>Всего</div>
                  <div className='max-price'>До {maxValue} ₽</div>
                </div>
                <Slider
                  min={0}
                  max={50000}
                  step={337}
                  value={maxValue}
                  onChange={handleSliderChange}
                />
              </div>
              <label className='radio'>
                <input
                  type='checkbox'
                  className='input'
                  name='price'
                  onChange={handleSortByPriceChange}
                />
                <span className='mark'></span>
                <span className='name'>Сначала дешёвые</span>
              </label>
            </div>
            <h4 className='title'>Время в пути</h4>
            <div className='time'>
              <label className='radio'>
                <input
                  type='checkbox'
                  className='input'
                  name='duradion'
                  onChange={handleSortByDurationChange}
                />
                <span className='mark'></span>
                <span className='name'>Самый быстрый</span>
              </label>
            </div>
          </div>
        </div>
      </>
      <TicketList
        transfers={transfers}
        maxValue={maxValue}
        sortByPrice={sortByPrice}
        sortByDuration={sortByDuration}
      />
    </div>
  );
};

export default Main;
