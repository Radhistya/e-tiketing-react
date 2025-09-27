// utils/mask.js

// Masking nomor WhatsApp
export function maskWhatsapp(number) {
    if (!number) return "-";
    const len = number.length;
    if (len <= 4) return number; // jika nomornya pendek, tampilkan semua
    const masked = "*".repeat(len - 4); // sisanya diganti *
    const visible = number.slice(-4);   // 4 digit terakhir
    return masked + visible;
}

// Masking email
export function maskEmail(email) {
    if (!email) return "-";
    const [user, domain] = email.split("@");
    if (!user || !domain) return email;
    if (user.length <= 3) return "*".repeat(user.length) + "@" + domain; // jika user terlalu pendek
    const visible = user.slice(-3); // 3 huruf terakhir
    const masked = "*".repeat(user.length - 3); // sisanya diganti *
    return masked + visible + "@" + domain;
}