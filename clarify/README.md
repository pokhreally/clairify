# Home Assignment

Simple app with a login page and a dashboard page.

### Packages Utilized
- Expo
- Google SSO
- Nativewind

## Usage
```bash
npm install
```
It is essential to work in development mode for Google SSO to work. For that, ```eas``` is required.
```bash
npm install --global eas-cli
```
For android
```bash
eas build -p android --profile development  
```
For ios
```bash
eas build -p ios --profile development  
```

A QR code is generated scan the QR code. You will be asked to install an app (Only for android). Install the app.

```bash
npm run start  
```
Open the app and choose localhost:(port).
