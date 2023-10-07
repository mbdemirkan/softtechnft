// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMinter is ERC721, ERC721URIStorage {
    address public owner;
    address public liquidy;
    address public treasury;
    uint256 public maxTokenId;

    constructor(address _liquidy, address _treasury) ERC721("NFTMinter", "SOFT") {
        liquidy = _liquidy;
        treasury = _treasury;
        owner = msg.sender;
    }

    function mint(string memory uri)
        public payable 
    {
        safeMint(msg.sender, maxTokenId, uri);
        maxTokenId++;
        uint256 royalityFee = msg.value / 10;
        uint256 price = msg.value - royalityFee;
        uint256 liquidyAmount = royalityFee * 4 / 10;
        uint256 treasuryAmount = royalityFee - liquidyAmount;
        payable(owner).transfer(price);
        payable(liquidy).transfer(liquidyAmount);
        payable(treasury).transfer(treasuryAmount);
    }

    function safeMint(address to, uint256 tokenId, string memory uri)
        public
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
