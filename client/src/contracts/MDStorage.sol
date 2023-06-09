pragma solidity ^0.5.0;
// SPDX-License-Identifier: Unlicensed

contract MDStorage {
    string public name = "prasun";
    uint256 public fileCount = 0;
    mapping(uint256 => File) public files;

    struct File {
        uint256 userId;
        uint256 fileId;
        string fileHash;
        uint256 fileSize;
        string fileType;
        string fileName;
        string fileDescription;
        uint256 uploadTime;
        address payable uploader;
    }

    event FileUploaded(
        uint256 userId,
        uint256 fileId,
        string fileHash,
        uint256 fileSize,
        string fileType,
        string fileName,
        string fileDescription,
        uint256 uploadTime,
        address payable uploader
    );

    constructor() public {}

    function uploadFile(uint256 userId, string memory _fileHash, uint256 _fileSize, string memory _fileType, string memory _fileName, string memory _fileDescription) public {
        // Make sure the file hash exists
        require(bytes(_fileHash).length > 0);
        // Make sure file type exists
        require(bytes(_fileType).length > 0);
        // Make sure file description exists
        require(bytes(_fileDescription).length > 0);
        // Make sure file fileName exists
        require(bytes(_fileName).length > 0);
        // Make sure file userId exists
        require(bytes(userId).length > 0);
        // Make sure uploader address exists
        require(msg.sender != address(0));
        // Make sure file size is more than 0
        require(_fileSize > 0);

        // Increment file id
        fileCount++;

        // Add File to the contract
        files[fileCount] = File(userId, fileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, msg.sender);

        // Trigger an event
        emit FileUploaded(userId, fileCount, _fileHash, _fileSize, _fileType, _fileName, _fileDescription, now, msg.sender);
    }
}
