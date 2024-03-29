// contracts/NFT.ts
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";

contract NFT is ERC1155PresetMinterPauser {
    constructor()
        ERC1155PresetMinterPauser("http://localhost:3000/{id}.json")
    {}
}
