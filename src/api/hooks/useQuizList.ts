import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { Level, Type } from '../types/type'

export interface Quiz {
    id: number
    level: Level
    type: Type
    problemImageUrl: number
    title: string
    answerRate: number
}

export const useQuizList = () => {
    const { data, error, isLoading } = useSWR<Quiz[]>('/problems', fetcher)

    return {
        quizList: data,
        isLoading,
        isError: error,
    }
}