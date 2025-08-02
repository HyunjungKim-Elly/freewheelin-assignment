import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

// 1px부터 300px까지 spacing 객체 생성
const generateSpacing = (max: number) => {
    const spacing: Record<string, string> = {}
    for (let i = 1; i <= max; i++) {
        spacing[i.toString()] = `${i}px`
    }
    return spacing
}

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            tablet: '1024px', // 1024px 이상 1280px 미만
            pc: '1280px', // 1280px 이상
        },
        extend: {
            spacing: generateSpacing(300), // w-1, h-1, p-1, m-1 등 모든 spacing 유틸리티에 적용
            borderRadius: generateSpacing(300), // rounded-1, rounded-2 등
        },
    },
    plugins: [
        plugin(function ({ addUtilities }) {
            addUtilities({
                '.text-sp-8': {
                    'font-size': '8px',
                    'line-height': '12px',
                },
                '.text-sp-10': {
                    'font-size': '10px',
                    'line-height': '15px',
                },
                '.text-sp-12': {
                    'font-size': '12px',
                    'line-height': '18px',
                },
                '.text-sp-14': {
                    'font-size': '14px',
                    'line-height': '21px',
                },
                '.text-sp-16': {
                    'font-size': '16px',
                    'line-height': '24px',
                },
                '.text-sp-18': {
                    'font-size': '18px',
                    'line-height': '26px',
                },
                '.text-sp-20': {
                    'font-size': '20px',
                    'line-height': '30px',
                },
                '.text-sp-22': {
                    'font-size': '22px',
                    'line-height': '32px',
                },
                '.text-sp-24': {
                    'font-size': '24px',
                    'line-height': '36px',
                },
                '.text-sp-26': {
                    'font-size': '26px',
                    'line-height': '38px',
                },
            })
        }),
    ],
}

export default config
