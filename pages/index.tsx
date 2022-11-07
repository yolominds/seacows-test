import type { NextPage } from 'next';
import { Button, Layout } from 'antd';
import styles from '../styles/Home.module.scss';
import ClientWrap from '../src/components/ClientWrap';
import Header from '../src/components/Header';
import { ethers } from 'ethers';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';

import {
	useProvider,
	useSigner,
	useContractWrite,
	useAccount,
	usePrepareSendTransaction,
	useSendTransaction,
	usePrepareContractWrite,
} from 'wagmi';

import CONTRACT from '../lib/contract';
import { useState } from 'react';

type Address = string;
type Id = string | number;

const { Footer, Sider, Content } = Layout;

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
		},
	},
	queryCache: new QueryCache({
		onError: () => {
			console.log(
				'Network Error: Ensure MetaMask is connected to the same network that your contract is deployed to.'
			);
		},
	}),
});

const Home: NextPage = () => {
	const [approvedList, setApprovedList] = useState<Id[]>([]);

	const provider = useProvider();
	const { data: signer } = useSigner();
	const { address: userAddress } = useAccount();

	const { config: mintConfig } = usePrepareContractWrite({
		address: CONTRACT.nft.address,
		abi: CONTRACT.nft.ABI,
		functionName: 'mint',
	});
	const { write: mint } = useContractWrite(mintConfig as any);

	async function approve(nftAddress: Address, nftId: Id) {
		const { config } = usePrepareContractWrite({
			address: nftAddress,
			abi: CONTRACT.nft.ABI,
			functionName: 'approve',
			args: [CONTRACT.swap.address, nftId],
		});
		const { isSuccess } = await useContractWrite(config as any);
		if (isSuccess) {
			alert('mint success');
		} else {
			alert('mint fail');
		}
	}

	async function fetchMetadata(nftAddress: Address, nftId: Id) {
		const nftContract = new ethers.Contract(
			nftAddress,
			CONTRACT.nft.ABI,
			provider
		);
		const [nftName, tokenURI] = await Promise.all([
			nftContract.name(),
			nftContract.tokenURI(nftId),
		]);
		const metadata = await fetch(tokenURI).then(res => res.json());
		return { nftName, tokenURI, metadata };
	}

	async function fetchUserNftList(userAddress: Address) {
		const { swap, nft } = CONTRACT;
		let approvedList: (string | number)[] = [];
		const nftContract = new ethers.Contract(nft.address, nft.ABI, provider);
		const nftIds = await nftContract.walletOfOwner(userAddress);

		const nftList = await Promise.all(
			nftIds.map(async (nftId: string | number) => {
				const approvedAddress = await nftContract.getApproved(nftId);
				if (approvedAddress === swap.address) {
					approvedList.push(nftId);
				}
				const {
					metadata: { name, description, image },
				} = await fetchMetadata(nft.address, nftId);
				return { nftId, name, description, image };
			})
		);
		setApprovedList(approvedList);
		return nftList;
	}

	async function getCurrentPrice(pairAddress: Address, nftIds: Id[]) {
		const pairContract = new ethers.Contract(
			pairAddress,
			CONTRACT.pair.ABI,
			provider
		);
		try {
			const price = await pairContract.getSellNFTQuote(nftIds);
			return price;
		} catch (e) {
			console.log(e);
		}
	}

	async function swap(nftId: Id, pairAddress: Address) {
		const swapContract = new ethers.Contract(
			CONTRACT.swap.address,
			CONTRACT.swap.ABI,
			signer as ethers.Signer
		);
		try {
			const currentPrice = await getCurrentPrice(pairAddress, [nftId]);
			if (!currentPrice) throw new Error('currentPrice is not exist');

			const swapList = [{ pair: pairAddress, nftIds: [nftId] }];
			const deadline = Math.floor(Date.now() / 1000) + 60 * 60 * 24;
			const txData = swapContract
				.swapNETsForToken(swapList, '1', userAddress, deadline)
				.encodeABI();

			const { config } = usePrepareSendTransaction({
				request: {
					from: userAddress,
					to: CONTRACT.swap.address,
					data: txData.data,
				},
			});
			const { sendTransaction } = useSendTransaction(config);
			if (!sendTransaction) throw new Error('sendTransaction is not exist');
			await sendTransaction();

			alert('swap success');
		} catch (e) {
			alert(e);
		}
	}

	async function getLogs(contractAddress: Address, contractABI: any) {
		const swapContract = new ethers.Contract(
			contractAddress,
			contractABI,
			provider
		);
		const factoryAddress = await swapContract.factory();
		const {
			data: { result: logs },
		} = await fetch(
			`https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&address=${factoryAddress}&startblock=0&endblock=999999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
		).then(res => res.json());
		return logs;
	}

	async function getPairList() {
		const pairList: object[] = [];
		const contractList = [
			{ address: CONTRACT.swap.address, ABI: CONTRACT.swap.ABI },
			{ address: CONTRACT.pool.address, ABI: CONTRACT.pair.ABI },
		];
		const logs = await Promise.all(
			contractList.map(({ address, ABI }) => getLogs(address, ABI))
		);

		logs.forEach(log => {
			log.forEach((item: { data: any; topics: any[] }) => {
				const pairAddress = item.topics[1];
				const nftIds = [item.data];
				pairList.push({ pairAddress, nftIds });
			});
		});
		return pairList;
	}

	return (
		<ClientWrap>
			<QueryClientProvider client={queryClient}>
				<Layout className={styles.layout}>
					<Header />
					<Layout>
						<Sider>
							<Button onClick={() => mint?.()}>Mint</Button>
							<Button onClick={() => approve(CONTRACT.nft.address, 0)}>
								Approve
							</Button>
						</Sider>
						<Content>Content</Content>
					</Layout>
					<Footer>Footer</Footer>
				</Layout>
			</QueryClientProvider>
		</ClientWrap>
	);
};

export default Home;
