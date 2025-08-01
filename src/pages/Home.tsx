import { WorksheetSimilarity } from "@/components/WorksheetSimilarity"
import { WorksheetDetail } from "@/components/WorksheetDetail"

const Home = () => {
    return (
        <div className="w-full min-h-screen text-gray-800">
            <main>
                <div className="flex justify-center">
                    <WorksheetSimilarity />
                    <WorksheetDetail />
                </div>
            </main>
        </div>
    )
}

export default Home