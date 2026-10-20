const checkboxes = document.querySelectorAll(".product-check");
const itemCount = document.getElementById("item-count");
const selectedProducts = document.getElementById("selected-products");
const totalPrice = document.getElementById("total-price");
const buyButton = document.getElementById("buy-button");
const message = document.getElementById("message");

const rupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);

function updateCart() {
    const selected = [...checkboxes].filter(box => box.checked);

    let total = 0;
    selectedProducts.innerHTML = "";

    if (selected.length === 0) {
        selectedProducts.innerHTML =
            "<li>Belum ada produk yang dipilih.</li>";
    }

    selected.forEach(box => {
        total += Number(box.value);

        const li = document.createElement("li");
        li.textContent = `${box.dataset.name} - ${rupiah(Number(box.value))}`;
        selectedProducts.appendChild(li);
    });

    itemCount.textContent = selected.length;
    totalPrice.textContent = rupiah(total);
    buyButton.disabled = selected.length === 0;

    checkboxes.forEach(box => {
        box.closest(".product").classList.toggle(
            "selected",
            box.checked
        );
    });

    message.textContent = "";
}

checkboxes.forEach(box => {
    box.addEventListener("change", updateCart);
});

buyButton.addEventListener("click", () => {
    const selected = [...checkboxes].filter(box => box.checked);
    const names = selected.map(box => box.dataset.name).join(", ");

    message.textContent =
        `Kamu memilih ${names}. Total pembayaran: ${totalPrice.textContent}.`;
});

updateCart();