import { useSimilarityList } from '@/api/hooks/useSimilarityList'
import { useWorksheetStore } from '@/stores/useWorksheetStore'
import { useEffect } from 'react'
import { IconButton } from './ui/IconButton'
import { AddIcon } from './ui/icon/AddIcon'
import { ProblemCard } from './ProblemCard'
import { Problem } from '@/api/types/type'

export const WorksheetSimilarity = () => {
    const {
        activeProblemId,
        worksheetProblems,
        similarityList,
        shouldRefetch,
        swapProblem,
        insertBeforeActive,
        setActiveProblem,
        setShouldRefetch,
        setSimilarityList,
    } = useWorksheetStore()

    const problemIds = worksheetProblems
        .filter(item => item.id !== activeProblemId)
        .map(item => item.id)

    const { data } = useSimilarityList({
        problemId: activeProblemId ?? null,
        excludedIds: problemIds,
        enabled: shouldRefetch,
    })

    const handleswapProblem = (item: Problem) => {
        swapProblem(item)
        setActiveProblem(item.id)
        setShouldRefetch(false)
    }

    const handleInsertProblem = (item: Problem) => {
        insertBeforeActive(item)
        setShouldRefetch(false)
    }

    useEffect(() => {
        if (data) {
            setSimilarityList(data)
        }
    }, [data, setSimilarityList])

    const hasProblems = similarityList && similarityList.length > 0

    return (
        <div className="bg-mono-gray-300 rounded-12 pc:w-[504px] pc:h-[1022px] flex h-[740px] w-480 flex-col overflow-hidden">
            {/* 헤더 */}
            {hasProblems && (
                <div className="flex-shrink-0">
                    <h2 className="text-sp-16 font-b p-16">유사 문제</h2>
                </div>
            )}

            {/* 스크롤 가능한 컨텐츠 영역 */}
            <div className="flex-1 overflow-y-auto">
                {hasProblems ? (
                    <div className="flex flex-col gap-16 px-16 pb-16">
                        {similarityList.map((item, idx) => {
                            const similarityButtons = (
                                <>
                                    <IconButton icon="swap" onClick={() => handleswapProblem(item)}>
                                        <span className="text-sp-12 text-mono-gray-600 whitespace-nowrap">
                                            교체
                                        </span>
                                    </IconButton>
                                    <IconButton
                                        icon="add"
                                        onClick={() => handleInsertProblem(item)}
                                    >
                                        <span className="text-sp-12 text-mono-gray-600 whitespace-nowrap">
                                            추가
                                        </span>
                                    </IconButton>
                                </>
                            )

                            return (
                                <ProblemCard
                                    key={item.id}
                                    item={item}
                                    index={idx + 1}
                                    buttons={similarityButtons}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </div>
        </div>
    )
}

const EmptyState = () => (
    <div className="text-mono-gray-500 text-sp-14 flex h-full flex-col justify-center text-center">
        <div className="mb-4 flex items-center justify-center gap-6">
            <AddProblemButton />
            <span>버튼을 누르면</span>
        </div>
        <span className="inline-block">유사 문제가 추가됩니다.</span>
    </div>
)

const AddProblemButton = () => (
    <div className="border-mono-gray-400 flex h-24 items-center justify-center gap-6 border">
        <span className="rounded-2 flex w-fit items-center gap-2 rounded bg-white p-6">
            <AddIcon size={10} />
            <span className="text-sp-10">유사 문제</span>
        </span>
    </div>
)
