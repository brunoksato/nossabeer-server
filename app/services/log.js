import { createLogger, format, transports } from 'winston'

const ignorePrivate = format((info, opts) => {
  if (info.private) {
    return false
  }
  return info
})

const logger = createLogger({
  format: format.combine(ignorePrivate(), format.json()),
  transports: [new transports.Console()]
})

export default logger
