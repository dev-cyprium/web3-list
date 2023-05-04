'use client';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Button, Web3Modal } from '@web3modal/react';
import {
  WagmiConfig,
  configureChains,
  createClient,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { sepolia } from 'wagmi/chains';
import whiteListAbi from '../lib/abi/whitelist.json';
import NoSSR from './NoSSR';

const chains = [sepolia];
const PROJECT_ID = '2b096cdb53fee5603c4650b2dd51ecfc';

const { provider } = configureChains(chains, [
  w3mProvider({ projectId: PROJECT_ID }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, projectId: PROJECT_ID, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

export function Web3() {
  return (
    <NoSSR>
      <Web3Wrapper>
        <Web3Info />
      </Web3Wrapper>
    </NoSSR>
  );
}

type Web3WrapperProps = {
  children: React.ReactNode;
};
export function Web3Wrapper({ children }: Web3WrapperProps) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>

      <Web3Modal projectId={PROJECT_ID} ethereumClient={ethereumClient} />
    </>
  );
}

const WHITELIST_CONTRACT_ADDRESS = '0x52DD1eeb29a715D5D3d8AfC803bc6aC64Af50373';
export function Web3Info() {
  const { isConnected, address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: WHITELIST_CONTRACT_ADDRESS,
    abi: whiteListAbi,
    functionName: 'addAddressToWhitelist',
  });
  const { write } = useContractWrite(config);
  const { data, isLoading } = useContractRead({
    address: WHITELIST_CONTRACT_ADDRESS,
    abi: whiteListAbi,
    functionName: 'numAddressesWhitelisted',
    watch: true,
    enabled: !!isConnected,
  });

  return (
    <>
      <div className="py-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <p>Whitelisted addresses: {data as number}</p>
        )}
      </div>
      <div className="py-4 flex items-center space-x-2">
        <Web3Button />
        {isConnected && (
          <button
            className="bg-blue-500 rounded-xl px-4 py-2 text-white"
            onClick={() => write?.()}
          >
            Join the whitelist
          </button>
        )}
      </div>
    </>
  );
}
