import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ethers } from 'ethers';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const parsedBody = JSON.parse(event.body || '');
        const res = {
            contract: String(parsedBody.contract),
            tokenId: ethers.BigNumber.from(parsedBody.tokenId),
            key: String(parsedBody.key)
        }
        return {
            statusCode: 200,
            body: JSON.stringify(res),
        };
        // Do something...
    } catch (err) {
        if (err instanceof Error) {
            return {
                statusCode: 500,
                body: err.message,
            }
        }
        return {
            statusCode: 500,
            body: 'An error occured',
        }
    }
}