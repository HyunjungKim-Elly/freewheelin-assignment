import { useQuizList } from "@/api/hooks/useQuizList"
import { LevelString, TypeString } from "@/api/types/type"
import { IconButton } from "./ui/IconButton"

export const WorksheetDetail = () => {

    const { data, isLoading } = useQuizList()

    console.log(data)

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="lg:w-[712px] bg-mono-gray-800 rounded-12 p-10">
            <h2 className="text-sp-26 text-mono-gray-300">학습지 상세 편집</h2>
            <div className="flex flex-col gap-16">
                {data?.map((item) => (
                    <div key={item.id} className="bg-white rounded-12 overflow-hidden">
                        <div className="w-full flex gap-10 bg-gray-100">
                            <span className="text-sp-20">{item.id}</span>
                            <p>{item.title}</p>
                            <p>{item.answerRate}</p>
                            <p>{LevelString[item.level]}</p>
                            <p>{TypeString[item.type]}</p>
                            <p>{item.answerRate}</p>
                            <IconButton icon="add" onClick={() => { }}>
                                유사 문제
                            </IconButton>
                        </div>
                        <div className="bg-white rounded-12 p-10">
                            <img className="w-[680px]" src={item.problemImageUrl} alt={item.title} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}