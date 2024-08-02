import { Logtail } from "@logtail/node"
import winston from "winston"
import { LOG_TOKEN } from "$env/static/private"
import { LogtailTransport } from "@logtail/winston"


const logtail = new Logtail(LOG_TOKEN)

export const logger = winston.createLogger({
  level: 'http',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { host: process.env.HOST },
  handleExceptions: true,
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
  },
  transports: [
    new winston.transports.File({
      filename: 'app.log'
    }),
    new LogtailTransport(logtail)
  ]
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize({
        colors: {
          error: 'bold red',
          warn: 'bold yellow',
          info: 'bold blue',
          http: 'bold green',
          debug: 'bold gray'
        }
      }),
      winston.format.align(),
      winston.format.cli(),
    )
  }))
}