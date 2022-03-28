export default function withTimeZone(date) {
    return new Date(date - date.getTimezoneOffset() * 60000);
}