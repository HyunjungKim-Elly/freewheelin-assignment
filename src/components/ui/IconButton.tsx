import { AddIcon } from './icon/AddIcon'
import { DeleteIcon } from './icon/DeleteIcon'
import { SwapIcon } from './icon/SwapIcon'

type Icon = 'add' | 'delete' | 'swap' | 'add-active'

interface IconButtonProps {
    icon: Icon
    onClick?: () => void
    children: React.ReactNode
}

export const IconButton = ({ icon, onClick, children }: IconButtonProps) => {
    const iconMap = {
        // 아이콘 추가 시 여기에 추가
        add: <AddIcon />,
        delete: <DeleteIcon />,
        swap: <SwapIcon />,
        'add-active': <AddIcon active />,
    }

    return (
        <button
            className="rounded-12 flex min-w-fit flex-shrink-0 cursor-pointer items-center gap-4 bg-gray-100 whitespace-nowrap"
            onClick={onClick ?? undefined}
        >
            <span className="flex-shrink-0">{iconMap[icon]}</span>
            <span className="flex-shrink-0">{children}</span>
        </button>
    )
}
