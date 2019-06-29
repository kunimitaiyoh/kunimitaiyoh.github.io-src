import { zerofill } from "@/util";

export class Instant {
    constructor(protected readonly value: Date) {
    }

    public toLocalSqlFormat(): string {
        const f = (x: number) => zerofill(x, 2);
        const value = this.value;

        const date = `${value.getFullYear()}-${f(value.getMonth() + 1)}-${f(value.getDate())}`;
        const time = `${f(value.getHours())}:${f(value.getMinutes())}:${f(value.getSeconds())}`;
        return `${date} ${time}`;
    }

    public static of(value: ISO8601): Instant {
        return new Instant(new Date(value))
    }
}

export type ISO8601 = string;
