import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { ERC721Abi } from "../contracts/ERC721";
import { ethers } from "ethers";

export function ReadNFT() {
  const [data, setData] = useState<any>(null);
  const [nftId, setNftId] = useState<any>("1");
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const { refetch } = useContractRead({
    address: contractAddress,
    abi: ERC721Abi,
    functionName: "ownerOf",
    args: [ethers.BigNumber.from(nftId)],
    onSuccess: (result) => {
      setData(result);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    refetch();
  }, [nftId]);

  return (
    <div>
      <h1>Read NFT</h1>
      <label htmlFor="nftId">NFT ID = </label>
      <input
        type="text"
        id="nftId"
        name="nftId"
        value={nftId}
        onChange={(e) => setNftId(e.target.value)}
      />
      {data && (
        <div>
          <p>{data}</p>
        </div>
      )}
    </div>
  );
}
