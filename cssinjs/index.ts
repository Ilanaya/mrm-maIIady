import { readFileSync } from 'fs'
import { install, updateFile } from 'mrm-core'
import { ensureFileSync } from 'fs-extra'

module.exports = ({ preset = 'default' }) => {
    require('../tailwind/index')(false)
    // linaria@next
    install('styled-components @types/styled-components react-is twin.macro polished'.split(' '), {
        pnpm: true,
    })
    const entrypointPath = preset === 'react' ? './src/index.tsx' : './src/index.ts'
    ensureFileSync(entrypointPath)

    const entrypointContents = readFileSync(entrypointPath, 'utf-8')
    if (!entrypointContents.includes("import 'tailwindcss/base.css'")) console.error("don't forget to add tailwind base styles!")
    if (entrypointContents.includes("import 'tailwindcss/tailwind.css'")) console.error("don't forget to remove tailwind styles!")
}
