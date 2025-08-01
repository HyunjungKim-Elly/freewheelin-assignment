import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { Quiz } from '../types/type'


export const useQuizList = () => {
    const { data, error, isLoading } = useSWR<Quiz[]>('/problems', fetcher)

    return {
        data,
        isLoading,
        isError: error,
    }
}