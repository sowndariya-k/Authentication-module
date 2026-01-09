// This script helps with the Netlify build process
const fs = require('fs');
const path = require('path');

// Create a file with environment variables for the browser
const envContent = `
// Environment variables for Netlify
window._env = {
  FIREBASE_API_KEY: "${process.env.FIREBASE_API_KEY || 'AIzaSyBuTGZNPixbNBm3SlTF4gzq8i2oiWXRqFs'}",
  FIREBASE_AUTH_DOMAIN: "${process.env.FIREBASE_AUTH_DOMAIN || 'scan-chain.firebaseapp.com'}",
  FIREBASE_PROJECT_ID: "${process.env.FIREBASE_PROJECT_ID || 'scan-chain'}",
  FIREBASE_STORAGE_BUCKET: "${process.env.FIREBASE_STORAGE_BUCKET || 'scan-chain.firebasestorage.app'}",
  FIREBASE_MESSAGING_SENDER_ID: "${process.env.FIREBASE_MESSAGING_SENDER_ID || '1066253647110'}",
  FIREBASE_APP_ID: "${process.env.FIREBASE_APP_ID || '1:1066253647110:web:dcc58a2a898cf1fbf07287'}",
  FIREBASE_MEASUREMENT_ID: "${process.env.FIREBASE_MEASUREMENT_ID || 'G-NJRKZS9J14'}"
};
`;

// Write the environment variables to a file
fs.writeFileSync(path.join(__dirname, 'env-vars.js'), envContent);

console.log('Environment variables file created successfully!'); 