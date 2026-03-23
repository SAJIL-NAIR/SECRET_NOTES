# 🔐 Encrypted Notes App

## 📌 Project Overview

The **Encrypted Notes App** is a secure web application that allows users to create, manage, and store personal notes safely. All notes are encrypted before storage, ensuring that sensitive information remains private and protected.

---

## 🎯 Objective

The objective of this project is to demonstrate the use of **cryptography in real-world applications** by implementing a secure note-taking system with encryption and user authentication.

---

## 🔑 Key Features

* 🔐 Master Password Authentication
* 📝 Create and store notes securely
* 🔒 Notes are encrypted before saving
* 👁️ Show / Hide (Decrypt) notes
* ✏️ Edit existing notes
* 🗑️ Delete individual notes
* 🧹 Clear all notes
* 🔍 Search notes functionality
* 📤 Export individual notes as `.txt` files
* ⏳ Auto logout after inactivity

---

## 🧠 How It Works

1. The user sets a **master password** (used as an encryption key).
2. When a note is created:

   * It is encrypted using **AES encryption**.
3. Encrypted notes are stored in the browser using **localStorage**.
4. When the user logs in:

   * Notes are decrypted and displayed only when requested.
5. Users can edit, delete, search, or export notes securely.

---

## 🔐 Cryptography Used

* **Algorithm:** AES (Advanced Encryption Standard)
* **Type:** Symmetric Key Encryption
* **Key:** User-defined master password

---

## 🛠️ Technologies Used

* **HTML** – Structure
* **CSS** – Styling (Modern UI)
* **JavaScript** – Functionality
* **CryptoJS** – Encryption/Decryption

---

## 📂 Project Structure

```
encrypted-notes/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🚀 How to Run the Project

### ▶️ Run Locally

1. Download or clone the repository
2. Open `index.html` in any browser

### 🌐 Deploy Using GitHub Pages

1. Upload files to your GitHub repository
2. Go to **Settings → Pages**
3. Select branch (`main`) and root folder
4. Access your live project via the generated link

---

## ⚠️ Limitations

* Data is stored locally in the browser (no cloud sync)
* Notes cannot be recovered if the master password is forgotten
* Not intended for highly sensitive real-world data

---

## 🔮 Future Enhancements

* 🌗 Dark/Light mode toggle
* ☁️ Cloud storage integration (Firebase)
* 📱 Mobile responsive design
* 📁 Import notes feature
* 🔐 Multi-user authentication

---

## 🌍 Real-World Application

This project is inspired by secure note-taking and password management systems used in real-world applications to protect user data through encryption.

---

## 👨‍💻 Author

* SAJIL S NAIR

---

## 📜 License

This project is for educational purposes only.
