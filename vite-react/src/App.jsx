import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useWallets } from '@privy-io/react-auth';
import { sepolia } from 'viem/chains';
import { createWalletClient, custom } from 'viem';
import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core";


// Find the embedded wallet and get its EIP1193 provider
function App() {
  const [count, setCount] = useState(0)
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find((wallet) => (wallet.walletClientType === 'privy'));
  let eip1193provider, privyClient;
  if (embeddedWallet) {
    eip1193provider = embeddedWallet.getEthereumProvider();

    // Create a viem WalletClient from the embedded wallet's EIP1193 provider
    privyClient = createWalletClient({
      account: embeddedWallet.address,
      chain: sepolia,
      transport: custom(eip1193provider)
    });

    // Create an AccountKit SmartAccountSigner from the embedded wallet
    const privySigner: SmartAccountSigner = new WalletClientSigner(
        privyClient,
        "json-rpc"
    );
  }

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
