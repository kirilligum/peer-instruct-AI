import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrivyProvider } from '@privy-io/react-auth';
import { sepolia } from 'viem/chains'
import App from './App.jsx'
import eyeIcon from './iconeye.png';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        /* Replace this with your desired login methods */
        loginMethods: ['email', 'wallet'],
        /* Replace this with your desired appearance configuration */
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: eyeIcon,
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          noPromptOnSignature: true
        },
        // Import your desired chain from `viem/chains` and pass it to `defaultChain`
        defaultChain: sepolia,
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>,
);
