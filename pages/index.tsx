import type { NextPage } from 'next';
import { Layout } from 'antd';
import styles from '../styles/Home.module.scss';

import ClientWrap from '../src/components/ClientWrap';
import Header from '../src/components/Header';

const { Footer, Sider, Content } = Layout;

const Home: NextPage = () => {
	return (
		<ClientWrap>
			<Layout className={styles.layout}>
				<Header />
				<Layout>
					<Sider>Sider</Sider>
					<Content>Content</Content>
				</Layout>
				<Footer>Footer</Footer>
			</Layout>
		</ClientWrap>
	);
};

export default Home;
