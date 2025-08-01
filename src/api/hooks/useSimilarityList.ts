// src/api/hooks/useSimilarityList.ts

import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { Quiz } from '../types/type'

export const useSimilarityList = (problemId: number, excludedIds: number[]) => {
    const queryString = new URLSearchParams({
        excludedProblemIds: excludedIds.join(','),
    }).toString()

    const key = problemId ? `/problems/${problemId}/similarity?${queryString}` : null

    const { data, error, isLoading } = useSWR<Quiz[]>(key, fetcher)

    return {
        data,
        isLoading,
        isError: error,
    }
}