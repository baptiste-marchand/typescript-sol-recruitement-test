import { useState, useEffect } from 'react';
import { useContractRead } from 'wagmi';
import { KairosTestAbi } from '../../contracts/KairosTest';
import { Deposit } from '../Deposit';

export function ReadNFT() {
    const [returnData, setReturnData] = useState<any>(null);
    const [nftId, setNftId] = useState<number>(1);
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    const { refetch } = useContractRead({
        address: contractAddress,
        abi: KairosTestAbi,
        functionName: 'getNFT',
        args: [nftId],
        onSuccess: result => {
            const nft = { nftContract: result[0].toString(), tokenId: result.tokenId.toNumber() };
            setReturnData(nft);
        },
        onError: error => {
            console.error(error);
        },
    });

    useEffect(() => {
        if (nftId) {
            refetch;
        }
    }, [nftId, ReadNFT]);

    return (
        <>
            <h1>Read NFT</h1>
            <label htmlFor="nftId">NFT ID = </label>
            <input
                type="number"
                id="nftId"
                name="nftId"
                value={nftId}
                onChange={e => setNftId(parseInt(e.target.value))}
                min="0"
            />
            {returnData && returnData.nftContract != '0x0000000000000000000000000000000000000000' && (
                <>
                    <div>Contract address = {returnData.nftContract}</div>
                    <div>Token ID = {returnData.tokenId}</div>
                    <Deposit nftContract={returnData.nftContract} tokenId={returnData.tokenId} />
                </>
            )}
        </>
    );
}
