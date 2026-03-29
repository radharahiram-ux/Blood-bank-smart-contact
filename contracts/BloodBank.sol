
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

/**
 * @title BloodBankTypes
 * @dev Defines the common enums and structs for the BloodBank system.
 */
library BloodBankTypes {
    // Used for defining PatientType
    enum PatientType {
        Donor,
        Receiver
    }

    // Used to storing blood txn
    struct BloodTransaction {
        PatientType patientType;
        uint256 time;
        address from;
        address to;
    }

    // Used for storing single Patient records
    struct Patient {
        uint256 aadhar;
        string name;
        uint256 age;
        string bloodGroup;
        uint256 contact;
        string homeAddress;
        BloodTransaction[] bT;
    }
}

/**
 * @title IBloodBank
 * @dev Interface for the BloodBank contract logic.
 */
interface IBloodBank {
    // used for notifying if function is executed or not
    event Successfull(string message);

    // Register a new patient
    function newPatient(
        string calldata _name,
        uint256 _age,
        string calldata _bloodGroup,
        uint256 _contact,
        string calldata _homeAddress,
        uint256 _aadhar
    ) external;

    // function to get specific user data
    function getPatientRecord(uint256 _aadhar) external view returns (BloodBankTypes.Patient memory);

    // store the blood txn
    function bloodTransaction(
        uint256 _aadhar,
        BloodBankTypes.PatientType _type,
        address _from,
        address _to
    ) external;

    // Admin-only function to fetch all patient records
    function getAllRecord() external view returns (BloodBankTypes.Patient[] memory);
}

/**
 * @title BloodBank
 * @dev Implementation of the BloodBank contract using internal types and interfaces.
 */
contract BloodBank is IBloodBank {
    // set the owner of the contract
    address public owner;

    // Array to store all the patientRecord
    BloodBankTypes.Patient[] private PatientRecord;

    // map is used to map the addhar card with the index number of the array where patient record is stored
    mapping(uint256 => uint256) private PatientRecordIndex;

    // mapping for fast existence check
    mapping(uint256 => bool) private patientExists;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only hospital admin allowed");
        _;
    }

    // Register a new patient
    function newPatient(
        string memory _name,
        uint256 _age,
        string memory _bloodGroup,
        uint256 _contact,
        string memory _homeAddress,
        uint256 _aadhar
    ) external override onlyOwner {
        // Prevent duplicate Aadhaar
        require(!patientExists[_aadhar], "Patient already registered");

        // get the length of array
        uint256 index = PatientRecord.length;

        // insert records
        PatientRecord.push();
        PatientRecord[index].name = _name;
        PatientRecord[index].age = _age;
        PatientRecord[index].bloodGroup = _bloodGroup;
        PatientRecord[index].contact = _contact;
        PatientRecord[index].homeAddress = _homeAddress;
        PatientRecord[index].aadhar = _aadhar;

        // store the array index in the map against the user aadhar number
        PatientRecordIndex[_aadhar] = index;

        // Mark patient as registered
        patientExists[_aadhar] = true;

        emit Successfull("Patient added successfully");
    }

    // function to get specific user data
    function getPatientRecord(uint256 _aadhar)
        external
        view
        override
        returns (BloodBankTypes.Patient memory)
    {
        require(patientExists[_aadhar], "Patient not found");

        uint256 index = PatientRecordIndex[_aadhar];
        return PatientRecord[index];
    }

    // store the blood txn
    function bloodTransaction(
        uint256 _aadhar,
        BloodBankTypes.PatientType _type,
        address _from,
        address _to
    ) external override onlyOwner {
        require(patientExists[_aadhar], "Patient not found");

        // get at which index the patient registration details are saved
        uint256 index = PatientRecordIndex[_aadhar];

        // insert the BloodTransaction in the record
        BloodBankTypes.BloodTransaction memory txObj = BloodBankTypes.BloodTransaction({
            patientType: _type,
            time: block.timestamp,
            from: _from,
            to: _to
        });

        PatientRecord[index].bT.push(txObj);

        emit Successfull(
            "Patient blood transaction data is updated successfully"
        );
    }

    // Admin-only function to fetch all patient records
    function getAllRecord()
        external
        view
        override
        onlyOwner
        returns (BloodBankTypes.Patient[] memory)
    {
        return PatientRecord;
    }
}

