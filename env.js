// This script helps with environment variables in the browser
window.process = window.process || {};
window.process.env = window.process.env || {};

// Function to get environment variables
function getEnvVar(name) {
  // Check if we're in a Netlify environment
  if (window.location.hostname.includes("netlify.app")) {
    // For Netlify, use global variables injected at build time
    return window._env && window._env[name] ? window._env[name] : null;
  }
  return null;
}

// Set up environment variables (UPDATED PROJECT)
window.process.env.FIREBASE_API_KEY =
  getEnvVar("FIREBASE_API_KEY") || "AIzaSyBuTGZNPixbNBm3SlTF4gzq8i2oiWXRqFs";

window.process.env.FIREBASE_AUTH_DOMAIN =
  getEnvVar("FIREBASE_AUTH_DOMAIN") || "scan-chain.firebaseapp.com";

window.process.env.FIREBASE_PROJECT_ID =
  getEnvVar("FIREBASE_PROJECT_ID") || "scan-chain";

window.process.env.FIREBASE_STORAGE_BUCKET =
  getEnvVar("FIREBASE_STORAGE_BUCKET") || "scan-chain.firebasestorage.app";

window.process.env.FIREBASE_MESSAGING_SENDER_ID =
  getEnvVar("FIREBASE_MESSAGING_SENDER_ID") || "1066253647110";

window.process.env.FIREBASE_APP_ID =
  getEnvVar("FIREBASE_APP_ID") ||
  "1:1066253647110:web:dcc58a2a898cf1fbf07287";

window.process.env.FIREBASE_MEASUREMENT_ID =
  getEnvVar("FIREBASE_MEASUREMENT_ID") || "G-NJRKZS9J14";
