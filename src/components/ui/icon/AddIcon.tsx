interface AddIconProps {
    size?: number
    active?: boolean
}

export const AddIcon = ({ size, active }: AddIconProps) => {
    return (
        <img
            src={active ? '/assets/icons/add-circle-active.svg' : '/assets/icons/add-circle.svg'}
            alt="add"
            width={size ?? 16}
            height={size ?? 16}
        />
    )
}
