function formatDate(date: Date): string {
    const f = (n: number, length: number) => n.toString().padStart(length, '0');

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
export function calculateAge(year: number, month: number, day: number, now: Date) {
    const birthday = formatDate(new Date(year, month - 1, day));
    const today = formatDate(now);

    // return Math.floor((new Number(today) - new Number(birthday)) / 10000);
    return Math.floor((parseInt(today) - parseInt(birthday)) / 10000);
}

/**
 * extract query parameters from the window.
 */
export function extractQueryParams(window: Window): Record<string, string | undefined> {
    return window.location.search.slice(1)
        .split("&")
        .map(entry => entry.split("="))
        .reduce(toDictionary(([key]) => key, ([, value]) => value), newDictionary())
}


/**
 * get the current environment for this application.
 * @see https://qiita.com/shogo82148/items/548a6c9904eb19269f8c
 *
 * @param {Window} window
 */
export function getEnvironment(queryParams: { [key: string]: string | undefined }, window: Window): { language: string } {
    return {
        language: queryParams['lang'] ||
            (window.navigator.languages && window.navigator.languages[0]) ||
            window.navigator.language ||
            (window.navigator as any).userLanguage ||
            (window.navigator as any).browserLanguage
    };
}

export interface Environments {
    language: string
}


export function toDictionary<T, V>(
    keySelector: (item: T) => string,
    valueSelector: (item: T) => V,
): (entries: Record<string, V | undefined>, item: T) => Record<string, V | undefined> {
    return (entries, entry) => {
        entries[keySelector(entry)] = valueSelector(entry);
        return entries;
    };
}

export function newDictionary<V>(): Record<string, V | undefined> {
    return {};
}
