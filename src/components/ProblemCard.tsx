import { ReactNode } from 'react'
import { LevelString, Problem, TypeString } from '@/api/types/type'
import { getLevelColor } from '@/utils/common'

interface ProblemCardProps {
    item: Problem
    index: number
    isActive?: boolean
    buttons: ReactNode
    className?: string
}

export const ProblemCard = ({
    item,
    index,
    isActive = false,
    buttons,
    className = '',
}: ProblemCardProps) => {
    return (
        <div
            className={`rounded-12 bg-white drop-shadow-sm ${
                isActive ? 'border-3 border-blue-500' : ''
            } ${className}`}
        >
            {/* 문제 헤더 */}
            <div className="flex w-full items-center gap-10 rounded-t-xl bg-gray-100">
                <div className="flex w-full items-center justify-between px-28 py-16">
                    <div className="flex items-center gap-32">
                        <span className="text-sp-18 font-b pc:text-sp-20">{index}</span>
                        <p className="text-sp-14 max-w-[228px] truncate overflow-hidden whitespace-nowrap">
                            {item.title}
                        </p>
                    </div>

                    <div className="flex justify-end gap-12">{buttons}</div>
                </div>
            </div>

            {/* 문제 내용 */}
            <div className="flex p-16">
                <div className="mr-16 flex flex-col gap-4 text-center">
                    <ProblemInfoBox className={getLevelColor(item.level)}>
                        {LevelString[item.level]}
                    </ProblemInfoBox>
                    <ProblemInfoBox>{item.answerRate}</ProblemInfoBox>
                    <ProblemInfoBox>{TypeString[item.type]}</ProblemInfoBox>
                </div>

                <div className="pc:pr-100 flex-1 pr-70 pb-16">
                    <img
                        src={item.problemImageUrl}
                        alt={item.title}
                        className="rounded-12 h-auto w-full"
                    />
                </div>
            </div>
        </div>
    )
}

// 문제 정보 박스 컴포넌트
interface ProblemInfoBoxProps {
    children: ReactNode
    className?: string
}

const ProblemInfoBox = ({ children, className = '' }: ProblemInfoBoxProps) => (
    <div className="text-sp-12 rounded-4 flex h-20 w-40 items-center justify-center bg-gray-200">
        <span className={`text-mono-gray-600 ${className}`}>{children}</span>
    </div>
)
