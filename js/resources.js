const data = {
    common: {
    },
    translations: {
        en: {
            head: "Profile: KUNIMI Taiyoh",
            careers: "Careers",
            skills: "Skills",
        },
        ja: {
            head: "プロフィール: 國見 太陽",
            careers: "経歴",
            skills: "スキル"
        },
    }
};

const validate = function (data) {
    const commonKeys = Object.keys(data.common);
    const languages = Object.keys(data.translations);
    const translationKeys = (() => {
        let keys = [];
        languages.forEach(l => {
            Object.keys(data.translations[l]).forEach(t => {
                keys[t] = 1;
            });
        });
        return Object.keys(keys);
    })();

    // TODO: common と translationKeys に共通の要素がない 
    // かつ すべての translations[languages[i]] の要素は translationKeys に含まれる。
    const errors = [];
    return errors;
};

const errors = validate(data);

const resources = {
    get: function(lang) {
        return function (key) {
            const target = (lang in data.translations) ? data.translations[lang] : data.common;
            if (key in target)
                return target[key];
            else
                console.error(key + " is not found in translations.");
                return null;
        }
    }
};

define(() => resources);
