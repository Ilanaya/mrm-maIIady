import { oneOf } from '@zardoy/utils'
import * as fsExtra from 'fs-extra'
import { lines } from 'mrm-core'
import { join } from 'path'
import { readPackageJsonFile } from 'typed-jsonfile'

export const copyAllFiles = (__dirname: string, patchFiles: Record<string, (contents: string) => string | undefined> = {}, copySet: string[] | null = null) => {
    const files = copySet ?? fsExtra.readdirSync(__dirname).filter(name => !fsExtra.lstatSync(join(__dirname, name)).isDirectory() && !oneOf(name, 'index.ts', 'index.js'))
    for (const file of files) {
        const patchFn = patchFiles[file] ?? (contents => contents)
        const contents = patchFn(fsExtra.readFileSync(join(__dirname, file), 'utf-8'))
        if (contents === undefined) continue
        lines(file).set([contents]).save()
    }
}

export const ensureLicense = () => {
    if (fsExtra.existsSync('LICENSE') || fsExtra.existsSync('LICENSE.md')) return
    require('./license/index')()
}

export const ensureGitignore = () => {
    if (fsExtra.existsSync('.gitignore')) return
    require('./gitignore/index')()
}

export const ensureTs = (...args: { preset: string }[]) => {
    if (fsExtra.existsSync('tsconfig.json')) return
    require('./ts/index')(...args)
}

export const hasVscodeFramework = async () => {
    const packageJson = await readPackageJsonFile({ dir: '.' }).catch(() => null)
    if (packageJson && Object.keys({ ...packageJson.dependencies, ...packageJson.devDependencies }).includes('vscode-framework')) {
        return true
    }
    return false
}
