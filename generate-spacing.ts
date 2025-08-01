import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const max = 300
let css = '@utilities {\n'

for (let i = 1; i <= max; i++) {
    css += `  .w-${i} { width: ${i}px; }\n`
    css += `  .h-${i} { height: ${i}px; }\n`
    css += `  .min-w-${i} { min-width: ${i}px; }\n`
    css += `  .min-h-${i} { min-height: ${i}px; }\n`
    css += `  .max-w-${i} { max-width: ${i}px; }\n`
    css += `  .max-h-${i} { max-height: ${i}px; }\n`
    css += `  .rounded-${i} { border-radius: ${i}px; }\n`
    css += `  .p-${i} { padding: ${i}px; }\n`
    css += `  .m-${i} { margin: ${i}px; }\n`
    css += `  .px-${i} { padding-left: ${i}px; padding-right: ${i}px; }\n`
    css += `  .py-${i} { padding-top: ${i}px; padding-bottom: ${i}px; }\n`
    css += `  .mx-${i} { margin-left: ${i}px; margin-right: ${i}px; }\n`
    css += `  .my-${i} { margin-top: ${i}px; margin-bottom: ${i}px; }\n`
    css += `  .pt-${i} { padding-top: ${i}px; }\n`
    css += `  .pr-${i} { padding-right: ${i}px; }\n`
    css += `  .pb-${i} { padding-bottom: ${i}px; }\n`
    css += `  .pl-${i} { padding-left: ${i}px; }\n`
    css += `  .mt-${i} { margin-top: ${i}px; }\n`
    css += `  .mr-${i} { margin-right: ${i}px; }\n`
    css += `  .mb-${i} { margin-bottom: ${i}px; }\n`
    css += `  .ml-${i} { margin-left: ${i}px; }\n`
    css += `  .gap-${i} { gap: ${i}px; }\n`

}

css += '}\n'

const outputPath = path.resolve(__dirname, './src/styles/generated-spacing.css')
fs.writeFileSync(outputPath, css)

console.log(`✅ spacing util 생성 완료: ${outputPath}`)