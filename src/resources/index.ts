import { Instant } from "@/data/instant";
import { Resources, Work } from "@/resources/types";
import { zerofill } from "@/util";

export function getResources(lang: string): Resources {
    /**
     * resolve an appropriate object about language by the given language code.
     *
     * @param {() => any} japanese supplier of an object for Japanese
     * @param {() => any} english supplier of an object for English
     */
    const resolve: <T> (ja: () => T, en: () => T) => T = (lang === "ja") ? (ja, en) => ja() : (ja, en) => en();

    const formatInstant = (value: Instant) => value.toLocalSqlFormat();

    const company = resolve(() => "ブレインズコンサルティング株式会社", () => "Brains Consulting Inc.");
    const monthYear = resolve(
        () => (year: number, month: number) => `${year}年${zerofill(month, 2)}月`,
        function() {
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            return (year: number, month: number) => `${months[month - 1]} ${year}`;
        });

    return {
        resolveLastUpdate: resolve(() => (x: Instant) => "最終更新日: " + formatInstant(x), () => (x: Instant) => "Last update: " + formatInstant(x)),
        email: "kunimi.taiyoh@gmail.com",
        head: resolve(() => "プロフィール: 國見 太陽", () => "Profile: KUNIMI Taiyoh"),
        name: resolve(() => "國見 太陽", () => "KUNIMI Taiyoh"),
        nameLatin: resolve(() => "KUNIMI Taiyoh", () => null),
        birthday: resolve(() => "1990/12/21", () => "December 21, 1990"),
        location: resolve(() => "横浜", () => "Yokohama, Japan"),
        company,
        digest: {
            title: resolve(() => "概略", () => "Digest"),
            text: resolve(
                () => "ウェブアプリケーション、デスクトップアプリケーション、スマートフォンアプリケーションなどを開発するプログラマーです。",
                () => "A software engineer who develops web applications, desktop applications, smart phone applications and so on."
            ),
        },
        education: {
            title: resolve(() => "学歴", () => "Education"),
            items: [
                {
                    date: monthYear(2014, 3),
                    title: resolve(() => "東京経済大学 経済学部卒業", () => "Tokyo Keizai University, Tokyo, Japan: Bachelor of Economics"),
                },
            ],
            format: e => resolve(() => e.date + "　" + e.title, () => e.title + " " + e.date),
        },
        workExperience: {
            title: resolve(() => "職歴", () => "Work Experience"),
            employments: [
                {
                    company,
                    type: resolve(() => "契約社員", () => "Contracted employee"),
                    start: monthYear(2018, 7),
                    end: null,
                    works: []
                },
                {
                    company: resolve(() => "株式会社エイ・シー・ティ", () => "A.C.T. Inc."),
                    type: resolve(() => "契約社員", () => "Contracted employee"),
                    start: monthYear(2016, 3),
                    end: monthYear(2017, 5),
                    works: [
                        work(resolve(
                            () => "Androidアプリケーション（Java 7）の開発を行なった。",
                            () => "Developed an Android application (Java 7).")),
                        work(resolve(
                            () => ".NET MVC（C# 6）によるウェブサイトの開発を行なった。SQL Server を扱った。",
                            () => "Developed a web site with .NET MVC (C# 6). Used SQL Server.")),
                        work(resolve(
                            () => "一部プロジェクトでGit，Vagrantの使用を提案し、導入が行なわれた。"
                                + "導入にあたってGitサーバーの構築を担当した。",
                            () => "Suggested to apply Git and Vagrant for certain projects and introducing of them are carried out. "
                                + "Took charge of constructing Git server on introducing.")),
                    ]
                },
                {
                    company: resolve(() => "ＦＫＣ株式会社", () => "FKC Inc."),
                    type: resolve(() => "正社員", () => " Regular employee"),
                    start: monthYear(2015, 7),
                    end: monthYear(2016, 3),
                    works: [
                        work(resolve(
                            () => ".NET（C# 3）による Windows アプリケーションの開発を行なった。",
                            () => "Developed a Windows application with .NET (C# 3).")),
                        work(resolve(
                            () => "PHP 5.2（フルスクラッチ）によるウェブサイトの開発を行なった。SQL Server を扱った。",
                            () => "Developed a web site with PHP 5.2 from scratch. Used SQL Server.")),
                    ],
                },
                {
                    company: resolve(() => "株式会社ＲＭＡ", () => "RMA Inc."),
                    type: resolve(() => "派遣社員・正社員", () => "Dispatched employee / regular employee"),
                    start: monthYear(2014,  10),
                    end: monthYear(2015, 6),
                    works: [
                        work(resolve(
                            () => "CakePHP（PHP 5.4）によるウェブサイトの開発（バックエンド、フロントエンド）を行なった。MySQLを扱った。",
                            () => "Developed a web site (backend and frontend) with CakePHP (PHP 5.4). Used MySQL.")),
                        work(resolve(
                            () => ".NET（C# 3）による Windows アプリケーションの開発を行なった。SQL Server を扱った。",
                            () => "Developed a Windows application with .NET (C# 3). Used SQL Server.")),
                        work(resolve(
                            () => "Dropwizard（Java 7）による REST サービスおよびフロントエンドの開発を行なった。DynamoDB を扱った。",
                            () => "Developed a REST service with Dropwizard (Java 7) and frontend site. Used DynamoDB.")),
                    ],
                },
            ],
            format: e => resolve(() => e.start + "～" + (e.end || "") + "（" + e.type + ")", () => e.start +(e.end ? " to " + e.end : "")),
        },
        privateActivities: {
            title: resolve(() => "業務外の活動", () => "Private Activities"),
            items: [
                { description: resolve(() => "大学院生へのオブジェクト指向プログラミングの指導", () => "Teaching object-oriented programming to a graduate student") },
                { description: resolve(() => "Kotlin による、Androidアプリケーションの開発", () => "Development of an Android application with Kotlin") },
                { description: resolve(() => "React 16, Angular 4 の学習", () => "Learning React 16 and Angular 4") },
                { description: resolve(() => "Django、Ansible によるウェブサイトの開発", () => "Development of a web site with Django and Ansible") },
                {
                    description: resolve(
                        () => "Docker によるマイクロサービスで構成されたウェブアプリケーションの開発",
                        () => "Develop a web application composed of microservices with Docker"),
                    annotations: [
                        resolve(
                            () => "Scala による REST サービス、Vue.js によるフロントエンド（nginx）、MongoDB で構成している。",
                            () => "composed of REST service with Scala, frontend with Vue.js (nginx), and MongoDB."),
                        resolve(
                            () =>"FunSpec、Travis CI、webpack、TypeScript を使用している。",
                            () => "using FunSpec, Travis CI, webpack and TypeScript."),
                    ]
                }
            ],
        },
        skills: {
            title: resolve(() => "その他のスキル", () => "Other Skills"),
            items: [
                resolve(
                    () => "Java 8 でのプログラミング（Stream などを使用する）ができる。",
                    () => "Programming with Java 8 (using Stream etc.)."),
                resolve(
                    () => "Perl、Python、Haskellでのプログラミングが少しできる。",
                    () => "Programming with Perl, Python and Haskell a little."),
                resolve(
                    () => "SSH で Linux の基本的な操作ができる。",
                    () => "Basic operation of Linux through SSH."),
                resolve(
                    () => "関数型プログラミングの基礎を理解している。",
                    () => "Understand the basics of functional programming."),
                resolve(
                    () => "アルゴリズムとデータ構造の基礎を理解している。",
                    () => "Understand the basics of algorithms and data structures."),
                resolve(
                    () => "リレーショナルデータベースの基礎を理解し、基本的なパフォーマンスチューニングができる。",
                    () => "Understand the basics of relational database and be able to carry out basic performance tuning for them."),
                resolve(
                    () => "ウェブアプリケーションの基本的なセキュリティを理解している。",
                    () => "Understand about basic securty of web applications."),
            ].map(work),
        },
        myAccounts: {
            title: resolve(() => "アカウント", () => "My Accounts"),
        },
        qualifications: {
            title: resolve(() => "資格", () => "Qualifications"),
            items: [
                {
                    date: monthYear(2014, 6),
                    title: resolve(() => "データベーススペシャリスト試験", () => "Database Specialist Examination"),
                },
            ],
            format: resolve(() => e => e.date + "　" + e.title, () => e => e.date + " " + e.title)
        },
        favoriteBooks: {
            title: resolve(() => "お気に入りの書籍", () => "Favorite Books"),
            items: [
                resolve(() => "『すごいHaskell たのしく学ぼう！』", () => "Learn You a Haskell for Great Good!"),
                resolve(() => "『Javaによる関数型プログラミング』", () => "Functional Programming in Java"),
                resolve(() => "『リーダブルコード』", () => "The Art of Readable Code"),
                resolve(() => "『ThoughtWorksアンソロジー』", () => "The ThoughtWorks Anthology"),
                resolve(() => "『SQLアンチパターン』", () => "SQL Antipatterns"),
                resolve(() => "『アルゴリズムイントロダクション 第1巻』", () => "Introduction to Algorithms"),
                resolve(
                    () => "『体系的に学ぶ 安全なWebアプリケーションの作り方』",
                    () => "『体系的に学ぶ 安全なWebアプリケーションの作り方』(Japanese)"),
                resolve(() => "『型システム入門』", () => "Types and Programming Languages"),
            ].map(item => ({ title: item })),
        },
    };
};

function work(description: string): Work {
    return { description }
}