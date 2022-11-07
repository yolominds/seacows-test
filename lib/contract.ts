import pairABI from './abi/SeacowsPair.json';
import swapABI from './abi/SeacowsRouter.json';
import nftABI from './abi/TestNFT.json';

const contract = {
	pool: {
		address: '0x1c9f47f8c42c3a8be36dcbe3d49e365b8099c7df',
	},
	pair: {
		ABI: pairABI,
	},
	nft: {
		address: '0x720a1f7ae2c4f9b876852bf14089696c3ee57b1d',
		ABI: nftABI,
	},
	swap: {
		address: '0xf2B19657A9930740b97D03AC40Ed5Ce2f2678475',
		ABI: swapABI,
	},
};

export default contract;
