interface SwapIconProps {
    size?: number
}

export const SwapIcon = ({ size }: SwapIconProps) => {
    return (
        <img
            src={'/assets/icons/swap-horiz.svg'}
            alt="swap"
            width={size ?? 16}
            height={size ?? 16}
        />
    )
}
