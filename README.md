# CertiChain - Blockchain Based Academic Credential Verification System

CertiChain is a blockchain-based web application designed to issue, store, and verify academic credentials in a secure and tamper-proof way. This project demonstrates how blockchain technology can solve the problem of fake degrees and manual verification delays.

# Project Overview

Traditional academic credential verification is slow and vulnerable to forgery. CertiChain provides a decentralized and transparent solution where universities issue credentials as blockchain blocks, students can view their own credentials, and employers can verify authenticity through cryptographic hashes.

# System Users

- **University**  
  Issues academic credentials and adds them to the blockchain.

- **Student**  
  Logs in using Student ID and views personal academic credentials stored on blockchain.

- **Employer (Public Portal)**  
  Verifies student credentials by checking Student ID and certificate hash.


# Core Features

- Blockchain-based immutable credential storage  
- Secure credential issuance by university  
- Student portal for viewing credentials  
- Public employer verification portal  
- Blockchain explorer to view all issued blocks  
- Tamper-proof and transparent verification process  

# Technologies Used

**Frontend:**
- React.js  
- React Router  
- Axios  
- CSS

**Backend:**
- Node.js  
- Express.js  
- MongoDB (for login authentication only)  
- Custom Blockchain Implementation  
- JSON file storage for blockchain persistence  

# System Architecture
User Interface (React)
↓
Backend APIs (Node / Express)
↓
Blockchain Ledger (JSON File Storage)


Login authentication is handled via MongoDB, while credential data is stored and verified using blockchain.

# Blockchain Logic

- Each issued credential becomes a new block  
- Every block contains:
  - Student ID  
  - Name  
  - Degree  
  - Graduation Year  
  - Previous Block Hash  
  - Current Block Hash  
- Any change in data invalidates the entire chain  

# How It Works

1. University logs in and issues a credential  
2. A new block is added to the blockchain  
3. Student logs in using Student ID to view credential  
4. Employer enters Student ID + Hash to verify authenticity  
5. Blockchain integrity is checked automatically

# Folder Structure
backend/
 ├── models/
 │   └── blockchain.js
 ├── routes/
 │   ├── authRoutes.js
 │   └── blockchainRoutes.js
 ├── data/
 │   └── blockchain.json
 └── App.js

frontend/
 ├── components/
 ├── screens/
 └── App.jsx

# Commands
  To run frontend: npm run dev
  To run backend: node app.js
  
# Environment Variables
  Create a `.env` file in backend folder and add:
  
  MONGO_URI=your_mongodb_connection_string  
  JWT_SECRET=your_jwt_secret_key  
  PORT=5000
