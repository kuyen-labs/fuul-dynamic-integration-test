"use client";

import { useEffect } from "react";
import { DynamicWidget, useDynamicContext } from "../lib/dynamic";
import { Fuul } from "@fuul/sdk";
import { handleError } from "./utils";

export default function Home() {
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    Fuul.init({
      apiKey: process.env.NEXT_PUBLIC_FUUL_API_KEY as string,
    });
  }, []);

  const handleSendConnectWallet = async () => {
    if (!primaryWallet) {
      alert("No wallet connected");
      return;
    }

    try {
      await Fuul.sendConnectWallet({
        address: primaryWallet.address,
        message: localStorage.getItem("messageToSign") as string,
        signature: localStorage.getItem("signedMessage") as string,
      });
      alert("Connect wallet event was sent successfully!");
    } catch (error) {
      handleError(error);
    }
  };

  const handleSendPageview = async () => {
    try {
      await Fuul.sendPageview("home");
      alert("Pageview event was sent successfully!");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 text-center">
      <div>
        <h1 className="text-2xl font-bold">
          {"Fuul <> Dynamic integration showcase"}
        </h1>
        {!primaryWallet && (
          <p className="text-neutral-400">
            Connect your wallet and sign the message to send connect wallet
            event
          </p>
        )}
      </div>
      <DynamicWidget />
      <div className="container">
        <div className="flex gap-4 justify-center">
          <button className="btn" onClick={handleSendPageview}>
            Send pageview event
          </button>
          {primaryWallet && (
            <button className="btn" onClick={handleSendConnectWallet}>
              Send connect wallet event
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

