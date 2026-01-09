# Voter Card Scanner

## Configuration Setup

1. Copy `config.example.js` to `config.js`
2. Replace the placeholder values in `config.js` with your actual Firebase configuration
3. Never commit `config.js` to version control

## Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com/
2. Get your Firebase configuration from Project Settings
3. Update the `config.js` file with your Firebase configuration

## Security Note

The `config.js` file contains sensitive API keys and should never be committed to version control. Make sure to:
- Keep your API keys private
- Regenerate API keys if they have been exposed
- Use environment variables or secure configuration management in production 