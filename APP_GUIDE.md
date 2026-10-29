# 🌱 FarmDirect - Mobile & Desktop App Guide (செயலி வழிகாட்டி)

FarmDirect is now completely configured to run as an **installable application** across mobile and desktop platforms.

---

## 📱 Option 1: Instant PWA App (Android, iOS & Desktop)
*Zero download required, works on any device.*

### On Android (Chrome / Edge / Samsung Internet):
1. Open `http://localhost:5000` (or your live deployed URL) on your phone.
2. An elegant **"Install FarmDirect App"** banner will slide up at the bottom.
3. Tap **Install**, or tap browser menu **(⋮) ➔ "Install App" / "Add to Home screen"**.
4. FarmDirect is added to your app drawer and home screen with its official icon, launching in full-screen standalone mode without browser URL bars.

### On iPhone / iPad (iOS Safari):
1. Open the website in **Safari**.
2. Tap the **Share** button (**📤**) in the bottom navigation bar.
3. Scroll down and select **"Add to Home Screen"** (**➕**).
4. Tap **Add** in the top right corner.
5. The FarmDirect app icon will appear on your iOS home screen with offline caching enabled.

### On PC / Mac (Chrome / Edge):
1. In the browser URL bar, click the **Install icon (⊕)** or the green **"App"** pill in the top header.
2. Click **Install**.
3. FarmDirect opens in its own desktop window and can be pinned to your Windows Taskbar or macOS Dock.

---

## 🤖 Option 2: Generate a Native Android APK (Google Play Store)

### Method A: Free 1-Click APK via Microsoft PWABuilder (Fastest)
1. Deploy your FarmDirect project to any public host (Vercel, Render, Railway, etc.).
2. Go to [PWABuilder.com](https://www.pwabuilder.com/).
3. Enter your deployed URL and click **Start**.
4. PWABuilder will automatically read your `manifest.json` and `sw.js` (Score: 100/100).
5. Click **"Package for Stores" ➔ Android** to download a signed **APK / AAB** package ready for Google Play or direct installation.

### Method B: Native Android Project via Capacitor
Pre-configured in `package.json` and `capacitor.config.json`:
1. Run:
   ```bash
   npm run app:android
   ```
2. Android Studio will open the native Android project.
3. Click **Build ➔ Build Bundle(s) / APK(s) ➔ Build APK(s)**.

---

## 🚀 Key App Features Enabled:
- **Standalone Full-Screen Mode**: No browser address bars or navigation controls.
- **Offline Mode**: Supported by `sw.js` and `offline.html` so core pages stay cached.
- **Mobile Bottom Navigation**: Native-style bottom bar (`Home`, `Market`, `Cart`, `My Home`, `Menu`).
- **Interactive Install Banner**: Automatic bottom banner prompting users to install.
- **Fast Startup & App Shell**: High-resolution 192px and 512px app icons with splash screen colors.

