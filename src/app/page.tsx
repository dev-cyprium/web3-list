import Image from 'next/image';
import imgSvg from '../assets/crypto-devs.svg';
import { Web3 } from '@/components/Web3Info';

export default function Home() {
  return (
    <>
      <div className="mt-24 max-w-5xl mx-auto flex">
        <div className="w-1/2">
          <h1 className="text-4xl font-bold">Welcome to CryptoDevs!</h1>
          <p className="text-gray-700 text-xl mt-4">
            Its an NFT collection for developers in Crypto.
          </p>
          <p className="text-gray-700 text-xl mt-4">
            This project is built by following the tutorial from{' '}
            <a
              className="text-blue-500 hover:underline"
              href="https://learnweb3.io"
              target="_blank"
            >
              LearnWeb3
            </a>
          </p>
          <Web3 />
        </div>
        <div className="flex-1">
          <Image
            className="object-contain w-full h-auto"
            src={imgSvg}
            alt="logo"
          />
        </div>
      </div>
    </>
  );
}
