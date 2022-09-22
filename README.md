## Background Info
What is Seacows?
SeaCows is a decentralized NFT AMM powered by AI-driven price oracles to enable instant NFT trading. Website:https://seacows.io/

## What is NFT AMM？
An NFT AMM is a decentralized alternative to centralized marketplaces such as Opensea or Magic Eden. Unlike a bid-and-buy model, it utilizes liquidity pools to allow for frictionless, low-cost trading.
Documentation: https://docs.seacows.io/nft-amm-deep-dives/user-guide

## What to do?
There are a few fundamental functions of Seacows, including swapping (buy and sell in a centralized marketplace), creating the pool, and withdrawing liquidity. What needed to do in this test is swapping.



## Resources need to implement the test
```
pool address: 0x1c9f47f8c42c3a8be36dcbe3d49e365b8099c7df
mint test nft address: 0x720a1f7ae2c4f9b876852bf14089696c3ee57b1d
swap contract address: 0x927967C413c385c097259dc7a51203a027750d9d（abi in lib/abi/SeacowsRouter/*.json）
Swap used outputAmount by lib/abi/SeacowsPair/*.json to pool address got { ..., newSpotPrice }
use lib/merkle-tree/*.json got details
swap func: swapNFTsForToken
```

## chain for testnet implementation

```
0x4
```


## TODO

1. link to metamask wallet, get balance if current address account and display
2. Read nft from the pool and corresponding tokenm, and show its metadata
3. mint test nft to your own wallet(however, don't upload your private key), and implement a list to simple display nft list
4. approve nft to contract 
5. call contract to swap with test nft and get some token(nft to token swap)



> remark: Just implemnt the most basic funciton and website, we don't need fancy styles.




## Hints: 
swap nft for token

```
swapList = [
	{
		pair: pairId,
		nftIds: [tokenId]
	}
]
```

