import React from 'react';
import {
	useAccount,
	useConnect,
	useDisconnect,
	useProvider,
	chain,
	useBalance,
} from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

import { Layout, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { formatAddress } from '../utils';

const connector = new MetaMaskConnector({ chains: [chain.rinkeby] });

const Header = () => {
	const { address, isConnected } = useAccount();
	const { connect, error, isLoading, pendingConnector } = useConnect({
		chainId: chain.rinkeby.id,
	});
	const { disconnect } = useDisconnect();

	const items: MenuProps['items'] = [
		{
			label: <Button onClick={() => disconnect()}>Disconnect</Button>,
			key: '0',
		},
	];

	const balance = useBalance({
		addressOrName: address,
	});

	return (
		<Layout.Header>
			{isConnected ? (
				<Dropdown menu={{ items }} trigger={['click']}>
					<Button>
						{formatAddress(address as string)}

						{` (${balance.data?.formatted} ETH)`}
					</Button>
				</Dropdown>
			) : (
				<Button onClick={() => connect({ connector })}>
					Connect Wallet
					{isLoading &&
						connector.id === pendingConnector?.id &&
						' (connecting...)'}
				</Button>
			)}
			{error && <div>{error.message}</div>}
		</Layout.Header>
	);
};

export default Header;
