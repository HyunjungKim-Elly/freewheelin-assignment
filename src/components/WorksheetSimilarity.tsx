import { useQuizList } from '@/api/hooks/useQuizList'
import { useSimilarityList } from '@/api/hooks/useSimilarityList'
import { LevelString, Quiz, TypeString } from '@/api/types/type'
import { IconButton } from './ui/IconButton'
import { AddIcon } from './ui/icon/AddIcon'
import { getLevelColor } from '@/utils/common'

interface WorksheetSimilarityProps {
    selectedProblem: Quiz | null
}

export const WorksheetSimilarity = ({ selectedProblem }: WorksheetSimilarityProps) => {
    const { data: problemList } = useQuizList()

    const problemIds = problemList?.map(item => item.id) ?? []
    const { data: similarityList } = useSimilarityList(selectedProblem?.id ?? 0, problemIds)

    return (
        <div
            className={`bg-mono-gray-300 rounded-12 w-full max-w-[702px] ${similarityList?.length === 0 || !similarityList ? 'flex items-center justify-center' : ''}`}
        >
            <div className="p-16">
                <div className="scroll-m-0 overflow-y-auto px-16">
                    <div className="flex flex-col gap-16">
                        {similarityList?.map((item, idx) => (
                            <div key={item.id} className="rounded-12 bg-white">
                                {/* 문제 헤더 */}
                                <div className="flex w-full items-center gap-10 rounded-t-xl bg-gray-100 p-4">
                                    <div className="flex w-full items-center justify-between px-28 py-16">
                                        <div className="flex items-center gap-36">
                                            <span className="text-sp-20">{idx + 1}</span>
                                            <p>{item.title}</p>
                                        </div>
                                        <div className="flex gap-12">
                                            <IconButton icon="add" onClick={() => {}}>
                                                <span className="text-mono-gray-600 whitespace-nowrap">
                                                    유사 문제
                                                </span>
                                            </IconButton>
                                            <IconButton icon="delete" onClick={() => {}}>
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
                </div>
                {!similarityList && (
                    <div className="text-sp-18 text-center">
                        <div className="flex items-center justify-center gap-6">
                            <span className="rounded-2 flex w-fit items-center gap-2 bg-white p-6">
                                <AddIcon />
                                유사문제
                            </span>{' '}
                            <span>버튼을 누르면</span>
                        </div>
                        <span>유사 문제가 추가됩니다.</span>
                    </div>
                )}
            </div>
        </div>
    )
}
