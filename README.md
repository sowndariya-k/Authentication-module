# Voter Authentication 

## 📌 Overview
This module handles the initial voter entry point. It verifies the voter's identity using QR code scanning and fingerprint matching (simulated via file upload/hashing). Once verified, it assigns the voter to an available polling station queue in real-time.

---

## 📂 Project Structure
Ensure your files are organized in the following folder structure for the application to work correctly:

```text
Authentication module/
├── css/
│   └── style.css          # Global styles for all pages
├── js/
│   ├── fingerprint.js     # Biometric hashing and station assignment logic
│   ├── qr-scanner.js      # QR code scanning implementation
│   ├── security.js        # Kiosk mode security (disables right-click, shortcuts)
│   └── voter-details.js   # Fetches and displays voter info from Firestore
├── .vscode/
│   └── settings.json      # VS Code workspace settings
├── build.js               # Build script for Netlify deployment (generates env-vars.js)
├── env.js                 # Environment variable handling for browser
├── fingerprint.html       # Biometric verification UI
├── index.html             # Landing page with QR scanner
├── netlify.toml           # Netlify deployment configuration
└── voter.html             # Voter details confirmation UI
```

---

## 🔑 API KeysThe `config.js` file contains sensitive API keys and should never be committed to version control. Make sure to:
- Keep your API keys private
- Regenerate API keys if they have been exposed
- Use environment variables or secure configuration management in production 



## ⚙️ Module Workflow

### 1. Voter Login (QR Scanning)
*   **Entry Point**: `index.html`
*   **Action**: The voter scans their Voter ID QR code using the webcam.
*   **Logic**: 
    *   `js/qr-scanner.js` initializes the camera.
    *   Upon successful scan, it extracts the **Voter ID**.
    *   The ID is stored in the browser's `localStorage`.
    *   The user is redirected to the details page.

### 2. Identity Verification
*   **Page**: `voter.html`
*   **Action**: The system fetches voter details from Firestore based on the scanned ID.
*   **Logic**: 
    *   `js/voter-details.js` connects to Firestore.
    *   It checks if the voter has already voted (`hasVoted: true`). If so, access is denied.
    *   If eligible, it displays the voter's Name, Age, and Constituency.
    *   The voter clicks **"Confirm"** to proceed to biometric verification.

### 3. Biometric Authentication (Fingerprint)
*   **Page**: `fingerprint.html`
*   **Action**: The voter uploads their fingerprint scan (image file).
*   **Logic**: 
    *   `js/fingerprint.js` reads the file and calculates its **SHA-256 Hash**.
    *   It compares this hash against the stored biometric hash in the Firestore `Voter details` collection.
    *   **Match**: Verification successful.
    *   **No Match**: Access denied.

### 4. Station Assignment (Queue System)
*   **Action**: Clicking "Assign to Station" after verification.
*   **Logic**:
    1.  The system queries the **Firebase Realtime Database** for active polling stations (`stations` node).
    2.  It selects a station based on availability (Load Balancing).
    3.  It pushes the **Voter ID** to that station's `currentVoterIds` queue.
    4.  It updates the voter's record in Firestore to mark them as `verified`.
    5.  The user is redirected back to the home screen for the next voter.

---

## 🚀 How to Run
1.  **Configuration**: Ensure `env.js` contains your valid Firebase configuration keys.
2.  **Local Server**: Open the folder in VS Code and use "Live Server" to run `index.html`.
3.  **Deployment**: The project is configured for Netlify via `netlify.toml`. Run `node build.js` during the build process to inject environment variables.

## 🛡 Security Features
*   **Kiosk Mode**: `js/security.js` prevents users from navigating away, using right-click, or accessing developer tools (F12).
*   **Client-Side Hashing**: Fingerprint data is hashed immediately in the browser; the raw image is never sent to the server during verification.