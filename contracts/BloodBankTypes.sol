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
