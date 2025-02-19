import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { ReadNFT } from '../components/ReadNFT';

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Kairos-loan Recruitment Test</title>
                <meta name="recruitment tests for kairos-loan from Baptiste M." />
            </Head>

            <main className={styles.main}>
                <div className={styles.connectButton}>
                    <ConnectButton />
                </div>
                <h1 className={styles.title}>
                    Welcome to <span style={{ color: '#041cb4' }}>Kairos-loan</span> Full Stack Engineer recruitment
                    test
                </h1>
                <ReadNFT />
            </main>
        </div>
    );
};

export default Home;
