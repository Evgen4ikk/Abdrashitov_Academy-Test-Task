import { FC, useEffect, useState } from 'react'
import TicketService from '../../api/TicketService'
import { useFetching } from '../../hooks/useFetching'
import { ITickets } from '../../types/ITickets'
import TicketItem from '../TicketItem/TicketItem'

const TicketList: FC = () => {
	const [tickets, setTickets] = useState([])

	const [fetchTickets, isTicketsLoading, ticketError] = useFetching(
		async () => {
			const response = await TicketService.getAllTickets()
			setTickets([...tickets, ...response.data])
		}
	)

	console.log(tickets)

	useEffect(() => {
		fetchTickets()
	}, [])

	return (
		<div className='list'>
			{isTicketsLoading ? (
				<>Loading...</>
			) : (
				<>
					{tickets.map((ticket: ITickets) => (
						<>
							<TicketItem ticket={ticket} />
						</>
					))}
				</>
			)}
		</div>
	)
}

export default TicketList
