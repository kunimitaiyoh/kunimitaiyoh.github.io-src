import * as immutable from "immutable";

const data = {
    common: {
        email: "kunimi.taiyoh@gmail.com",
    },
    translations: {
        ja: {
            head: "プロフィール: 國見 太陽",
            name: "國見 太陽",
            nameLatin: "KUNIMI Taiyoh",
            birthday: "1990/12/21",
            location: "横浜",
            digest: "概略",
            digestContent: "ウェブアプリケーション、デスクトップアプリケーション、スマートフォンアプリケーションなどを開発するプログラマーです。",
            workExperience: "経歴",
            skills: "スキル",
            myAccounts: "アカウント",
            education: "学歴",
            univ: "東京経済大学 経済学部卒業",
            dbs: "データベーススペシャリスト試験",
        },
        en: {
            head: "Profile: KUNIMI Taiyoh",
            name: "KUNIMI Taiyoh",
            nameLatin: null,
            birthday: "December 21, 1990",
            location: "Yokohama, Japan",
            digest: "Digest",
            digestContent: "A software engineer who develops web applications, desktop application, smart phone applications and so on.",
            workExperience: "Work Experience",
            skills: "Skills",
            myAccounts: "My Accounts",
            education: "Education",
            univ: "Tokyo Keizai University, Tokyo, Japan: Bachelor of Economics",
            dbs: "Database Specialist Examination"
        },
    }
};

const validate = function (data) {
    const commonKeys = immutable.Set(Object.keys(data.common));
    const translationKeys = immutable.List(Object.keys(data.translations))
        .flatMap(lang => Object.keys(data.translations[lang]))
        .toSet();

    const duplicated = commonKeys.intersect(translationKeys)
        .map(key => "A key \"" + key + "\" is duplicated.");
    const missings = immutable.Map(data.translations)
        .flatMap((items, lang) => {
            const set = immutable.Set(immutable.Map(items).keys());
            return translationKeys.filter(key => !set.contains(key))
                .map(key => [key, "A key \"" + key + "\" is missing in language \"" + lang + "\"."])
                .toSeq();
        })
    return duplicated.concat(missings).toJS()
};

const errors = validate(data);

export default {
    get: function(lang) {
        return function (key) {
            const language = lang in data.translations ? lang : "en";
            const target = (key in data.translations[language]) ? data.translations[language] : data.common;
            if (key in target)
                return target[key];
            else
                console.error(key + " is not found in translations.");
                return null;
        }
    },
    errors,
};
