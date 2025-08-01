export type Level = 1 | 2 | 3 | 4 | 5
export type Type = 1 | 2

export const LevelString = {
    1: "하",
    2: "중하",
    3: "중",
    4: "상",
    5: "최상"
} as const
export type LevelString = (typeof LevelString)[keyof typeof LevelString]

export const TypeString = {
    1: "객관식",
    2: "주관식"
} as const
export type TypeString = (typeof TypeString)[keyof typeof TypeString]

export interface Quiz {
    id: number
    level: Level
    type: Type
    problemImageUrl: string
    title: string
    answerRate: number
}
