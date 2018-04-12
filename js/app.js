define((require) => {
    const resources = require('resources');

    const age = ((y, m, d) => {
        const format = (date) => {
            const f = (n, length) => n.toString().padStart(length, '0');
    
            const year = f(date.getFullYear(), 4);
            const month = f(date.getMonth() + 1, 2);
            const day = f(date.getDate(), 2);
            return year + month + day;
        }
    
        const birthday = format(new Date(y, m - 1, d));
        const today = format(new Date());
    
        return Math.floor((new Number(today) - new Number(birthday)) / 10000);
    })(1990, 12, 21);
    
    const app = function(env) {
        new Vue({
            el: '#app',
            data: {
                show: false,
                age: age,
                r: resources.get(env.language),
                errors: [],
            },
            methods: {
                testLang: function(lang) {
                    return lang === env.language;
                },
            },
            mounted: function () {
            },
        });
    };

    return {
        run: app
    }
});
