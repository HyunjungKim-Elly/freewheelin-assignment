import { WorksheetSimilarity } from "@/components/WorksheetSimilarity"
import { WorksheetDetail } from "@/components/WorksheetDetail"

const Home = () => {
    return (
        <div className="w-full min-h-screen bg-gray-50 text-gray-800">
            <main className="flex">
                <WorksheetSimilarity />
                <WorksheetDetail />
            </main>
        </div>
    )
}

export default Home