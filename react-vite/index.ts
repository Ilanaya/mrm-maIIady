import { install, packageJson } from 'mrm-core'
import fsExtra from 'fs-extra'
import { ensureGitignore, ensureLicense } from '../util'

module.exports = () => {
    ensureLicense()
    ensureGitignore()
    if (!fsExtra.existsSync('index.html')) require('../html/index')()
    require('../pkg/index')()
    require('../ts/index')(packageJson().prependScript('start', 'vite').prependScript('build', 'vite build').save())

    install(['vite'], {
        pnpm: true,
    })
    require('../tailwind/index')()
    require('../eslint/index')({ isReact: true })
}
