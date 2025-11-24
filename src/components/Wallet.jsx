import { useWallet } from "../hooks/useWallet";

export default function Wallet() {
  const { data, isLoading, error } = useWallet();

  // Loading state
  if (isLoading) {
    return (
      <section className="bg-white min-h-[280px] lg:min-h-[359px] p-2">
        <div className="h-[260px] max-w-[354px] mx-auto rounded-2xl bg-gray-100 animate-pulse" />
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-white p-2 min-h-[280px] lg:min-h-[359px] flex items-center justify-center text-red-500">
        Failed to load wallet.
      </section>
    );
  }

  const card = data?.data?.cards?.[0];

  if (!card) return null;

  return (
    <section className="bg-white min-h-[280px] lg:min-h-[359px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Wallet</h2>
        <button className="text-gray-500 hover:text-gray-700 text-xl">
          •••
        </button>
      </div>

      <div className="relative w-full mx-auto h-[260px] max-w-[354px]">
        {/* Black card */}
        <div
          className="
            rounded-2xl text-white px-4 sm:px-5 py-3 sm:py-4 
            absolute top-0 left-0 right-0 shadow-lg
            h-[190px]
            bg-[linear-gradient(104.3deg,#4A4A49_2.66%,#20201F_90.57%)]
          "
        >
          <img
            src="/chip.png"
            alt="chip"
            className="absolute left-6 ml-1 top-2/6 w-8"
          />
          <img
            src="/wifi.png"
            alt="wifi"
            className="absolute right-6 top-2/6 w-8"
          />

          <p className="text-base text-white font-bold ml-2">
            {card.bank.split("|")[0]}
            <span className="font-extralight text-gray-500 text-base mx-1">
              |
            </span>
            <span className="font-base text-gray-500 text-xs">
              {card.bank.split("|")[1]}
            </span>
          </p>

          <div className="mt-15 sm:mt-17 ml-2">
            <p className="tracking-wider sm:tracking-widest text-base sm:text-lg font-mono">
              {card.cardNumber}
            </p>
          </div>
        </div>

        {/* Blur white card */}
        <div
          className="
          absolute left-0 right-0 mx-auto
          rounded-2xl backdrop-blur-sm bg-white/20 
          shadow-xl px-4 sm:px-5 py-2 sm:py-3
          max-w-[324px] h-[170px] top-[140px] w-[calc(100%-30px)]
        "
        >
          <img
            src="/chip.png"
            alt="chip"
            className="absolute left-5 top-2/6 w-7"
          />
          <img
            src="/wifi.png"
            alt="wifi"
            className="absolute right-5 top-2/6 w-7"
          />

          <p className="text-base text-white font-bold">
            {card.bank.split("|")[0]}
            <span className="font-extralight text-base mx-1">|</span>
            <span className="font-extralight text-xs">
              {card.bank.split("|")[1]}
            </span>
          </p>

          <div className="mt-17 flex items-center justify-between">
            <div>
              <p className="tracking-wider text-lg font-mono text-gray-900">
                {card.cardNumber.replace(/\s/g, "").slice(0, -8) + "****"}
              </p>
              <p className="text-sm font-mono text-gray-400 mt-1">
                {String(card.expiryMonth).padStart(2, "0")}/
                {String(card.expiryYear).slice(-2)}
              </p>
            </div>

            <div className="px-1 bg-violet-950 rounded-md mt-4">
              <span className="text-xs font-bold text-white uppercase">
                {card.network}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
