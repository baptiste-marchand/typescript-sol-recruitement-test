// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import { IERC721 } from "forge-std/interfaces/IERC721.sol";
import "lib/openzeppelin-contracts/contracts/utils/Counters.sol";

struct NFT {
    IERC721 nftContract;
    uint256 tokenId;
}

interface KairosTest {
    /// @notice stores the NFT and who signed `signature`
    /// @dev whenever this function is called, give an id to the nft and store its info in a mapping
    /// @param nft the nft to store
    /// @param signature EIP-712 signature of the `nft` argument
    /// @param signerIsOwner true if the signer of `signature` is the owner of `nft`
    function storeNFT(NFT calldata nft, bytes calldata signature) external returns (bool signerIsOwner);

    /// @notice increase of `msg.value` the deposit amount for `nft`
    /// @param nft the nft that should increase its total deposit
    function deposit(NFT calldata nft) external payable;
}

contract KairosTestImpl is KairosTest {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => NFT) public nfts; // id => NFT
    mapping(uint256 => uint256) public deposits; // id => deposit

    function storeNFT(NFT calldata nft, bytes calldata signature) external override returns (bool signerIsOwner) {
        uint nftId = 0;
        for (uint256 i = 1; i < _tokenIdCounter.current() + 1; i++) {
            if (nfts[i].nftContract == nft.nftContract && nfts[i].tokenId == nft.tokenId) {
                nftId = i;
                break;
            }
        }
        if (nftId == 0) {
            _tokenIdCounter.increment();
            nfts[_tokenIdCounter.current()] = nft;
        }
        return true;
    }

    function deposit(NFT calldata nft) external payable override {
        uint256 id = 0;
        for (uint256 i = 1; i <= _tokenIdCounter.current(); i++) {
            if (nfts[i].nftContract == nft.nftContract && nfts[i].tokenId == nft.tokenId) {
                id = i;
                break;
            }
        }
        deposits[id] += msg.value;
    }

    function getNFT(uint256 id) external view returns (NFT memory) {
        return nfts[id];
    }
}
