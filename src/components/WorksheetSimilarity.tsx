import { useSimilarityList } from "@/api/hooks/useSimilarityList"
import { Quiz } from "@/api/types/type"


interface WorksheetSimilarityProps {
    selectedProblem: Quiz | null
}

export const WorksheetSimilarity = ({ selectedProblem }: WorksheetSimilarityProps) => {

    const { data, isLoading } = useSimilarityList(selectedProblem?.id ?? 0, [selectedProblem?.id ?? 0])

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="bg-mono-gray-300">
            {data?.map((item) => (
                <div key={item.id}>
                    <p className="   text-sp-18">{item.title}</p>
                </div>
            ))}
        </div>
    )
}