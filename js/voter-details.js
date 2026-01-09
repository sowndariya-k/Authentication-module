import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// Firebase configuration
let firebaseConfig;

firebaseConfig = {
  apiKey: window.process.env.FIREBASE_API_KEY,
  authDomain: window.process.env.FIREBASE_AUTH_DOMAIN,
  projectId: window.process.env.FIREBASE_PROJECT_ID,
  storageBucket: window.process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: window.process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: window.process.env.FIREBASE_APP_ID,
  measurementId: window.process.env.FIREBASE_MEASUREMENT_ID
};

console.log("Firebase config loaded:", firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const voter_id = localStorage.getItem("voter_id") ? localStorage.getItem("voter_id").trim() : null;
if (!voter_id) {
  alert("No voter ID found. Redirecting to login page.");
  window.location.href = "index.html";
}

async function fetchVoterDetails(voter_id) {
  console.log("Fetching voter details for ID:", voter_id);
  const voterRef = doc(db, "Voter details", voter_id);
  try {
    const docSnap = await getDoc(voterRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Voter data retrieved:", data);
      displayVoterDetails(data);
      hashData(data);
    } else {
      console.error("No voter data found for ID:", voter_id);
      document.getElementById("voter-details").innerHTML = `<div class='alert alert-danger'>No voter data found for ID: <strong>${voter_id}</strong>. Please check the database.</div>`;
    }
  } catch (error) {
    console.error("Error fetching voter details:", error);
    document.getElementById("voter-details").innerHTML = `<div class='alert alert-danger'>Error fetching voter details: ${error.message}</div>`;
  }
}

function displayVoterDetails(data) {
  const hasVoted = data.hasVoted;
  if(hasVoted){
    const html = `
    <p><strong>EPIC No:</strong> ${data.voter_id}</p>
    <p><strong>Name:</strong> ${data.Name}</p>
    <p><strong>Age:</strong> ${data.Age}</p>
    <p><strong>Gender:</strong> ${data.Gender}</p>
    <p><strong>Parent/Spouse:</strong> ${data["Parent/Spouse"]}</p>
    <p><strong>State:</strong> ${data.State}</p>
    <p><strong>District:</strong> ${data.District}</p>
    <p><strong>Assembly Constituency:</strong> ${data["Assembly Constituency"]}</p>
    <p><strong>Parliamentary Constituency:</strong> ${data["Parliamentary Constituency"]}</p>
    <p><strong>Part Name:</strong> ${data["Part Name"]}</p>
    <p><strong>Part No:</strong> ${data["Part No"]}</p>
    <p><strong>Serial No:</strong> ${data["Serial No"]}</p>
    <div class="alert alert-warning">
          <strong>Already Voted!</strong><br>
          The voter have already casted their vote.<br>
          <button onclick="window.location.href='index.html'" class="btn btn-primary mt-3">Go Back</button>
        </div>
  `;
    document.getElementById("voter-details").innerHTML = html;

  }else{
    const html = `
    <p><strong>EPIC No:</strong> ${data.voter_id}</p>
    <p><strong>Name:</strong> ${data.Name}</p>
    <p><strong>Age:</strong> ${data.Age}</p>
    <p><strong>Gender:</strong> ${data.Gender}</p>
    <p><strong>Parent/Spouse:</strong> ${data["Parent/Spouse"]}</p>
    <p><strong>State:</strong> ${data.State}</p>
    <p><strong>District:</strong> ${data.District}</p>
    <p><strong>Assembly Constituency:</strong> ${data["Assembly Constituency"]}</p>
    <p><strong>Parliamentary Constituency:</strong> ${data["Parliamentary Constituency"]}</p>
    <p><strong>Part Name:</strong> ${data["Part Name"]}</p>
    <p><strong>Part No:</strong> ${data["Part No"]}</p>
    <p><strong>Serial No:</strong> ${data["Serial No"]}</p>
    <div class="mt-4 text-center">
      <button id="confirm-btn" class="btn btn-success btn-lg">Confirm</button>
    </div>
  `;
  document.getElementById("voter-details").innerHTML = html;
  // Add event listener to the confirm button
  document.getElementById("confirm-btn").addEventListener("click", () => {
        window.location.href = "fingerprint.html";
      });
  }
}

async function hashData(data) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(JSON.stringify(data));
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashHex = Array.from(new Uint8Array(hashBuffer))
                      .map(b => b.toString(16).padStart(2, '0'))
                      .join('');
  console.log("Hashed Voter Data:", hashHex);
  localStorage.setItem("voter_data_hash", hashHex);
  // Remove the automatic redirect
}

fetchVoterDetails(voter_id);