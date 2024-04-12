"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getBalance } from "@wagmi/core";
import { config } from "@/config";
import { GetBalanceReturnType } from "@wagmi/core";
import { formatEther } from "viem";
import dynamic from "next/dynamic";

import "@uniswap/widgets/fonts.css";
const SwapWidget = dynamic(
  async () => {
    const res = await import("@uniswap/widgets");
    return res.SwapWidget;
  },
  { ssr: false }
);

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const [balances, setBalances] = useState<Array<GetBalanceReturnType | null>>(
    []
  );

  if (typeof window !== "undefined") {
    // @ts-ignore
    window.Browser = {
      T: () => {},
    };
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchBalances = async () => {
      if (isConnected && address) {
        setUserAddress(address);

        // Fetch the balance of the native token
        const nativeTokenBalance = await getBalance(config, {
          address: address,
        });

        // Fetch balances of other tokens
        // const tokenAddresses = [
        //   "10c892a6ec43a53e45d0b916b4b7d383b1b78c0f",
        //   "E4D517785D091D3c54818832dB6094bcc2744545",
        // ];
        const tokenAddresses = [
          "765DE816845861e75A25fCA122bb6898B8B1282a",
          "2cFD4B2827f35624ae12C858dA969E16D5d730a2",
          "a435d2BaBDF80A66eD06A8D981edFE6f5DdAeCfB",
          "D629eb00dEced2a080B7EC630eF6aC117e614f1b",
          "2DEf4285787d58a2f811AF24755A8150622f4361",
        ];
        const otherTokenBalances = await Promise.all(
          tokenAddresses.map(async (tokenAddress) => {
            const formattedTokenAddress = `0x${tokenAddress}`;
            const balance = await getBalance(config, {
              address: address,
              token: formattedTokenAddress,
            });
            return balance;
          })
        );

        // Update the state with all balances combined
        setBalances([nativeTokenBalance, ...otherTokenBalances]);
      }
    };

    fetchBalances();
  }, [address, isConnected]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h1">
        There you go... a canvas for your next Celo project!
      </div>
      {isConnected ? (
        <div className="h2 text-center">
          <div>Hello this is Fraol</div>
          Your address: {userAddress}
          {balances.map((balance, index) => (
            <div key={index}>
              {balance && (
                <div>
                  Your balance of {balance.symbol}: {formatEther(balance.value)}
                </div>
              )}
            </div>
          ))}
          <div>
            <SwapWidget />
          </div>
        </div>
      ) : (
        <div>No Wallet Connected</div>
      )}
    </div>
  );
}
