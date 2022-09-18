## 素材
```
pool address: 0x1c9f47f8c42c3a8be36dcbe3d49e365b8099c7df
mint test nft address: 0x720a1f7ae2c4f9b876852bf14089696c3ee57b1d
swap contract address: 0xf2B19657A9930740b97D03AC40Ed5Ce2f2678475（abi in lib/abi/SeacowsRouter/*.json）
```

## chain

```
0x4
```


## TODO

1. 链接metamask 获取余额并展示
2. 读取 pool 中的 nft 及 token 并展示其matadata
3. mint test nft 到自己钱包中 并实现一个列表简单展示nft list
4. approve nft to contract
5. 调用 contract swap text nft get some token（like sudoswap）

> remark: 实现简单的页面及功能即可



## 提示 
swap nft for token

```
swapList = [
	{
		pair: pairId,
		nftIds: [tokenId]
	}
]
```

