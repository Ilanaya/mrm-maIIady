import { readFileSync } from 'fs'
import { install } from 'mrm-core'
import { ensureFileSync } from 'fs-extra'

module.exports = () => {
    require('../tailwind/index')(false)
    // linaria@next
    install('styled-components @types/styled-components react-is twin.macro polished'.split(' '), {
        pnpm: true,
    })
    ensureFileSync('/src/index.tsx')

    const entrypointContents = readFileSync('/src/index.tsx', 'utf-8')
    if (!entrypointContents.includes("import 'tailwindcss/base.css'")) console.error("don't forget to add tailwind base styles!")
    if (entrypointContents.includes("import 'tailwindcss/tailwind.css'")) console.error("don't forget to remove tailwind styles!")
}
