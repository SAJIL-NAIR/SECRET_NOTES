let masterKey = "";

// Check setup
window.onload = function () {
    if (localStorage.getItem("masterPass")) {
        document.getElementById("setup").style.display = "none";
        document.getElementById("login").style.display = "block";
    } else {
        document.getElementById("setup").style.display = "block";
    }
};

// Set password
function setPassword() {
    let pass = document.getElementById("setPass").value;

    if (!pass) {
        alert("Enter password");
        return;
    }

    localStorage.setItem("masterPass", pass);
    alert("Password set!");
    location.reload();
}

// Login
function login() {
    let pass = document.getElementById("loginPass").value;
    let stored = localStorage.getItem("masterPass");

    if (pass === stored) {
        masterKey = pass;

        document.getElementById("login").style.display = "none";
        document.getElementById("app").style.display = "block";

        loadNotes();
    } else {
        alert("Wrong password");
    }
}

// Encrypt
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, masterKey).toString();
}

// Decrypt
function decrypt(text) {
    let bytes = CryptoJS.AES.decrypt(text, masterKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Save note
function saveNote() {
    let note = document.getElementById("noteInput").value;

    if (!note) return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.push(encrypt(note));

    localStorage.setItem("notes", JSON.stringify(notes));

    document.getElementById("noteInput").value = "";

    loadNotes();
}

// Load notes
function loadNotes() {
    let list = document.getElementById("notesList");
    list.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((n, index) => {
        let li = document.createElement("li");

        let decrypted = decrypt(n);

        li.innerHTML = `
            ${decrypted}
            <br>
            <button onclick="deleteNote(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

// Delete note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.splice(index, 1);

    localStorage.setItem("notes", JSON.stringify(notes));

    loadNotes();
}