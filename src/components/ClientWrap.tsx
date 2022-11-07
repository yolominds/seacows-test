import React, { ReactNode } from 'react';
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { provider, webSocketProvider } = configureChains(
	[chain.rinkeby],
	[publicProvider()]
);

const client = createClient({
	provider,
	webSocketProvider,
});

type props = { children: ReactNode };

const ClientWrap = ({ children }: props) => (
	<WagmiConfig client={client} children={children} />
);

export default ClientWrap;
