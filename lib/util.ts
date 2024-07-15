/**
 * Util function for random stuff
 */
/**
 * Capitalizes first letters of words in string.
 * @param {string} str String to be modified
 * @param {boolean} lower Whether all other letters should be lowercased
 * @return {string}
 * @usage
 *   capitalize('fix this string');     // -> 'Fix This String'
 *   capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
 *   capitalize('javaSCrIPT', true);    // -> 'Javascript'
 */
export const capitalize = (str: string, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  )


/**
 * Checks if the given url is usable to parse images
 */
export const checkThumbnail = (thumbnail: string) => !thumbnail.toLowerCase().includes('upgrade')