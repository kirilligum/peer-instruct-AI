import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LightSmartContractAccount } from '@alchemy/aa-accounts';
import { AlchemyProvider } from '@alchemy/aa-alchemy';
import { WalletClientSigner } from '@alchemy/aa-core';
import { createWalletClient, custom } from 'viem';
import { sepolia } from 'viem/chains';

import { useWallets } from '@privy-io/react-auth';

// Find the embedded wallet and get its EIP1193 provider
function App() {
  const [count, setCount] = useState(0)
  const { wallets } = useWallets();
  // The code below makes use of Privy's React hooks. You must paste
  // or use it within a React Component or Context.

  // Find the user's embedded wallet
  useEffect(() => {
    const initWallet = async () => {
      const { wallets } = useWallets();
      const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');

      // Get a viem client from the embedded wallet
      const eip1193provider = await embeddedWallet.getEthereumProvider();
      const privyClient = createWalletClient({
        account: embeddedWallet.address,
        chain: sepolia,
        transport: custom(eip1193provider),
      });

      // Create a smart account signer from the embedded wallet's viem client
      const privySigner = new WalletClientSigner(privyClient, 'json-rpc');

      // Create an Alchemy Provider with the smart account signer
      const provider = new AlchemyProvider({
        apiKey: 'insert-your-alchemy-api-key',
        chain: sepolia,
        entryPointAddress: '0x...',
      }).connect(
        (rpcClient) =>
          new LightSmartContractAccount({
            entryPointAddress: '0x...',
            chain: rpcClient.chain,
            owner: privySigner,
            factoryAddress: getDefaultLightAccountFactory(rpcClient.chain),
            rpcClient,
          }),
      );
    };

    initWallet();
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
