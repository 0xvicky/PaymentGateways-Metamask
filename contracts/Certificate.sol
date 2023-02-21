//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

contract certificate is ERC721URIStorage {
    //  struct TokenInfo {
    //         IERC20 paytoken;
    //         uint256 costvalue;
    //     }

    uint256 public tokenCounter;
    uint256 public ownerCount;
    mapping(address => uint256) public ownerToOwnerId;
    uint256 public blockedOwnerCount;
    mapping(address => uint256) public blockedOwnerToOwnerId;

    // TokenInfo[] public AllowedCrypto;
    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {
        tokenCounter = 0;

        blockedOwnerCount = 0;
        ownerCount = 1;
        ownerToOwnerId[msg.sender] = ownerCount;
    }

    modifier onlyOwner() {
        require(
            ownerToOwnerId[msg.sender] > 0,
            "Only owner can call this function."
        );
        require(
            blockedOwnerToOwnerId[msg.sender] == 0,
            "You have been blocked."
        );
        _;
    }

    function setOwner(address _newOwner) public onlyOwner {
        require(ownerToOwnerId[_newOwner] == 0, "Owner already added.");
        ownerCount = ownerCount + 1;
        ownerToOwnerId[_newOwner] = ownerCount;
    }

    function blockOwner(address _owner) external onlyOwner {
        require(msg.sender != _owner, "You cannot block yourself");
        blockedOwnerCount = blockedOwnerCount + 1;
        blockedOwnerToOwnerId[_owner] = blockedOwnerCount;
    }

    //To add any ERC-20 payment gateway to the contract
    // function addCurrency(
    //     IERC20 _paytoken,
    //     uint256 _costvalue
    // ) public onlyOwner {
    //     AllowedCrypto.push(
    //         TokenInfo({
    //             paytoken: _paytoken,
    //             costvalue: _costvalue
    //         })
    //     );
    // }
    // function createCertificate(string memory _tokenURI, address _receiver)
    //     public
    //     onlyOwner
    //     returns (uint256 newTokenId)
    // {
    //     tokenCounter = tokenCounter + 1;
    //     _safeMint(msg.sender, tokenCounter);

    //     transferFrom(msg.sender, _receiver, tokenCounter);
    //     // _tokenIdByOwner[_receiver] = tokenCounter;
    //     // tokenBySender[msg.sender][_receiver] = tokenCounter;
    //     return tokenCounter;
    // }

    function getCertificate(string memory _tokenURI)
        public
        payable
        returns (uint256)
    {
        tokenCounter++;
        // require(msg.value == cost , "Not enough balance to complete transaction.");
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, _tokenURI);
        return tokenCounter;
    }

    function updateCertMetadata(uint256 _tokenId, string memory _newTokenURI)
        public
    {
        require(_tokenId > 0 && _tokenId <= tokenCounter);
        // require(msg.sender == ownerOf(_tokenId));
        _setTokenURI(_tokenId, _newTokenURI);
    }

    //   function withdraw(uint256 _pid) public payable onlyOwner() {
    //             TokenInfo storage tokens = AllowedCrypto[_pid];
    //             IERC20 paytoken;
    //             paytoken = tokens.paytoken;
    //             paytoken.transfer(msg.sender, paytoken.balanceOf(address(this)));
    //         }
    // mapping(address => uint256) public _tokenIdByOwner;
    // mapping(address => mapping(address => uint256)) public tokenBySender;

    // function ownerOfTokens(address _userAddress) public view returns (uint256) {
    //     uint256 tokenID = _tokenIdByOwner[_userAddress];
    //     return tokenID;
    // }

    // function tokenBysenderAdd(address _from, address _reciever)
    //     public
    //     view
    //     returns (uint256)
    // {
    //     uint256 tokenID = tokenBySender[_from][_reciever];
    //     return tokenID;
    // }

    // function createCertificate(string memory _tokenURI)
    //     public
    //     onlyOwner
    //     returns (uint256 newTokenId)
    // {
    //     tokenCounter = tokenCounter + 1;
    //     _safeMint(msg.sender, tokenCounter);
    //     _setTokenURI(tokenCounter, _tokenURI);
    //     return tokenCounter;
    // }
}

//contract Address for USDT - 0xdAC17F958D2ee523a2206206994597C13D831ec7

//URI https://gateway.pinata.cloud/ipfs/QmbzzjcsfcFzYArk7kBUsa7QrYfUqVAkwyrY3UDj4vbonk
