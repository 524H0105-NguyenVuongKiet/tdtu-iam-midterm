# TDTU IAM SYSTEM - MASTERPIECE LIQUID GLASS EDITION (2026)

Identity and Access Management (IAM) System.
Designed based on the Human Interface Guidelines - iOS 26 Liquid Glass.

---

### 1. KEY FEATURES

#### 🎨 UI/UX DESIGN
- Liquid Glass Architecture: Liquid glass effect, ultra-deep blur, and animated mesh gradients.
- Retina Clarity System: High contrast, ensuring crisp and readable text in both Light and Dark Modes.
- Apple Squircle Design: 50px geometric Apple-standard border radius for all cards and buttons.
- Multi-Device Responsive: Auto-optimizes the interface, hides the sidebar, and scales down headings on Mobile/Tablet devices.

#### 🛡️ SECURITY MECHANISMS
- Multi-Factor Authentication (2FA): Authentication via Google Authenticator using QR codes.
- Google OAuth2 Integration: Quick sign-in with Google, featuring theme-adaptive pill-shaped buttons.
- Hardened Password Recovery: 3-step password recovery process, requiring mandatory PIN verification before allowing a password reset.
- Smart Input Validation:
  + OTP/PIN must be exactly 6 digits to proceed with authentication.
- JWT Stateless Auth: Session management using secure JSON Web Tokens.

---

### 2. TECH STACK

- Frontend: HTML5, CSS3 (Liquid Glass Logic), JavaScript ES6+.
- Backend: Node.js, Express.js.
- Database: MongoDB (Atlas).
- Libraries: SweetAlert2 (iOS Style), Bootstrap 5, Google GSI, Speakeasy.

---

### 3. INSTALLATION GUIDE

#### Step 1: Configure the .env file
Create a `.env` file in the root directory and paste the following parameters:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=410410827263-antql5c3aq2jtq67rgd3mj2ma58b7kop.apps.googleusercontent.com

#### Step 2: Install Dependencies
Run the command: `npm install`

#### Step 3: Run the Project
Run the command: `npm run dev` (or `node server.js`)

#### Step 4: Open Ngrok Connection (For Mobile Demo)
Run the command: `ngrok http 5000`
Then update the generated link in the `index.html` file.

---

### 4. STANDARD DEMO WORKFLOW (FOR INSTRUCTORS)

1. UI SHOWCASE: Toggle between Light and Dark Mode to observe the glass transparency effect.
2. REGISTRATION & 2FA: Create an account using Gmail, scan the QR code via the mobile Authenticator app, and verify the PIN (the PIN refreshes every 30 seconds).
3. FORGOT PASSWORD: Enter Gmail -> Enter the PIN from the mobile app -> Set a new password.
4. GOOGLE SIGN-IN: Click the Google Sign-In button and receive the "Authorized" notification.

### 5. TESTING CREDENTIALS
To facilitate the grading of the Role-Based Access Control (RBAC) feature, instructors are kindly requested to use the pre-configured accounts below:

* **Admin Account (Superadmin):**
  - Email: 524h0105@student.tdtu.edu.vn
  - Password: [123456]
  - Privileges: Access the Admin Center interface, view Server Load statistics, and access Security Audit Logs.

* **User Account:**
  - Email: 524h0102@student.tdtu.edu.vn
  - Password: [654321]