define((require) => {
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
                contacts: "連絡先",
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
                contacts: "Contacts",
                education: "Education",
                univ: "Tokyo Keizai University, Tokyo, Japan: Bachelor of Economics",
                dbs: "Database Specialist Examination"
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
                const language = lang in data.translations ? lang : "en";
                const target = (key in data.translations[language]) ? data.translations[language] : data.common;
                if (key in target)
                    return target[key];
                else
                    console.error(key + " is not found in translations.");
                    return null;
            }
        }
    };

    return resources;
});
