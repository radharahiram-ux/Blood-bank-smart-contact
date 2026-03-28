// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./BloodBankTypes.sol";

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
