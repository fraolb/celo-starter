"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getBalance } from "@wagmi/core";
import { config } from "@/config";
import { GetBalanceReturnType } from "@wagmi/core";
import { formatEther } from "viem";

import Main from "@/components/Tabs/Main";
import Lock from "@/components/Tabs/Lock";
import Swap from "@/components/Tabs/Swap";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const [balances, setBalances] = useState<Array<GetBalanceReturnType | null>>(
    []
  );
  const [celoAddress, setCeloAddress] = useState([]);

  if (typeof window !== "undefined") {
    // @ts-ignore
    window.Browser = {
      T: () => {},
    };
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  console.log(celoAddress);

  return (
    <div className="flex flex-col justify-center items-center">
      {isConnected ? (
        <div className="h2 text-center">
          <div className="max-w-3xl mx-auto">
            <Tabs>
              <TabList>
                <Tab>Home</Tab>
                <Tab>Swap</Tab>
                <Tab>Lock</Tab>
              </TabList>

              <TabPanel>
                <Main />
              </TabPanel>
              <TabPanel>
                <Swap />
              </TabPanel>
              <TabPanel>
                <Lock />
              </TabPanel>
            </Tabs>
          </div>
          <div>Hello this is Fraol</div>

          <div></div>
        </div>
      ) : (
        <div>No Wallet Connected</div>
      )}
    </div>
  );
}
