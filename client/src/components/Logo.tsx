export const KromaLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center select-none ${className}`}
    >
      <div className="relative text-2xl md:text-4xl font-black tracking-tighter">
        {/* Couche rouge -----------------------------------------------*/}
        <span
          className="absolute inset-0 text-red-500 opacity-70 mix-blend-screen"
          style={{ transform: "translate(-3px, -2px)" }}
          aria-hidden="true"
        >
          KROMA
        </span>

        {/* Couche bleue -------------------------------------------------- */}
        <span
          className="absolute inset-0 text-blue-500 opacity-70 mix-blend-screen"
          style={{ transform: "translate(3px, 2px)" }}
          aria-hidden="true"
        >
          KROMA
        </span>

        {/* Couche blanche -----------------------------------------------*/}
        <span className="relative z-10 text-white">KROMA</span>
      </div>
    </div>
  );
};
