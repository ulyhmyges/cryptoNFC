# cryptoNFC

## Purpose

The aim of the project is to use NFC technology for cryptocurrency payment

## Installation

to start a mongodb database
```shell
make
```


## Description

### Architectural diagram
![Schema](./architecture_cryptoNFC.png)

### Scenario payment
![Scenario](./scenario_crypto_payment.png)

### Frontend
    - React
    - Javascript

### Backend
    - Nodejs
    - Typescript
    - Manage - OpenZeppelin Service
        -> Relayer

### Database
    - Mongodb

### Blockchain
    - Access control - OpenZeppelin Service
    - Smart contracts :
        *   Invoice
            => Smart contract of NFT that represent a payment's invoice
        *   InvoiceFactory
            => Smart contrat with Factory pattern to generate an instance of Invoice smart contract
        *   BillDefinition
            => Smart contract to share information between others smart contracts
    

### Git flow
![Git flow](./gitflow.png)

## Contributing

- [Hanane](https://github.com/ulyh)


## License

Distributed under the GNU GENERAL PUBLIC LICENSE. See `LICENSE` for more information.


