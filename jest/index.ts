import * as fsExtra from 'fs-extra'
import { install, lines, packageJson } from 'mrm-core'
import { join } from 'path'

const jestConfigFile = 'jest.config.js'

module.exports = () => {
    install(['jest', '@types/jest', 'esbuild-runner', 'esbuild'], {
        dev: true,
        pnpm: true,
    })

    lines(jestConfigFile)
        .set([fsExtra.readFileSync(join(__dirname, jestConfigFile), 'utf-8')])
        .save()

    packageJson().appendScript('test', 'jest').save()
}
