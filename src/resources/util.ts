import { Instant, LocalDateTime, DateTimeFormatter } from "js-joda";

export function formatInstant(value: Instant): string {
    return LocalDateTime.ofInstant(value)
        .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
}
