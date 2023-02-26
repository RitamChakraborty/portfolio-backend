import "https://deno.land/std@0.177.0/dotenv/load.ts";
import StringUtil from "./string-util.ts";
import {Env} from "../data/constant.ts";

/**
 * This is a utility class that contains helper functions
 *
 * @class
 */
export class Util {
    /**
     * Checks if a given value is `null` or `undefined`
     *
     * @param value - the input value
     * @return {boolean} - `true` if value is null or undefined, `false` otherwise
     * @function
     */
    static isNullOrUndefine(value: unknown | null | undefined) {
        return value === null || value === undefined;
    }

    /**
     * Get value from *.env* file or from the *environment*
     *
     * @param key {string} - name of the environment variable
     * @return {string} - value of the environment variable
     * @throws {Error} - if env variable does not exist
     * @function
     */
    static getEnv(key: Env): string {
        if (!Deno.env.has(key)) {
            throw Error(`Unable to find env: ${key}`)
        }

        return StringUtil.notBlankString(Deno.env.get(key));
    }
}