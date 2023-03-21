import { Util } from './util.ts'

/**
 * This is a utility class that contains string helper functions
 *
 * @class
 */
export default class StringUtil {
	/**
	 * Checks if a string is `null` or `undefined` or the length is 0
	 *
	 * @param value {string} - String value to be checked
	 * @return {boolean} - `true` if String is null or undefined or empty string, `false` otherwise
	 * @function
	 */
	static isBlankString(value: string | null | undefined): boolean {
		return Util.isNullOrUndefine(value) || value!.length === 0
	}

	/**
	 * Checks if a string is `null` or `undefined` or the length is 0
	 *
	 * @param value {string} - String value to be checked
	 * @return {boolean} - `false` if String is null or undefined or empty string, `true` otherwise
	 * @function
	 */
	static isNotBlankString(value: string | null | undefined): boolean {
		return !this.isBlankString(value)
	}

	/**
	 * Given a nullable or empty string it checks if the value is `null` or `undefined` or empty or not. If yes then it
	 * throws {@link Error}, otherwise returns non nullable string value
	 *
	 * @param value {string} - String value to be checked
	 * @return {string} - Returns the not null String value
	 * @throws {Error} - If value is `null` or `undefined` or empty
	 * @function
	 */
	static notBlankString(value: string | null | undefined): string {
		if (this.isBlankString(value)) {
			throw Error('Value undefine')
		}

		return value!
	}
}
