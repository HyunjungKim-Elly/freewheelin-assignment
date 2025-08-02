import { create } from 'zustand'
import { Problem } from '@/api/types/type'

interface WorksheetState {
    activeProblemId: number | null
    worksheetProblems: Problem[]
    similarityList: Problem[]
    shouldRefetch: boolean

    setActiveProblem: (id: number | null) => void
    setWorksheetProblems: (list: Problem[]) => void
    setSimilarityList: (list: Problem[]) => void
    setShouldRefetch: (shouldRefetch: boolean) => void

    swapProblem: (newProblem: Problem) => void
    insertBeforeActive: (newProblem: Problem) => void
    removeWorksheetProblem: (id: number) => void
}

export const useWorksheetStore = create<WorksheetState>((set, get) => ({
    activeProblemId: null,
    worksheetProblems: [],
    similarityList: [],
    shouldRefetch: true,

    setActiveProblem: id => set({ activeProblemId: id }),
    setWorksheetProblems: list => set({ worksheetProblems: list }),
    setSimilarityList: list => set({ similarityList: list }),
    setShouldRefetch: shouldRefetch => set({ shouldRefetch }),

    swapProblem: newProblem => {
        const { worksheetProblems, activeProblemId, similarityList } = get()

        const currentProblemIndex = worksheetProblems.findIndex(q => q.id === activeProblemId)
        const currentProblem = worksheetProblems[currentProblemIndex]

        if (currentProblemIndex === -1 || !currentProblem) return

        const updatedWorksheet = worksheetProblems.map(q => {
            if (q.id === activeProblemId) {
                return newProblem
            }
            return q
        })

        const updatedSimilarity = similarityList.map(q => {
            if (q.id === newProblem.id) {
                return currentProblem
            }
            return q
        })

        set({
            worksheetProblems: updatedWorksheet,
            similarityList: updatedSimilarity,
        })
    },

    insertBeforeActive: newProblem => {
        const { worksheetProblems, activeProblemId, similarityList } = get()

        const index = worksheetProblems.findIndex(q => q.id === activeProblemId)
        if (index === -1) return

        const updatedWorksheet = [...worksheetProblems]
        updatedWorksheet.splice(index, 0, newProblem)

        const updatedSimilarity = similarityList.filter(q => q.id !== newProblem.id)

        set({
            worksheetProblems: updatedWorksheet,
            similarityList: updatedSimilarity,
        })
    },

    removeWorksheetProblem: id => {
        const { worksheetProblems } = get()
        set({
            worksheetProblems: worksheetProblems.filter(q => q.id !== id),
        })
    },
}))
