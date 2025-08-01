import { useQuizList } from "@/api/hooks/useQuizList"

export const WorksheetDetail = () => {

    const { data, isLoading } = useQuizList()

    console.log(data)

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="w-[712px] bg-mono-gray-800">
            {data?.map((item) => (
                <div key={item.id}>
                    <img className="w-[680px]" src={item.problemImageUrl} alt={item.title} />
                    <p>{item.title}</p>
                    <p>{item.answerRate}</p>
                </div>
            ))}
        </div>
    )
}