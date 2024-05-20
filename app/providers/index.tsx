"use client";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
        walletConnectors: [EthereumWalletConnectors],
        events: {
          onSignedMessage: ({ messageToSign, signedMessage }) => {
            // We need to store this because fuul sdk needs it to send the connect wallet event along with the address that signed the message
            localStorage.setItem("signedMessage", signedMessage);
            localStorage.setItem("messageToSign", messageToSign);
          },
        },
      }}
    >
      {children}
    </DynamicContextProvider>
  );
};
