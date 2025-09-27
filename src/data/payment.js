import { CreditCard, Wallet, Landmark, WalletMinimal } from "lucide-react";

export const paymentMethods = [
    { id: 1, name: "Transfer Bank", icon: Landmark, description: "Transfer melalui BCA, Mandiri, BNI, BRI" },
    { id: 2, name: "E-Wallet", icon: Wallet, description: "GoPay, OVO, DANA, ShopeePay" },
    { id: 3, name: "Kartu Kredit", icon: CreditCard, description: "Visa, MasterCard, American Express" },
    { id: 4, name: "Virtual Account", icon: WalletMinimal, description: "Bayar melalui Virtual Account" },
];
