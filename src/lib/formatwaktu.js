function toWIB(date) {
    const d = new Date(date);
    // Hitung offset WIB (+7 jam)
    const utc = d.getTime() + d.getTimezoneOffset() * 60000; // waktu UTC
    return new Date(utc + 7 * 60 * 60 * 1000);
}
export function formatWaktuIndonesia(date) {
    if (!date) return "-";
    const wibDate = toWIB(date);
    return wibDate.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });
}