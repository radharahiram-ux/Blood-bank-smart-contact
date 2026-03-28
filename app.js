const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Default Hardhat first contract address
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "Successfull",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_aadhar",
				"type": "uint256"
			},
			{
				"internalType": "enum BloodBank.PatientType",
				"name": "_type",
				"type": "uint8"
			},
			{
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "bloodTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "aadhar",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bloodGroup",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "contact",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "homeAddress",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "enum BloodBank.PatientType",
								"name": "patientType",
								"type": "uint8"
							},
							{
								"internalType": "uint256",
								"name": "time",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "from",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "to",
								"type": "address"
							}
						],
						"internalType": "struct BloodBank.BloodTransaction[]",
						"name": "bT",
						"type": "tuple[]"
					}
				],
				"internalType": "struct BloodBank.Patient[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_aadhar",
				"type": "uint256"
			}
		],
		"name": "getPatientRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "aadhar",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bloodGroup",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "contact",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "homeAddress",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "enum BloodBank.PatientType",
								"name": "patientType",
								"type": "uint8"
							},
							{
								"internalType": "uint256",
								"name": "time",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "from",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "to",
								"type": "address"
							}
						],
						"internalType": "struct BloodBank.BloodTransaction[]",
						"name": "bT",
						"type": "tuple[]"
					}
				],
				"internalType": "struct BloodBank.Patient",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_bloodGroup",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_contact",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_homeAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_aadhar",
				"type": "uint256"
			}
		],
		"name": "newPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let provider;
let signer;
let contract;

async function init() {
    if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);
        
        document.getElementById('walletStatus').innerText = `Connected: ${accounts[0].substring(0,6)}...`;
        updateStats();
    } else {
        alert("Please install MetaMask!");
    }
}

async function updateStats() {
    try {
        const records = await contract.getAllRecord();
        document.getElementById('totalPatients').innerText = records.length;
    } catch (e) {
        console.error("Stats update failed", e);
    }
}

document.getElementById('patientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const aadhar = document.getElementById('aadhar').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const bloodGroup = document.getElementById('bloodGroup').value;

    try {
        const tx = await contract.newPatient(name, age, bloodGroup, 1234567890, "Sample Address", aadhar);
        document.getElementById('recentActivity').innerText = "Registering...";
        await tx.wait();
        document.getElementById('recentActivity').innerText = "Patient Registered!";
        updateStats();
    } catch (e) {
        console.error(e);
        alert("Transaction failed: " + e.message);
    }
});

async function fetchRecord() {
    const aadhar = document.getElementById('searchAadhar').value;
    try {
        const patient = await contract.getPatientRecord(aadhar);
        document.getElementById('recordDisplay').innerHTML = `
            <div class="card" style="margin-top:1rem">
                <p><strong>Name:</strong> ${patient.name}</p>
                <p><strong>Age:</strong> ${patient.age.toString()}</p>
                <p><strong>Group:</strong> ${patient.bloodGroup}</p>
                <p><strong>Transactions:</strong> ${patient.bT.length}</p>
            </div>
        `;
    } catch (e) {
        alert("Patient not found!");
    }
}

window.onload = init;
