import { useProblemList } from '@/api/hooks/useProblemList'
import { LevelString, TypeString } from '@/api/types/type'
import { getLevelColor } from '@/utils/common'
import { IconButton } from './ui/IconButton'
import { useWorksheetStore } from '@/stores/useWorksheetStore'
import { useEffect } from 'react'

export const WorksheetDetail = () => {
    const { data } = useProblemList()

    const {
        worksheetProblems,
        setWorksheetProblems,
        removeWorksheetProblem,
        setActiveProblem,
        activeProblemId,
    } = useWorksheetStore()

    useEffect(() => {
        setWorksheetProblems(data ?? [])
    }, [data])

    return (
        <div className="bg-mono-gray-800 rounded-12 flex h-screen flex-col lg:w-[712px]">
            <h2 className="text-sp-16 font-b p-16 text-white">학습지 상세 편집</h2>

            {/* 여기에만 스크롤 적용 */}
            <div className="h-screen overflow-y-auto px-16">
                {worksheetProblems.length > 0 && (
                    <div className="flex flex-col gap-16">
                        {worksheetProblems?.map((item, idx) => (
                            <div key={item.id} className="rounded-12 bg-white">
                                {/* 문제 헤더 */}
                                <div className="flex w-full items-center gap-10 rounded-t-xl bg-gray-100 p-4">
                                    <div className="flex w-full items-center justify-between px-28 py-16">
                                        <div className="flex items-center gap-36">
                                            <span className="text-sp-14">{idx + 1}</span>
                                            <p>{item.title}</p>
                                        </div>
                                        <div className="flex gap-12">
                                            <IconButton
                                                icon={
                                                    activeProblemId === item.id
                                                        ? 'add-active'
                                                        : 'add'
                                                }
                                                onClick={() => {
                                                    setActiveProblem(item.id)
                                                }}
                                            >
                                                <span
                                                    className={`${
                                                        activeProblemId === item.id
                                                            ? 'text-blue-500'
                                                            : 'text-mono-gray-600'
                                                    } whitespace-nowrap`}
                                                >
                                                    유사 문제
                                                </span>
                                            </IconButton>
                                            <IconButton
                                                icon="delete"
                                                onClick={() => removeWorksheetProblem(item.id)}
                                            >
                                                <span className="text-mono-gray-600 whitespace-nowrap">
                                                    삭제
                                                </span>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                                {/* 문제 내용 */}
                                <div className="flex p-16">
                                    <div className="mr-16 flex flex-col gap-4 text-center">
                                        <div
                                            className={`text-sp-12 rounded-4 h-20 w-40 bg-gray-200`}
                                        >
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
                )}
                {worksheetProblems.length === 0 && (
                    <div className="flex h-full items-center justify-center">
                        <span className="text-sp-14 text-center text-white">
                            학습지 문제수가 없습니다. <br />
                            다음단계로 넘어가기 위해 문제를 추가해주세요.
                        </span>
                    </div>
                )}
            </div>

            <footer
                className={`flex items-center justify-between p-16 ${worksheetProblems.length === 0 ? 'hidden' : ''}`}
            >
                <div className="flex items-center gap-12">
                    <span className="text-sp-16 text-mono-gray-600">
                        총 문제 수: {data?.length}
                    </span>
                </div>
            </footer>
        </div>
    )
}
