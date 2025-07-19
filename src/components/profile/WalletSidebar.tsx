import { walletInfo } from "~/constants/profile";

export default function WalletSidebar() {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm p-6">
        <h3 className="text-lg font-bold text-white mb-4">Wallet</h3>
        <div className="space-y-4">
          <div className="text-sm text-gray-300">
            <div className="font-medium text-white mb-1">Address:</div>
            <div className="text-xs text-gray-400 break-all font-mono">
              {walletInfo.address}
            </div>
          </div>
          <div className="text-sm text-gray-300">
            <div className="font-medium text-white mb-1">Balance:</div>
            <div className="text-lg font-bold text-green-400">
              {walletInfo.balance}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 