// src/stores/useWorksheetStore.ts
import { create } from 'zustand'
import { Problem } from '@/api/types/type'

interface WorksheetState {
    activeProblemId: number | null
    worksheetProblems: Problem[]
    setActiveProblem: (id: number) => void
    replaceProblem: (newProblem: Problem) => void
    insertBeforeActive: (newProblem: Problem) => void
    setWorksheetProblems: (list: Problem[]) => void
    removeWorksheetProblem: (id: number) => void
}

export const useWorksheetStore = create<WorksheetState>((set, get) => ({
    activeProblemId: null,
    worksheetProblems: [],

    setActiveProblem: id => set({ activeProblemId: id }),

    setWorksheetProblems: list => set({ worksheetProblems: list }),

    replaceProblem: newProblem =>
        set(state => ({
            worksheetProblems: state.worksheetProblems.map(q =>
                q.id === state.activeProblemId ? newProblem : q,
            ),
        })),

    insertBeforeActive: newProblem => {
        const { worksheetProblems, activeProblemId } = get()
        const index = worksheetProblems.findIndex(q => q.id === activeProblemId)
        if (index === -1) return
        const updated = [...worksheetProblems]
        updated.splice(index, 0, newProblem)
        set({ worksheetProblems: updated })
    },

    removeWorksheetProblem: id =>
        set(state => ({
            worksheetProblems: state.worksheetProblems.filter(q => q.id !== id),
        })),
}))
