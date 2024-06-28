import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import { useAccount, useChainId, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { zoraSepolia } from "wagmi/chains";

function AccountConnect() {
  const account = useAccount();
  const { status } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain()
  return (
    <div
      className="flex flex-grow"
      {...(status === 'pending' && {
        'aria-hidden': true,
        style: {
          opacity: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        },
      })}
    >
      {(() => {
        if (account.status === 'disconnected') {
          return <ConnectAccount />;
        }

        if (account.status === 'connected' && chainId !== zoraSepolia.id) {
          return (
            <button onClick={() => switchChain({
              chainId: 999999999,
            })} type="button">
              Wrong network
            </button>
          );
        }

        return (
          <>
            <div className="flex flex-col">{account.address}
              <button onClick={() => { disconnect() }}>Disconnect</button>
            </div>
          </>
        );
      })()}
    </div>
  );
}

export default AccountConnect;
