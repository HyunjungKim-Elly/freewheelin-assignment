import { AddIcon } from './icon/AddIcon'
import { DeleteIcon } from './icon/DeleteIcon'

type Icon = 'add' | 'delete'

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
    }

    return (
        <button
            className="rounded-12 flex items-center gap-4 bg-gray-100"
            onClick={onClick ?? undefined}
        >
            {iconMap[icon]}
            {children}
        </button>
    )
}
