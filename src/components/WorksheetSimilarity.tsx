import { useSimilarityList } from "@/api/hooks/useSimilarityList"


export const WorksheetSimilarity = () => {
    const { data, isLoading } = useSimilarityList(39468, [39468])

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