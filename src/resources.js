import * as immutable from "immutable";

const hired = (company, employmentType, start, end, works) => ({ company, employmentType, start, end, works });
const work = (description, options) => ({ description, options: (options || {}) });
const activity = (item) => (typeof item === "string") ? { description: item } : item;

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
            workExperienceItems: [
                hired("株式会社エイ・シー・ティ", "契約社員", "2016年3月", "2017年5月", [
                    work("Androidアプリケーション（Java 7）の開発を行なった。"),
                    work("NET MVC（C# 6）によるウェブサイトの開発を行なった。SQL Server を扱った。"),
                    work("一部プロジェクトでGit，Vagrantの利用を提案し、導入が行なわれた。"
                        + "導入にあたってGitサーバーの構築を担当した。"),
                ]),
                hired("ＦＫＣ株式会社", "正社員", "2015年07月", "2016年03月", [
                    ".NET（C# 3）による Windows アプリケーションの開発を行なった。",
                    "PHP 5.2（フルスクラッチ）によるウェブサイトの開発を行なった。SQL Server を扱った。",
                ]),
                hired("株式会社ＲＭＡ", "派遣社員・正社員", "2014年10月", "2015年06月", [
                    "CakePHP（PHP 5.4）によるウェブサイトの開発（バックエンド、フロントエンド）を行なった。MySQLを扱った。",
                    "NET（C# 3）による Windows アプリケーションの開発を行なった。SQL Server を扱った。",
                    "Dropwizard（Java 7）による REST サービスおよびフロントエンドの開発を行なった。DynamoDB を扱った。"
                ]),
            ],
            privateActivities:
                [
                    "大学院生へのオブジェクト指向プログラミングの指導",
                    "Kotlin による、Androidアプリケーションの開発",
                    "React 16, Angular 4 の学習",
                    "Django、Ansible によるウェブサイトの開発",
                    {
                        description: "Docker によるマイクロサービスで構成されたウェブアプリケーションの開発",
                        annotations: [
                            "Scala による REST サービス、Vue.js によるフロントエンド（nginx）、MongoDB で構成している。",
                            "FunSpec、Travis CI、webpack、TypeScript を利用している。",
                        ]
                    }
                ].map(activity),
            otherSkills:
                [
                    "Java 8 でのプログラミング（Stream などを利用する）ができる。",
                    "Perl、Python、Haskellでのプログラミングが少しできる。",
                    "SSH で Linux の基本的な操作ができる。",
                    "関数型プログラミングの基礎を理解している。",
                    "アルゴリズムとデータ構造の基礎を理解している。",
                    "リレーショナルデータベースの基礎を理解し、基本的なパフォーマンスチューニングができる。",
                    "ウェブアプリケーションの基本的なセキュリティを理解している。",
                ].map(item => { description: item }),
            referencedBooks: [
                "『すごいHaskell たのしく学ぼう！』",
                "『Javaによる関数型プログラミング』",
                "『リーダブルコード』",
                "『ThoughtWorksアンソロジー』",
                "『SQLアンチパターン』",
                "『アルゴリズムイントロダクション 第1巻』",
                "『体系的に学ぶ 安全なWebアプリケーションの作り方』",
                "『型システム入門』",
            ].map(item => { title: item }),
            favoriteBooks: "気に入っている書籍",
            skills: "スキル",
            myAccounts: "アカウント",
            education: "学歴",
            univ: "東京経済大学 経済学部卒業",
            dbs: "データベーススペシャリスト試験",
            to: "～",
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
            dbs: "Database Specialist Examination",
            to: "to",
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
        const language = lang in data.translations ? lang : "en";
        return function (key) {
            const target = (key in data.translations[language]) ? data.translations[language] : data.common;
            if (key in target) {
                return target[key];
            } else {
                console.error(key + " is not found in translations.");
                return null;
            }
        }
    },
    errors,
};
