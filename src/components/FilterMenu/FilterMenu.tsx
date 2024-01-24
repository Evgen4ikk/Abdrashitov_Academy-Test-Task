import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { FC, useState } from 'react'

const FilterMenu: FC = () => {
	const [maxValue, setMaxValue] = useState<number>(100000)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSliderChange = (newValue: any) => {
		setMaxValue(newValue)
	}

	return (
		<div className='menu'>
			<div className='list'>
				<h4 className='title'>Пересадки</h4>
				<div className='checkbox'>
					<label className='label'>
						<input type='checkbox' className='input' />
						<span className='mark'></span>
						<span className='name'>Без пересадок</span>
					</label>
					<label className='label'>
						<input type='checkbox' className='input' />
						<span className='mark'></span>
						<span className='name'>1 пересадка</span>
					</label>
					<label className='label'>
						<input type='checkbox' className='input' />
						<span className='mark'></span>
						<span className='name'>2 пересадки</span>
					</label>
					<label className='label'>
						<input type='checkbox' className='input' />
						<span className='mark'></span>
						<span className='name'>3 пересадки</span>
					</label>
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
							max={100000}
							step={337}
							value={maxValue}
							onChange={handleSliderChange}
						/>
					</div>
					<label className='radio'>
						<input type='radio' className='input' name='price'/>
						<span className='mark'></span>
						<span className='name'>Сначала дешёвые</span>
					</label>
				</div>
				<h4 className='title'>Время в пути</h4>
				<div className='time'>
					<label className='radio'>
						<input type='radio' className='input' name='price'/>
						<span className='mark'></span>
						<span className='name'>Самый быстрый</span>
					</label>
				</div>
			</div>
		</div>
	)
}

export default FilterMenu
