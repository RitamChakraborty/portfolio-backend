import {LogConfig} from 'https://deno.land/std@0.104.0/log/mod.ts'
import {log} from 'https://deno.land/x/mysql@v2.11.0/mod.ts'

export default function logConfig(): LogConfig {
    return {
        handlers: {
            functionFmt: new log.handlers.ConsoleHandler('DEBUG', {
                formatter: (logRecord) => {
                    let msg = logRecord.msg;
                    const levelName = logRecord.levelName;
                    const timestamp = logRecord.datetime.toJSON();

                    for (const arg of logRecord.args as string[]) {
                        msg = msg.replace("{}", arg);
                    }

                    return `${levelName}\t${timestamp}\t${msg}`;
                },
            }),
        },
        loggers: {
            default: {
                level: 'DEBUG',
                handlers: ['functionFmt'],
            },
        },
    }
}
