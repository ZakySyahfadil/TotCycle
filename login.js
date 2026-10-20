const form = document.getElementById("login-form");

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const password = document.getElementById("password");

const loginButton = document.getElementById("login-button");

// Memeriksa apakah seluruh input sudah valid
function checkForm() {
    loginButton.disabled = !form.checkValidity();
}

// Periksa setiap kali pengguna mengubah input
form.addEventListener("input", checkForm);

// Ketika form dikirim
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        checkForm();
        return;
    }

    // Simulasi masuk ke halaman toko
    window.location.href = "toko.html";
});

// Kondisi awal: tombol dinonaktifkan
checkForm();