import { WorksheetDetail } from '@/components/features/worksheet/WorksheetDetail'
import { WorksheetSimilarity } from '@/components/features/worksheet/WorksheetSimilarity'

const Home = () => {
    return (
        <div className="w-full text-gray-800">
            <main>
                <div className="flex h-screen items-center justify-center gap-16 p-24">
                    <WorksheetSimilarity />
                    <WorksheetDetail />
                </div>
            </main>
        </div>
    )
}

export default Home
