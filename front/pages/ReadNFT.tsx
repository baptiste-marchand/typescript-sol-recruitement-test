import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { KairosTestAbi } from "../contracts/KairosTest";

export function ReadNFT() {
  const [data, setData] = useState<any>(null);
  const [nftId, setNftId] = useState<number>(1);
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const { refetch } = useContractRead({
    address: contractAddress,
    abi: KairosTestAbi,
    functionName: "getNFT",
    args: [nftId],
    onSuccess: (result) => {
        const nft = [
          result[0].toString(),
          result.tokenId.toNumber(),
        ];
        setData(nft);
        console.log(result.tokenId.toNumber());
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    if (nftId) {
      refetch();
    }
  }, [nftId, refetch]);

  return (
    <div>
      <h1>Read NFT</h1>
      <label htmlFor="nftId">NFT ID = </label>
      <input
        type="number"
        id="nftId"
        name="nftId"
        value={nftId}
        onChange={(e) => setNftId(parseInt(e.target.value))}
      />
      {data && (
        <>
          <div>Contract address = {data[0]}</div>
          <div>Token ID = {data[1]}</div>
        </>
      )}
    </div>
  );
}
