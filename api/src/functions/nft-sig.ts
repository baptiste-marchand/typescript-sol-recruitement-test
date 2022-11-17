import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ethers } from 'ethers';
import { readFileSync } from 'fs';

function createEthersContract(privateKey: string): ethers.Contract {
    const contractAddress = '0x4079d67Cf4Ba28943ae4C096d9e84aB63C1A2853';
    const abi = readFileSync('./ABIs/KairosTest.json', 'utf-8').toString();
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const signer = wallet.connect(provider);
    return new ethers.Contract(contractAddress, abi, signer);
}

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const parsedBody = JSON.parse(event.body || '');
        const res = {
            contract: String(parsedBody.contract),
            tokenId: ethers.BigNumber.from(parsedBody.tokenId),
            key: String(parsedBody.key),
        };
        const contract = createEthersContract(res.key);
        const wallet = new ethers.Wallet(res.key);
        // TODO: Update to use EIP712
        const flatSig = await wallet.signMessage(res.tokenId.toHexString());
        // const signature = await ethers.utils.splitSignature(flatSig);
        const signerIsOwner = await contract.storeNFT([res.contract, res.tokenId], flatSig);
        return {
            statusCode: 200,
            body: `${JSON.stringify(res)} ${JSON.stringify(signerIsOwner)}`,
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
