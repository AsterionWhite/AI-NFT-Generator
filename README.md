# AI-NFT-Generator
Generate AI art with Dall-E , mint that art on Polygon chain within seconds !

## To run the project there are a few prerequisites to take care of:

### Smart Contract level keys ( smart_contract => .env)
- Get the project network https key URL for Polygon Mumbai network from Alchemy => https://www.alchemy.com/ and paste it here => REACT_APP_MUMBAI_TESTNET_URL= 
- Get your wallet private key and paste it here => REACT_APP_WALLET_PRIV_KEY=
- Get some Mumbai Matic tokens in your wallet => https://mumbaifaucet.com/ ( 1 MATIC token is more than enough ).

### Deploy the smart contract
- Run `npm i` in smart_contract folder level to install all the dependancies.
- The command to deploy the smart contract is: `npx hardhat run scripts/deploy.js --network mumbai`


### Client app level keys ( root lvl => .env )
- To be able to generate image from text with Dall-E you need an API key from here => https://platform.openai.com/ and then paste it here => REACT_APP_OPEN_AI_API_KEY=
- Get the project API KEY from here => https://www.alchemy.com/ and paste it here => REACT_APP_ALCHEMY_API_KEY=
- Get your wallet private key again and paste it here => REACT_APP_WALLET_PRIV_KEY
- To be able to upload images and metadata to IPFS you will need PINATA JWT token from here => https://app.pinata.cloud/developers/api-keys and paste it here => REACT_APP_PINATA_JWT

### Run the client app
- Run `npm i` at root level
- Run `npm start` to load the application.
- Get your wallet extention ready ( The app was tested with Coinbase & Metamask wallets );
- The app is already connected to a smart contract address at MintNft.js inside variable `contractAddress`. Change that address with your own.
- After you've minted your NFT you can search for the contract address => https://testnets.opensea.io/

### Have fun !