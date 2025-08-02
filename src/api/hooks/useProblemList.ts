import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { Problem } from '../types/common.types'

export const useProblemList = () => {
    const { data, error, isLoading } = useSWR<Problem[]>('/problems', fetcher)

    return {
        data,
        isLoading,
        isError: error,
    }
}
