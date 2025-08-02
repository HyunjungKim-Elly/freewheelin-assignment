import { WorksheetDetail } from '@/components/WorksheetDetail'
import { WorksheetSimilarity } from '@/components/WorksheetSimilarity'

const Home = () => {
    return (
        <div className="h-screen w-full text-gray-800">
            <main>
                <div className="flex justify-center gap-16">
                    <WorksheetSimilarity />
                    <WorksheetDetail />
                </div>
            </main>
        </div>
    )
}

export default Home
