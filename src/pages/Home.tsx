import { useState } from "react"
import { WorksheetSimilarity } from "@/components/WorksheetSimilarity"
import { WorksheetDetail } from "@/components/WorksheetDetail"
import { Quiz } from "@/api/types/type"

const Home = () => {
    const [selectedProblem, setSelectedProblem] = useState<Quiz | null>(null)
    return (
        <div className="w-full min-h-screen text-gray-800">
            <main>
                <div className="flex justify-center">
                    <WorksheetSimilarity selectedProblem={selectedProblem} />
                    <WorksheetDetail setSelectedProblem={setSelectedProblem} />
                </div>
            </main>
        </div>
    )
}

export default Home