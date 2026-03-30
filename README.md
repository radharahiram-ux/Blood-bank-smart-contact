 <div align="center">

# 🩸 BloodBank Smart Contract

**Blockchain-based Blood Bank Management System**

![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.0-ff2244?style=for-the-badge&logo=solidity&logoColor=white)
![License](https://img.shields.io/badge/License-GPL--3.0-ffcc00?style=for-the-badge)
![EVM](https://img.shields.io/badge/EVM-London-00eaff?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Educational-ff6680?style=for-the-badge)
![Remix](https://img.shields.io/badge/IDE-Remix-brightgreen?style=for-the-badge&logo=ethereum)

> Secure · Controlled · Auditable · Educational

</div>

---

## 📌 Overview

The **BloodBank Smart Contract** demonstrates how blockchain can be used to design a **hospital/admin-controlled blood bank system** with strong access control, Aadhaar-based unique patient identity, tamper-proof blood transaction history, and defensive programming practices.

Built using **Solidity**, intended for **learning, system design, and portfolio demonstration**.

---

## 🎯 Problem vs Solution

| ❌ Traditional Systems | ✅ Blockchain Solution |
|---|---|
| Centralized databases can be tampered | Only admin/hospital can modify data |
| Duplicate or fake patient records | Aadhaar uniqueness enforced via mappings |
| No immutable audit trail | Every transaction permanently recorded |
| Limited transparency | Full on-chain auditability |
| Poor access control | `onlyOwner` modifier on all critical functions |

---

## 🏗️ System Architecture

```
👑 Owner (Hospital / Admin)
         │
         ▼
  ┌─────────────────┐
  │  BloodBank.sol  │
  └────────┬────────┘
           │
     ┌─────┴──────┐
     │  Functions  │
     └─────────────┘
        │        │        │          │
  newPatient  bloodTx  getRecord  getAllRecord
```

### 🔐 Ownership Model

- Contract follows an **owner (hospital/admin)** model
- Ownership assigned at deployment via `constructor()`
- Critical functions protected using `onlyOwner` modifier

---

## 🧩 Core Data Structures

### 🧑 Patient

```solidity
struct Patient {
    uint256 aadhaar;          // unique national ID
    string  name;
    uint8   age;
    string  bloodGroup;
    string  contact;
    address patientAddress;
    BloodTransaction[] transactions;
    bool    exists;
}
```

### 🩸 BloodTransaction

```solidity
struct BloodTransaction {
    TxType  txType;      // Donor or Receiver
    uint256 timestamp;   // block.timestamp
    address from;
    address to;
    string  bloodGroup;
    uint256 units;
}
```

---

## ⚙️ Key Design Decisions

### 🛡️ Access Control

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "Access denied: not the owner");
    _;
}
```

### 🧬 Aadhaar Uniqueness

```solidity
require(!patients[_aadhaar].exists, "Patient already registered");
```

### 🧪 Defensive Reads

```solidity
require(patients[_aadhaar].exists, "Patient not found");
return patients[_aadhaar];
```

---

## 📂 File Structure

```
Blood-bank-smart-contact/
├── Bloodbank/
│   └── BloodBank.sol       ← main smart contract
└── README.md               ← project documentation
```

---

## ▶️ How to Run (Remix IDE)

**Step 1 — Open Remix**
```
https://remix.ethereum.org
```

**Step 2 — Create Files**
- Create folder: `Bloodbank/`
- Create file: `BloodBank.sol`
- Paste the contract code

**Step 3 — Compile**
- Open **Solidity Compiler** tab
- Select version `^0.8.0`
- Set EVM to **London**
- Click **Compile BloodBank.sol**

**Step 4 — Deploy**
- Open **Deploy & Run Transactions** tab
- Environment: `Remix VM (London)`
- Click **Deploy**

**Step 5 — Interact**

| Function | Access | Description |
|---|---|---|
| `newPatient()` | Admin only | Register a new patient |
| `bloodTransaction()` | Admin only | Record donation/receiving event |
| `getPatientRecord()` | Admin only | Fetch a single patient safely |
| `getAllRecord()` | Admin only | Fetch all records (gas-heavy) |

---

## ⚠️ Not Production-Ready

> This project is for **learning and demonstration only.**

| Issue | Reason |
|---|---|
| 🔓 Public storage | All blockchain data is publicly readable |
| 🏥 No compliance | No HIPAA / GDPR / DPDP implementation |
| 📦 No off-chain storage | Sensitive data should never be fully on-chain |
| ⛽ Gas scalability | Large arrays don't scale well on-chain |

**Real-world approach:**
- Store sensitive data **off-chain** (IPFS / encrypted DB)
- Keep only **hashes/references** on-chain
- Use indexing tools like **The Graph**

---

## 🎓 Learning Outcomes

- ✅ Solidity fundamentals
- ✅ Modifiers & access control
- ✅ Structs, enums, mappings, arrays
- ✅ Data integrity patterns
- ✅ Privacy tradeoffs on blockchain
- ✅ Smart contract system design thinking

---

## 📜 License

This project is licensed under **[GPL-3.0](LICENSE)**.

---

<div align="center">

Made with ❤️ for learning purposes · Not for production use

</div>
