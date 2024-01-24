import { useState } from 'react'

export const useFetching = (callback: any) => {
	const [isLoading, setIsLoading] = useState(false)
	const [error,setError] = useState('')

	const fetching = async (...args: any) => {
		try {
			setIsLoading(true)
			await callback(...args)
		} catch (e) {
			setError(e.massage)
		} finally {
			setIsLoading(false)
		}
	}
	return [fetching, isLoading, error]
}