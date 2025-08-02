import { useProblemList } from '@/api/hooks/useProblemList'
import { IconButton } from '../../ui/IconButton'
import { ProblemCard } from '../problem/ProblemCard'
import { useWorksheetStore } from '@/stores/useWorksheetStore'
import { useEffect, useState } from 'react'

interface LevelCounts {
    1: number
    2: number
    3: number
    4: number
    5: number
}

export const WorksheetDetail = () => {
    const { data } = useProblemList()
    const {
        activeProblemId,
        worksheetProblems,
        setWorksheetProblems,
        removeWorksheetProblem,
        setActiveProblem,
        setShouldRefetch,
        setSimilarityList,
    } = useWorksheetStore()

    const [levelCounts, setLevelCounts] = useState<LevelCounts>({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    })

    // 초기 데이터 설정
    useEffect(() => {
        setWorksheetProblems(data ?? [])
    }, [data, setWorksheetProblems])

    // 난이도별 카운트 계산
    useEffect(() => {
        const counts = worksheetProblems.reduce<LevelCounts>(
            (acc, problem) => {
                acc[problem.level as keyof LevelCounts]++
                return acc
            },
            { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        )
        setLevelCounts(counts)
    }, [worksheetProblems])

    // 유사 문제 버튼 클릭 핸들러
    const handleSimilarProblemClick = (problemId: number) => {
        setActiveProblem(problemId)
        setShouldRefetch(true)
    }

    // 문제 삭제 핸들러
    const handleDeleteProblem = (problemId: number) => {
        removeWorksheetProblem(problemId)
        setShouldRefetch(false)

        // 현재 활성화된 문제를 삭제하는 경우
        if (activeProblemId === problemId) {
            // 현재 활성화된 문제를 삭제하면 유사문제 store에서 바로 초기화, useSimilarityList 활용 안해도됨
            setSimilarityList([])
        }
    }

    const hasProblems = worksheetProblems.length > 0

    return (
        <div className="bg-mono-gray-800 rounded-12 pc:w-[712px] pc:h-[1022px] flex h-[740px] w-480 flex-col">
            {/* 헤더 */}
            <div className="flex-shrink-0">
                <h2 className="text-sp-16 font-b p-16 text-white">학습지 상세 편집</h2>
            </div>

            {/* 스크롤 가능한 컨텐츠 영역 */}
            <div className="flex-1 overflow-y-auto px-16">
                {hasProblems ? (
                    <div className="flex flex-col gap-16 pb-16">
                        {worksheetProblems.map((item, idx) => {
                            const isActive = activeProblemId === item.id

                            // 학습지 상세용 버튼들
                            const detailButtons = (
                                <>
                                    <IconButton
                                        icon={isActive ? 'add-active' : 'add'}
                                        onClick={() => handleSimilarProblemClick(item.id)}
                                    >
                                        <span
                                            className={`text-sp-12 whitespace-nowrap ${
                                                isActive ? 'text-blue-500' : 'text-mono-gray-500'
                                            }`}
                                        >
                                            유사 문제
                                        </span>
                                    </IconButton>
                                    <IconButton
                                        icon="delete"
                                        onClick={() => handleDeleteProblem(item.id)}
                                    >
                                        <span className="text-sp-12 text-mono-gray-500 whitespace-nowrap">
                                            삭제
                                        </span>
                                    </IconButton>
                                </>
                            )

                            return (
                                <ProblemCard
                                    key={item.id}
                                    item={item}
                                    index={idx + 1}
                                    isActive={isActive}
                                    buttons={detailButtons}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>

            {/* 푸터 */}
            <div className="flex w-full flex-shrink-0 items-center justify-end p-16">
                {hasProblems ? (
                    <div className="flex items-center">
                        <span className="text-sp-12 text-mono-gray-600 pc:text-sp-16">
                            하{levelCounts[1]} · 중하{levelCounts[2]} · 중{levelCounts[3]} · 상
                            {levelCounts[4]} · 최상{levelCounts[5]}
                        </span>
                        <span className="text-sp-12 text-mono-gray-600 pc:text-sp-16 mx-8">|</span>
                        <span className="text-sp-12 pc:text-sp-16 font-m text-white">
                            문제 수: {worksheetProblems.length}
                        </span>
                    </div>
                ) : (
                    <span className="text-sp-12 pc:text-sp-16 text-red-500">문제 수 0 개</span>
                )}
            </div>
        </div>
    )
}

// 빈 상태 컴포넌트
const EmptyState = () => (
    <div className="flex h-full items-center justify-center">
        <span className="text-sp-14 text-center text-white">
            학습지 문제수가 없습니다. <br />
            다음단계로 넘어가기 위해 문제를 추가해주세요.
        </span>
    </div>
)
