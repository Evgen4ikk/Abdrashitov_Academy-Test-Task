import { FC } from 'react'
import { ITickets } from '../../types/ITickets'

interface ITicketItem {
	ticket: ITickets
}

const TicketItem: FC<ITicketItem> = ({ ticket }) => {
	console.log(ticket)
	return <div className='ticket'>
		<div className="container">
			<div className="title">
				<div className="price">{ticket.value} ₽</div>
				<div className="gate">{ticket.gate}</div>
			</div>
		</div>
	</div>
}

export default TicketItem
