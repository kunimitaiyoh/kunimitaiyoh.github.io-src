const formatDate = (date) => {
    const f = (n, length) => n.toString().padStart(length, '0');

    const y = f(date.getFullYear(), 4);
    const m = f(date.getMonth() + 1, 2);
    const d = f(date.getDate(), 2);
    return y + m + d;
}

/**
 * caluculate the current age from the given birthdate and the date.
 * @see https://qiita.com/clockmaker/items/865ceafae7117606169a
 *
 * @param {number} year of birthdate
 * @param {number} month of birthdate
 * @param {number} day of month of birthdate
 * @param {Date} now
 */
export function calculateAge(year, month, day, now) {
    const birthday = formatDate(new Date(year, month - 1, day));
    const today = formatDate(now);

    return Math.floor((new Number(today) - new Number(birthday)) / 10000);
}

/**
 * extract query parameters from the window.
 *
 * @param {Window} window
 * @returns {Map<string, any>} dictionary of the query parameters
 */
export function extractQueryParams(window) {
    return window.location.search.slice(1)
        .split('&')
        .reduce((accumulator, item, i) => {
            const entry = item.split('=');
            accumulator[entry[0]] = entry[1];
            return accumulator;
        }, []);
}


/**
 * get the current environment for this application.
 * @see https://qiita.com/shogo82148/items/548a6c9904eb19269f8c
 *
 * @param {Map<string, any>} queryParams
 * @param {Window} window
 */
export function getEnvironment(queryParams, window) {
    return {
        language: queryParams['lang'] ||
            (window.navigator.languages && window.navigator.languages[0]) ||
            window.navigator.language ||
            window.navigator.userLanguage ||
            window.navigator.browserLanguage
    };
}
