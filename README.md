## Resources need to implement the test
```
pool address: 0x1c9f47f8c42c3a8be36dcbe3d49e365b8099c7df
mint test nft address: 0x720a1f7ae2c4f9b876852bf14089696c3ee57b1d
swap contract address: 0xf2B19657A9930740b97D03AC40Ed5Ce2f2678475（abi in lib/abi/SeacowsRouter/*.json）
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

