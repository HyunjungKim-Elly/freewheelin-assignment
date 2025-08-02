import { WorksheetDetail } from '@/components/WorksheetDetail'
import { WorksheetSimilarity } from '@/components/WorksheetSimilarity'

const Home = () => {
    return (
        <div className="h-screen w-full text-gray-800">
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
