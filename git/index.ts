import { lines } from 'mrm-core'

const configPath = '.git/config'

const gitConfigLines = lines(configPath)
if (gitConfigLines.exists()) {
    gitConfigLines.add(['[user]', '\tname = Ilya Golovin', '\temail = me@ilscc.ru']).save()
}
