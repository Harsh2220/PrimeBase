import { Avatar, Name } from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";

export default function Navbar() {
  return (
    <nav className="container mx-auto flex justify-between items-center py-2">
      <a href="/">
        <img
          className="img-fluid"
          src="https://shuffle.dev/flaro-assets/logos/flaro-logo-black.svg"
          alt=""
        />
      </a>
      <Wallet>
        <ConnectWallet>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <WalletDropdownLink icon="wallet" href="https://wallet.coinbase.com">
            Go to Wallet Dashboard
          </WalletDropdownLink>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </nav>
  );
}
