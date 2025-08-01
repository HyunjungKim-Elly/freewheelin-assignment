export type Level = 1 | 2 | 3 | 4 | 5
export type Type = 1 | 2

export interface Quiz {
    id: number
    level: Level
    type: Type
    problemImageUrl: string
    title: string
    answerRate: number
}
