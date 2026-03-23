let masterKey = "";
let timeout;

// Load check
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

    if (!pass) return alert("Enter password");

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
        resetTimer();
    } else {
        alert("Wrong password");
    }
}

// Encrypt / Decrypt
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, masterKey).toString();
}

function decrypt(text) {
    let bytes = CryptoJS.AES.decrypt(text, masterKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Save note
function saveNote() {
    let note = document.getElementById("noteInput").value;
    if (!note) return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.push({
        text: encrypt(note),
        raw: note.toLowerCase(),
        time: new Date().toLocaleString()
    });

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

        li.innerHTML = `
            <span id="note-${index}">••••••</span><br>
            <small>${n.time}</small><br>
            <button onclick="toggleNote(${index})">Show / Hide</button>
            <button onclick="editNote(${index})">Edit</button>
            <button onclick="deleteNote(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

// Toggle
function toggleNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    let el = document.getElementById(`note-${index}`);

    if (el.innerText === "••••••") {
        el.innerText = decrypt(notes[index].text);
    } else {
        el.innerText = "••••••";
    }
}

// Edit note
function editNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));
    let current = decrypt(notes[index].text);

    let updated = prompt("Edit your note:", current);

    if (updated !== null && updated !== "") {
        notes[index] = {
            text: encrypt(updated),
            raw: updated.toLowerCase(),
            time: new Date().toLocaleString()
        };

        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    }
}

// Delete
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes"));

    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));

    loadNotes();
}

// Clear all
function clearNotes() {
    if (confirm("Delete all notes?")) {
        localStorage.setItem("notes", JSON.stringify([]));
        loadNotes();
    }
}

// Search
function searchNotes() {
    let input = document.getElementById("search").value.toLowerCase();
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let list = document.getElementById("notesList");

    list.innerHTML = "";

    notes.forEach((n, index) => {
        if (n.raw.includes(input)) {
            let li = document.createElement("li");

            li.innerHTML = `
                <span id="note-${index}">••••••</span><br>
                <small>${n.time}</small><br>
                <button onclick="toggleNote(${index})">Show / Hide</button>
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Delete</button>
            `;

            list.appendChild(li);
        }
    });
}

// Export notes
function exportNotes() {
    let data = localStorage.getItem("notes");

    let blob = new Blob([data], { type: "application/json" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "notes.json";
    a.click();
}

// Import notes
function importNotes() {
    let file = document.getElementById("importFile").files[0];

    if (!file) return;

    let reader = new FileReader();

    reader.onload = function (e) {
        let imported = JSON.parse(e.target.result);

        localStorage.setItem("notes", JSON.stringify(imported));

        alert("Notes imported!");
        loadNotes();
    };

    reader.readAsText(file);
}

// Auto lock
function resetTimer() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        alert("Session expired!");
        location.reload();
    }, 60000);
}

document.onmousemove = resetTimer;
document.onkeypress = resetTimer;
