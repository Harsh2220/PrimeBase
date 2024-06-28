export const registerABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "schema",
                "type": "string"
            },
            {
                "name": "resolver",
                "type": "address"
            },
            {
                "name": "revocable",
                "type": "bool"
            }
        ],
        "name": "register",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
