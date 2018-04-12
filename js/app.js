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

const app = function() {
    new Vue({
        el: '#app',
        data: {
            age: age,
            errors: [],
        }
    });
};

define(() => {
    return {
        run: app
    }
});
