import { install, lines, file, packageJson } from 'mrm-core'
import { TsConfigJson } from 'type-fest'
import * as fsExtra from 'fs-extra'
import { hasVscodeFramework } from '../util'

const presets = {
    tsconfig: true,
    node: true,
    'node-lib': true,
    react: true,
}

module.exports = async ({ preset }) => {
    const presetDeps: Partial<Record<keyof typeof presets, [string[], string[]]>> = {
        node: [[], ['@types/node']],
        react: [
            ['react', 'react-dom'],
            ['@types/react', '@types/react-dom'],
        ],
    }

    const [deps, devDeps] = presetDeps[preset] ?? [[], []]
    if (deps.length)
        install(deps, {
            pnpm: true,
        })
    install(['typescript', ...devDeps], {
        dev: true,
        pnpm: true,
    })
    const tsconfig: TsConfigJson = {
        compilerOptions: {},
        include: ['src'],
    }
    if (preset === 'node-lib') {
        tsconfig.compilerOptions!.outDir = 'build'
    }
    lines('tsconfig.json')
        .set([JSON.stringify(tsconfig, undefined, 4)])
        .save()

    if (await hasVscodeFramework()) return
    fsExtra.ensureFileSync(preset === 'react' ? 'src/index.tsx' : 'src/index.ts')
}

module.exports.parameters = {
    preset: {
        type: 'list',
        choices: Object.keys(presets),
        validate(value: any) {
            return value ? true : '-i is required'
        },
    },
}
