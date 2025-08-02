import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import { Problem } from '../types/common.types'

interface UseSimilarityListProps {
    problemId: number | null
    excludedIds: number[]
    enabled?: boolean
}

export const useSimilarityList = ({
    problemId,
    excludedIds,
    enabled = true,
}: UseSimilarityListProps) => {
    const queryString = new URLSearchParams({
        excludedProblemIds: excludedIds.join(','),
    }).toString()

    const key =
        enabled && problemId !== null
            ? `/problems/${problemId}/similarity?${queryString}`
            : enabled && problemId === null
              ? null // enabled는 true지만 problemId가 null → 캐시 제거 (삭제된 문제)
              : '' // enabled가 false → 캐시 유지 (기존 데이터 보여주기용, 교체 버튼 클릭 시)

    const { data, error, isLoading } = useSWR<Problem[]>(key, fetcher, {
        keepPreviousData: key === null ? false : true,
    })

    return {
        data,
        isLoading,
        isError: error,
    }
}
