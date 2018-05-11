import app from "@/app";

const queryParams = window.location.search.slice(1)
        .split('&')
        .reduce((accumulator, item, i) => {
            const entry = item.split('=');
            accumulator[entry[0]] = entry[1];
            return accumulator;
        }, []);

// https://qiita.com/shogo82148/items/548a6c9904eb19269f8c
const environment = {
    language: queryParams['lang'] ||
            (window.navigator.languages && window.navigator.languages[0]) ||
            window.navigator.language ||
            window.navigator.userLanguage ||
            window.navigator.browserLanguage
};

app.run(environment);

// #app のマウントが終了するまでの間、テンプレートのフォーマットが裸で表示されるので、
// 最初は #app の不透明度を 0.0 にしておき、マウントが終了したら不透明度を 1.0 にする。
$(function() {
    $('#app').animate({
        opacity: 1.0,
    }, 0);
});

