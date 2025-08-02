import { useSimilarityList } from '@/api/hooks/useSimilarityList'
import { IconButton } from './ui/IconButton'
import { AddIcon } from './ui/icon/AddIcon'
import { getLevelColor } from '@/utils/common'
import { LevelString, TypeString } from '@/api/types/type'
import { useWorksheetStore } from '@/stores/useWorksheetStore'

export const WorksheetSimilarity = () => {
    const {
        activeProblemId,
        worksheetProblems,
        shouldRefetch,
        replaceProblem,
        insertBeforeActive,
        setActiveProblem,
        setShouldRefetch,
    } = useWorksheetStore()

    const problemIds = worksheetProblems
        .filter(item => item.id !== activeProblemId)
        .map(item => item.id)

    const { data: similarityList } = useSimilarityList({
        problemId: activeProblemId ?? null,
        excludedIds: problemIds,
        enabled: shouldRefetch,
    })

    return (
        <div
            className={`bg-mono-gray-300 rounded-12 h-screen w-full overflow-hidden lg:max-w-[504px] ${similarityList?.length === 0 || !similarityList ? 'flex items-center justify-center' : ''}`}
        >
            {similarityList && similarityList.length > 0 && (
                <h2 className="text-sp-16 font-b p-16">유사 문제</h2>
            )}
            <div className="h-screen overflow-y-auto">
                <div className="flex flex-col gap-16 px-16">
                    {similarityList?.map((item, idx) => (
                        <div key={item.id} className="rounded-12 bg-white">
                            {/* 문제 헤더 */}
                            <div className="flex w-full items-center gap-10 rounded-t-xl bg-gray-100">
                                <div className="flex w-full items-center justify-between px-28 py-16">
                                    <div className="flex items-center gap-36">
                                        <span className="text-sp-16 font-b">{idx + 1}</span>
                                        <p className="text-sp-14 max-w-[228px] truncate overflow-hidden whitespace-nowrap">
                                            {item.title}
                                        </p>
                                    </div>
                                    <div className="flex justify-end gap-12">
                                        <IconButton
                                            icon="swap"
                                            onClick={() => {
                                                replaceProblem(item)
                                                setActiveProblem(item.id)
                                                setShouldRefetch(false)
                                            }}
                                        >
                                            <span className="text-mono-gray-600 whitespace-nowrap">
                                                교체
                                            </span>
                                        </IconButton>
                                        <IconButton
                                            icon="add"
                                            onClick={() => {
                                                insertBeforeActive(item)
                                                setShouldRefetch(false)
                                            }}
                                        >
                                            <span className="text-mono-gray-600 whitespace-nowrap">
                                                추가
                                            </span>
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            {/* 문제 내용 */}
                            <div className="flex p-16">
                                <div className="mr-16 flex flex-col gap-4 text-center">
                                    <div className={`text-sp-12 rounded-4 h-20 w-40 bg-gray-200`}>
                                        <span className={`${getLevelColor(item.level)}`}>
                                            {LevelString[item.level]}
                                        </span>
                                    </div>
                                    <div className="text-sp-12 rounded-4 text-mono-gray-600 text-mono-gray-600 h-20 w-40 bg-gray-200 p-2">
                                        {item.answerRate}
                                    </div>
                                    <div className="text-sp-12 rounded-4 text-mono-gray-600 h-20 w-40 bg-gray-200 p-2">
                                        {TypeString[item.type]}
                                    </div>
                                </div>
                                <div className="rounded-12 mr-200 mb-16 bg-white">
                                    <img src={item.problemImageUrl} alt={item.title} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {!similarityList && (
                    <div className="text-mono-gray-500 text-sp-14 text-center">
                        <div className="mb-4 flex items-center justify-center gap-6">
                            <AddProblemButton /> <span>버튼을 누르면</span>
                        </div>
                        <span className="inline-block">유사 문제가 추가됩니다.</span>
                    </div>
                )}
            </div>
        </div>
    )
}

const AddProblemButton = () => {
    return (
        <div className="border-mono-gray-400 flex h-24 items-center justify-center gap-6 border">
            <span className="rounded-2 flex w-fit items-center gap-2 rounded bg-white p-6">
                <AddIcon size={10} />
                <span className="text-sp-10">유사 문제</span>
            </span>
        </div>
    )
}
