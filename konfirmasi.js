
const productList = document.getElementById("product-list");
const itemCount = document.getElementById("item-count");
const totalPrice = document.getElementById("total-price");
const dpTotal = document.getElementById("dp-total");
const agreeButton = document.getElementById("agree-button");
const confirmationMessage = document.getElementById(
    "confirmation-message"
);

const orders = JSON.parse(
    sessionStorage.getItem("totcycleOrders") || "[]"
);

const rupiah = (amount) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(amount);

function displayOrders() {
    if (orders.length === 0) {
        productList.innerHTML =
            '<p class="empty-message">Tidak ada pesanan. Silakan pilih produk terlebih dahulu.</p>';

        agreeButton.disabled = true;
        agreeButton.textContent = "Tidak Ada Pesanan";
        return;
    }

    let total = 0;
    let totalDP = 0;

    productList.innerHTML = "";

    orders.forEach(order => {
        const price = Number(order.price);
        const dp = Math.round(price * 0.5);

        total += price;
        totalDP += dp;

        const item = document.createElement("article");
        item.className = "order-item";

        const img = document.createElement("img");
        img.alt = order.name;
        img.src = order.image || "https://placehold.co/200x200?text=Produk";

        const details = document.createElement("div");
        details.className = "product-details";

        const name = document.createElement("h3");
        name.textContent = order.name;

        const originalPrice = document.createElement("p");
        originalPrice.textContent = `Harga produk: ${rupiah(price)}`;

        details.append(name, originalPrice);

        const priceDetails = document.createElement("div");
        priceDetails.className = "product-price";

        const dpLabel = document.createElement("p");
        dpLabel.textContent = "Uang muka (50%)";

        const dpValue = document.createElement("p");
        dpValue.className = "dp";
        dpValue.textContent = rupiah(dp);

        priceDetails.append(dpLabel, dpValue);
        item.append(img, details, priceDetails);

        productList.appendChild(item);
    });

    itemCount.textContent = `${orders.length} produk`;
    totalPrice.textContent = rupiah(total);
    dpTotal.textContent = rupiah(totalDP);
}


agreeButton.addEventListener("click", () => {
    if (orders.length === 0) return;

    window.location.href = "pembayaran.html";
});

displayOrders();
