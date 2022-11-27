import { install, makeDirs } from 'mrm-core'
import fsExtra from 'fs-extra'
import { ensureGitignore, ensureLicense } from '../util'

module.exports = () => {
    ensureLicense()
    ensureGitignore()
    if (!fsExtra.existsSync('index.html')) require('../html/index')()
    require('../pkg/index')()
    require('../ts/index')({ preset: 'tsconfig' })

    install(['vite'], {
        pnpm: true,
    })
    require('../cssinjs/index')('default')
    require('../eslint/index')({ isReact: false })
}
