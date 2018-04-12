// https://qiita.com/shogo82148/items/548a6c9904eb19269f8c
const environment = {
    language: (window.navigator.languages && window.navigator.languages[0]) ||
            window.navigator.language ||
            window.navigator.userLanguage ||
            window.navigator.browserLanguage
};

// define(function() {
//     return {
//         run: function() {
//             require(['js/app'], function(app) {
//                 app.run();
//             });
//         }
//     };
// });


require(['app'], function (app) {
    app.run();
});
