export const KairosTestAbi = [
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
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'deposits',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'id',
                type: 'uint256',
            },
        ],
        name: 'getNFT',
        outputs: [
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
                name: '',
                type: 'tuple',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        name: 'nfts',
        outputs: [
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
        stateMutability: 'view',
        type: 'function',
    },
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
            {
                internalType: 'bytes',
                name: 'signature',
                type: 'bytes',
            },
        ],
        name: 'storeNFT',
        outputs: [
            {
                internalType: 'bool',
                name: 'signerIsOwner',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
