# TDTU IAM SYSTEM (2026)

Identity and Access Management (IAM) System.
Designed based on the Human Interface Guidelines - Liquid Glass.

---

### 1. KEY FEATURES 


#### 📺 Video Demo
https://drive.google.com/file/d/1wlOIfYXK7rlKWld7lcGTT7N7LDKYeyWi/view?usp=drive_link


#### 🎨 UI/UX DESIGN
- Liquid Glass Architecture: Liquid glass effect, ultra-deep blur, and animated mesh gradients.
- Retina Clarity System: High contrast, ensuring crisp and readable text in both Light and Dark Modes.
- Apple Squircle Design: 50px geometric Apple-standard border radius for all cards and buttons.
- Multi-Device Responsive: Auto-optimizes the interface, hides the sidebar, and scales down headings on Mobile/Tablet devices.
- DarkMode.
<img width="1918" height="879" alt="image" src="https://github.com/user-attachments/assets/4bfd27f9-51b3-4459-96a8-9604b5be5605" />
<img width="1918" height="892" alt="image" src="https://github.com/user-attachments/assets/bdbdedce-f97c-44cf-8822-cd9497b738cc" />
- LightMode.
<img width="1910" height="896" alt="{96978B96-67CA-4F36-9CD6-8B5DAA0189C6}" src="https://github.com/user-attachments/assets/165f9d24-3a81-4105-b90e-0652f6a657c8" />
<img width="1909" height="886" alt="{49E35BDF-E8BA-4226-96C1-1CF7A41FD8CE}" src="https://github.com/user-attachments/assets/39d95e78-2cff-4848-9fb7-4203448f011b" />




#### 🛡️ SECURITY MECHANISMS
- Multi-Factor Authentication (2FA): Authentication via Google Authenticator using QR codes.
- Google OAuth2 Integration: Quick sign-in with Google, featuring theme-adaptive pill-shaped buttons.
- Hardened Password Recovery: 3-step password recovery process, requiring mandatory PIN verification before allowing a password reset.
- Smart Input Validation:
  + OTP/PIN must be exactly 6 digits to proceed with authentication.
- JWT Stateless Auth: Session management using secure JSON Web Tokens.
<img width="1910" height="891" alt="image" src="https://github.com/user-attachments/assets/bf20ac21-ded3-4306-9dc8-26330f721de8" />
Register account sceen with 2FA via Google Authenticator using QR codes.
<img width="1911" height="888" alt="image" src="https://github.com/user-attachments/assets/5bf1c2ae-9aa8-4220-899d-192223f4a213" />
"Rejects the request and triggers a validation error popup due to an existing record."
<img width="1914" height="885" alt="{E6B224FE-5357-4533-A454-B258022AB13F}" src="https://github.com/user-attachments/assets/0565d38c-072f-47a5-9a1a-9ec394232e59" />
"Supports multiple authentication providers, including Google OAuth 2.0 and standard email/password login."
<img width="1920" height="1080" alt="{59AC87FB-C4ED-471B-8B1B-A9A98134B53E}" src="https://github.com/user-attachments/assets/192e5cfa-00cb-4977-a0a1-73ff79afc32b" />
<img width="1896" height="887" alt="image" src="https://github.com/user-attachments/assets/8b0e291a-4cac-46df-8e88-a30e682f3ff4" />
<img width="1910" height="892" alt="image" src="https://github.com/user-attachments/assets/7aa802f3-b406-400e-8ffb-070bf4e5fa3f" />
<img width="1913" height="894" alt="{AC96B4CD-83CD-4395-9A88-6BEAF3A0C96A}" src="https://github.com/user-attachments/assets/4c982ee2-d9b7-4bca-a91f-7ea6f3c83021" />
"Authenticating with administrator privileges."
<img width="1918" height="893" alt="image" src="https://github.com/user-attachments/assets/784a2ad7-7e19-4ac2-9ae8-092a358979be" />
<img width="1919" height="893" alt="image" src="https://github.com/user-attachments/assets/5a3b6e73-d6d4-4fe9-bff3-2c7ec324694b" />
<img width="1918" height="879" alt="image" src="https://github.com/user-attachments/assets/7805f210-7bed-479c-8b4b-ca19abeca3db" />
<img width="1913" height="885" alt="image" src="https://github.com/user-attachments/assets/96737150-525c-4148-b5fa-1979c464cb45" />
"Authenticating with standard user privileges."



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

---

### 4. STANDARD DEMO WORKFLOW (FOR INSTRUCTORS)

1. UI SHOWCASE: Toggle between Light and Dark Mode to observe the glass transparency effect.
2. REGISTRATION & 2FA: Create an account using Gmail, scan the QR code via the mobile Authenticator app, and verify the PIN (the PIN refreshes every 30 seconds).
3. FORGOT PASSWORD: Enter Gmail -> Enter the PIN from the mobile app -> Set a new password.
4. GOOGLE SIGN-IN: Click the Google Sign-In button and receive the "Authorized" notification.

### 5. TESTING CREDENTIALS
To facilitate the grading of the Role-Based Access Control (RBAC) feature, instructors are kindly requested to use the pre-configured accounts below:
Because the database is running locally, please register a new account on your machine to test the features. To test Admin privileges, please modify the 'role' field to 'admin' or "user" in your local MongoDB collection.
<img width="1011" height="230" alt="{0CDCFB9D-6BF7-4F6B-818A-0491F834FD2D}" src="https://github.com/user-attachments/assets/59a28d49-5cd2-46af-9688-275057ec94d3" />
<img width="1920" height="1080" alt="{EEEF653B-28BD-4F4C-9A66-E720B80E32A7}" src="https://github.com/user-attachments/assets/61394f9e-da37-4aa8-b124-2041559b6ebf" />
<img width="1493" height="273" alt="{D46428D5-BA7C-4BCA-BA4F-26D35E70B51F}" src="https://github.com/user-attachments/assets/a2f0d461-2400-45ed-b10b-df5667232a0a" />
<img width="1471" height="222" alt="{73A70FC7-3B39-4AA7-8C69-BC6C780904E2}" src="https://github.com/user-attachments/assets/befbb890-4cd5-481a-96b4-29ff90032eeb" />



For example:
* **Admin Account (Superadmin):**
  - Email: 524h0105@student.tdtu.edu.vn
  - Password: [123456]
  - Privileges: Access the Admin Center interface, view Server Load statistics, and access Security Audit Logs.

* **User Account:**
  - Email: 524h0102@student.tdtu.edu.vn
  - Password: [654321]
