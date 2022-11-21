import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const parsedBody = JSON.parse(event.body || '');
        const res = {
            contract: String(parsedBody.contract),
            tokenId: ethers.BigNumber.from(parsedBody.tokenId),
            key: String(parsedBody.key),
        };
        const signer = new ethers.Wallet(res.key, provider);
        const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS!, process.env.KAIROS_TEST_ABI!, signer);
        const domain = {
            name: 'KairosTest',
            version: '1',
            chainId: 1,
        };
        const types = {
            NFT: [
                { name: 'contractAddress', type: 'address' },
                { name: 'tokenId', type: 'uint256' },
            ],
        };
        const value = {
            contractAddress: res.contract,
            tokenId: res.tokenId,
        };
        const sig = await signer._signTypedData(domain, types, value);
        contract.storeNFT([res.contract, res.tokenId], sig);
        return {
            statusCode: 200,
            body: sig,
        };
    } catch (err) {
        if (err instanceof Error) {
            return {
                statusCode: 500,
                body: err.message,
            };
        }
        return {
            statusCode: 500,
            body: 'An error occured',
        };
    }
};
