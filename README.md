# Kairos-loan recruitement test for fullstack blockchain engineer

Fork this repo and implement following instructions. Send your repo link when you are finished.

Show your knowledge of best practices along the way. 

Make a serverless api in typescript. It has an endpoint `/nft-sig` that accepts http POST requests. (return 400 on user errors, 500 on internal server errors, 200 if works ok)  
It accepts a body of format `{ contract: string, tokenId: ethers.BigNumber, key: string}` where the contract and key are 0x-prefixed hexadecimal values of an address for contract, of a private key for key.  

Make a solidity smart-contract that extends the [`Test interface`](Test.sol), check natspec to see how to implement it.  

Make a react (typescript) + wagmi sh + [rainbowkit](https://www.rainbowkit.com/) frontend. It has an input field, the user can enter a number, if it corresponds to the id of a stored nft in the contract, the nft with its image is displayed. There is a button under the rendered nft, clicking it initiate a transaction to send 1 eth to the contract through the `deposit` method, with the corresponding nft passed as argument.

When the `/nft-sig` endpoint of the api is called, it calls the contract's `storeNFT()` method using the provided private key for sending the tx and for eip-712 signing.

This next part's instructions are less precise on purpose. Implement another api endpoint used by signers to trustlessly signal their will to store multiple nfts, without settling it on chain straight away. This endpoint must use the private key of the signer only once when called. Implement a way for anyone later in time to settle the storage of an arbitrary subset of the initial set of nfts (passed as argument to the api) at once in the contract through the frontend. You will need to implement a new method `storeNFTs(<some params>)` in the contract.

Implement some tests demonstrating nominal functionnality of the smart contract and the api, separately

Implement an end-to-end test testing all 3 components (api, front and contract) together at once

Don't worry if you don't know how to code this test right away, we are testing your ability to seach and find solutions by yourself. If you are stuck or  if something is unclear don't hesitate to reach out to [the cto](mailto:nicolas@kairos.loan)