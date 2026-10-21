const orders = JSON.parse(
    sessionStorage.getItem("totcycleOrders") || "[]"
);

const dpTotalElement = document.getElementById("dp-total");
const confirmPaymentButton = document.getElementById("confirm-payment");
const paymentMessage = document.getElementById("payment-message");

const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(amount);
};

if (orders.length === 0) {
    dpTotalElement.textContent = formatRupiah(0);
    confirmPaymentButton.disabled = true;
    paymentMessage.textContent =
        "Data pesanan tidak ditemukan. Silakan pilih produk kembali.";
} else {
    const totalDP = orders.reduce((total, order) => {
        return total + Math.round(Number(order.price) * 0.5);
    }, 0);

    dpTotalElement.textContent = formatRupiah(totalDP);

    confirmPaymentButton.addEventListener("click", function () {
        paymentMessage.textContent =
            "Konfirmasi pembayaran berhasil dikirim. " +
            "Silakan tunggu verifikasi pembayaran.";

        paymentMessage.style.color = "green";
        confirmPaymentButton.disabled = true;
        confirmPaymentButton.textContent = "Menunggu Verifikasi";
    });
}