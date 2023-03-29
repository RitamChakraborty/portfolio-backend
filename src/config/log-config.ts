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

                    for (const arg of logRecord.args) {
                        let value = '';

                        if (typeof arg === 'number') {
                            value = arg.toString();
                        } else if (typeof arg === 'object') {
                            value = JSON.stringify(arg);
                        } else {
                            value = arg as string;
                        }

                        msg = msg.replace("{}", value);
                    }

                    return `${levelName}\t${timestamp}\t${msg}`;
                },
            }),
        },
        loggers: {
            default: {
                level: 'INFO',
                handlers: ['functionFmt'],
            },
        },
    }
}
