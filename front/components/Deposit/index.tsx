import { ethers } from 'ethers';
import { useState } from 'react';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import styles from './index.module.css';

export function Deposit(props: { nftContract: `0x${string}`; tokenId: number }) {
    console.log(props.tokenId);
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '';
    const [amount, setAmount] = useState<number>(0.01);

    const { config } = usePrepareContractWrite({
        address: contractAddress,
        abi: [
            {
                inputs: [
                    {
                        components: [
                            {
                                internalType: 'contract IERC721',
                                name: 'nftContract',
                                type: 'address',
                            },
                            {
                                internalType: 'uint256',
                                name: 'tokenId',
                                type: 'uint256',
                            },
                        ],
                        internalType: 'struct NFT',
                        name: 'nft',
                        type: 'tuple',
                    },
                ],
                name: 'deposit',
                outputs: [],
                stateMutability: 'payable',
                type: 'function',
            },
        ],
        functionName: 'deposit',
        args: [
            {
                nftContract: props.nftContract,
                tokenId: ethers.BigNumber.from(props.tokenId),
            },
        ],
        overrides: {
            from: '0xDed397033360f2254707ff4ef69698713148B42f',
            value: ethers.utils.parseEther(amount.toString()),
        },
        onSuccess: result => {
            console.log(result);
        },
        onError: error => {
            console.error(error);
        },
    });

    const { write: deposit, data } = useContractWrite(config);

    const waitForTransaction = useWaitForTransaction({
        hash: data?.hash,
    });

    return (
        <>
            <h1>Deposit NFT</h1>
            <label htmlFor="nftId">Deposit amount = </label>
            <input
                type="number"
                step="any"
                name="depositAmount"
                value={amount}
                onChange={e => setAmount(parseFloat(e.target.value))}
            />
            <button onClick={() => deposit?.()}>Submit</button>
            {waitForTransaction.isLoading && <div>Waiting for transaction to be mined...</div>}
            {!waitForTransaction.isLoading &&
                (waitForTransaction.isError ? (
                    <div className={styles.txFailed}>Transaction failed</div>
                ) : (
                    <div className={styles.txSuccess}>Transaction successful</div>
                ))}
        </>
    );
}
