import { useState } from 'react'
import { WorksheetSimilarity } from '@/components/WorksheetSimilarity'
import { WorksheetDetail } from '@/components/WorksheetDetail'
import { Quiz } from '@/api/types/type'

const Home = () => {
    const [selectedProblem, setSelectedProblem] = useState<Quiz | null>(null)
    return (
        <div className="min-h-screen w-full text-gray-800">
            <main>
                <div className="flex justify-center gap-16">
                    <WorksheetSimilarity selectedProblem={selectedProblem} />
                    <WorksheetDetail setSelectedProblem={setSelectedProblem} />
                </div>
            </main>
        </div>
    )
}

export default Home
