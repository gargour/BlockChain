// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DatasetRegistry {
    struct Dataset {
        string name;
        string description;
        address owner;
        uint256 timestamp;
        uint256 amount;
    }

    Dataset[] public datasets;

    // Ajout de "payable" pour accepter des ETH
    function registerDataset(string memory _name, string memory _description) public payable {
        datasets.push(Dataset(_name, _description, msg.sender, block.timestamp, msg.value));
    }

    function getDatasets() public view returns (Dataset[] memory) {
        return datasets;
    }
}