const hired = (company, type, start, end, works) => ({ company, type, start, end, works });
const work = (description, options) => ({ description, options: (options || {}) });
const activity = (item) => (typeof item === "string") ? { description: item } : item;

export const getResources = (lang) => {
    const language = lang in data.translations ? lang : "en";

    /**
     * resolve an appropriate object about language by the given language code.
     *
     * @param {() => any} japanese supplier of an object for Japanese
     * @param {() => any} english supplier of an object for English
     */
    const resolve = (japanese, english) => language === "ja" ? japanese() : english();

    return {
        email: "kunimi.taiyoh@gmail.com",
        head: resolve(() => "プロフィール: 國見 太陽", () => "Profile: KUNIMI Taiyoh"),
        name: resolve(() => "國見 太陽", () => "KUNIMI Taiyoh"),
        nameLatin: resolve(() => "KUNIMI Taiyoh", () => null),
        birthday: resolve(() => "1990/12/21", () => "December 21, 1990"),
        location: resolve(() => "横浜", () => "Yokohama, Japan"),
        company: "?????? Inc.",
        digest: {
            title: resolve(() => "概略", () => "Digest"),
            text: resolve(
                () => "ウェブアプリケーション、デスクトップアプリケーション、スマートフォンアプリケーションなどを開発するプログラマーです。",
                () => "A software engineer who develops web applications, desktop application, smart phone applications and so on."
            ),
        },
        // TODO: dates should be described as objects without language-dependency.
        works: {
            title: resolve(() => "経歴", () => "Work Experience"),
            employments: [
                {
                    company: resolve(() => "株式会社エイ・シー・ティ", () => "A.C.T. Inc."),
                    type: resolve(() => "契約社員", () => ""),
                    start: resolve(() => "2016年3月", () => "March 2016"),
                    end: resolve(() => "2017年5月", () => "May 2017"),
                    works: [
                        work(resolve(() => "Androidアプリケーション（Java 7）の開発を行なった。", () => "")),
                        work(resolve(() => "NET MVC（C# 6）によるウェブサイトの開発を行なった。SQL Server を扱った。", () => "")),
                        work(resolve(
                            () => "一部プロジェクトでGit，Vagrantの利用を提案し、導入が行なわれた。"
                                + "導入にあたってGitサーバーの構築を担当した。",
                            () => ""
                        )),
                    ]
                },
                {
                    company: resolve(() => "ＦＫＣ株式会社", () => "FKC Inc."),
                    type: resolve(() => "正社員", () => ""),
                    start: resolve(() => "2015年07月", () => "July 2015"),
                    end: resolve(() => "2016年03月", () => "March 2016"),
                    works: [
                        work(resolve(() => ".NET（C# 3）による Windows アプリケーションの開発を行なった。", () => "")),
                        work(resolve(() => "PHP 5.2（フルスクラッチ）によるウェブサイトの開発を行なった。SQL Server を扱った。", () => "")),
                    ],
                },
                {
                    company: resolve(() => "株式会社ＲＭＡ", () => "RMA Inc."),
                    type: resolve(() => "派遣社員・正社員", () => ""),
                    start: resolve(() => "2014年10月" , () => "October 2014"),
                    end: resolve(() => "2015年06月", () => "June 2015"),
                    works: [
                        work(resolve(() => "CakePHP（PHP 5.4）によるウェブサイトの開発（バックエンド、フロントエンド）を行なった。MySQLを扱った。", () => "")),
                        work(resolve(() => "NET（C# 3）による Windows アプリケーションの開発を行なった。SQL Server を扱った。", () => "")),
                        work(resolve(
                            () => "Dropwizard（Java 7）による REST サービスおよびフロントエンドの開発を行なった。DynamoDB を扱った。",
                            () => ""
                        )),
                    ],
                }
            ],
            format: (e) => resolve(() => start + "～" + end + "（" + e.type + ")"),
        },
        privateActivities: {
            title: resolve(() => "業務外の活動", () => "Private Activities"),
            items: [
                resolve(() => "大学院生へのオブジェクト指向プログラミングの指導", () => ""),
                resolve(() => "Kotlin による、Androidアプリケーションの開発", () => ""),
                resolve(() => "React 16, Angular 4 の学習", () => ""),
                resolve(() => "Django、Ansible によるウェブサイトの開発", () => ""),
                {
                    description: resolve(() => "Docker によるマイクロサービスで構成されたウェブアプリケーションの開発"),
                    annotations: [
                        resolve(() => "Scala による REST サービス、Vue.js によるフロントエンド（nginx）、MongoDB で構成している。", () => ""),
                        resolve(() =>"FunSpec、Travis CI、webpack、TypeScript を利用している。", () => ""),
                    ]
                }
            ].map(activity),
        },
        skills: {
            title: resolve(() => "スキル", () => "Skills"),
            items: [
                resolve(() => "Java 8 でのプログラミング（Stream などを利用する）ができる。", () => ""),
                resolve(() => "Perl、Python、Haskellでのプログラミングが少しできる。", () => ""),
                resolve(() => "SSH で Linux の基本的な操作ができる。", () => ""),
                resolve(() => "関数型プログラミングの基礎を理解している。", () => ""),
                resolve(() => "アルゴリズムとデータ構造の基礎を理解している。", () => ""),
                resolve(() => "リレーショナルデータベースの基礎を理解し、基本的なパフォーマンスチューニングができる。", () => ""),
                resolve(() => "ウェブアプリケーションの基本的なセキュリティを理解している。", () => ""),
            ].map(item => { description: item }),
        },
        myAccounts: {
            title: resolve(() => "アカウント", () => "My Accounts"),
        },
        education: {
            title: resolve(() => "学歴", () => "Education"),
            items: [
                {
                    date: (() => "2014年3月", () => "March 2014"),
                    title: resolve(() => "東京経済大学 経済学部卒業", () => "Tokyo Keizai University, Tokyo, Japan: Bachelor of Economics"),
                },
            ],
        },
        qualifications: {
            title: resolve(() => "資格", () => "Qualifications"),
            items: [
                {
                    date: resolve(() => "2014年6月", () => "July 2014"),
                    title: resolve(() => "データベーススペシャリスト試験", () => "Database Specialist Examination"),
                },
            ],
        },
        favoriteBooks: {
            title: resolve(() => "お気に入りの書籍", () => "Favorite books"),
            items: [
                "『すごいHaskell たのしく学ぼう！』",
                "『Javaによる関数型プログラミング』",
                "『リーダブルコード』",
                "『ThoughtWorksアンソロジー』",
                "『SQLアンチパターン』",
                "『アルゴリズムイントロダクション 第1巻』",
                "『体系的に学ぶ 安全なWebアプリケーションの作り方』",
                "『型システム入門』",
            ].map(item => { title: item }),
        }
    };
};
