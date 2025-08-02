import { useProblemList } from '@/api/hooks/useProblemList'
import { LevelString, TypeString } from '@/api/types/type'
import { getLevelColor } from '@/utils/common'
import { IconButton } from './ui/IconButton'
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
            setActiveProblem(null)
            setShouldRefetch(true)
        }
    }

    const hasProblems = worksheetProblems.length > 0

    return (
        <div className="bg-mono-gray-800 pc:w-[712px] rounded-12 pc:h-[1022px] flex h-[740px] w-480 flex-col">
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

                            return (
                                <div
                                    key={item.id}
                                    className={`rounded-12 bg-white drop-shadow-sm ${
                                        isActive ? 'border-3 border-blue-500' : ''
                                    }`}
                                >
                                    {/* 문제 헤더 */}
                                    <div className="flex w-full items-center gap-10 rounded-t-xl bg-gray-100">
                                        <div className="flex w-full items-center justify-between px-28 py-16">
                                            <div className="flex items-center gap-32">
                                                <span className="text-sp-18 font-b pc:text-sp-20">
                                                    {idx + 1}
                                                </span>
                                                <p className="text-sp-14 max-w-[228px] truncate overflow-hidden whitespace-nowrap">
                                                    {item.title}
                                                </p>
                                            </div>

                                            <div className="flex gap-12">
                                                <IconButton
                                                    icon={isActive ? 'add-active' : 'add'}
                                                    onClick={() =>
                                                        handleSimilarProblemClick(item.id)
                                                    }
                                                >
                                                    <span
                                                        className={`text-sp-12 whitespace-nowrap ${
                                                            isActive
                                                                ? 'text-blue-500'
                                                                : 'text-mono-gray-600'
                                                        }`}
                                                    >
                                                        유사 문제
                                                    </span>
                                                </IconButton>

                                                <IconButton
                                                    icon="delete"
                                                    onClick={() => handleDeleteProblem(item.id)}
                                                >
                                                    <span className="text-sp-12 text-mono-gray-600 whitespace-nowrap">
                                                        삭제
                                                    </span>
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 문제 내용 */}
                                    <div className="flex p-16">
                                        <div className="mr-16 flex flex-col gap-4 text-center">
                                            <div className="text-sp-12 rounded-4 flex h-20 w-40 items-center justify-center bg-gray-200">
                                                <span className={getLevelColor(item.level)}>
                                                    {LevelString[item.level]}
                                                </span>
                                            </div>
                                            <div className="text-sp-12 rounded-4 text-mono-gray-600 flex h-20 w-40 items-center justify-center bg-gray-200">
                                                {item.answerRate}
                                            </div>
                                            <div className="text-sp-12 rounded-4 text-mono-gray-600 flex h-20 w-40 items-center justify-center bg-gray-200">
                                                {TypeString[item.type]}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <img
                                                src={item.problemImageUrl}
                                                alt={item.title}
                                                className="rounded-12 h-auto w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <span className="text-sp-14 text-center text-white">
                            학습지 문제수가 없습니다. <br />
                            다음단계로 넘어가기 위해 문제를 추가해주세요.
                        </span>
                    </div>
                )}
            </div>

            {/* 푸터 */}
            {hasProblems && (
                <div className="flex w-full flex-shrink-0 items-center justify-end p-16">
                    <div className="flex items-center gap-12">
                        <span className="pc:text-sp-16 text-sp-12 text-mono-gray-600">
                            하{levelCounts[1]} · 중하{levelCounts[2]} · 중{levelCounts[3]} · 상
                            {levelCounts[4]} · 최상{levelCounts[5]}
                        </span>
                        <span className="pc:text-sp-16 text-sp-12 text-white">
                            | 문제 수: {worksheetProblems.length}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
