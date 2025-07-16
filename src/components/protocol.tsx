export default function Protocol() {
  return (
    <div className="group relative">
      <div className="absolute -inset-0.5 rounded-sm bg-gradient-to-r from-blue-500 to-blue-600 opacity-30 blur transition duration-500 group-hover:opacity-50"></div>
      <div className="relative aspect-square overflow-hidden rounded-sm border border-white/20 bg-gray-900 shadow-2xl transition-all duration-500 hover:shadow-blue-500/10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
          //   style="background-image:url(/images/landing/global.jpeg)"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">Global Connection</h3>
            <div className="h-0.5 w-16 bg-blue-400"></div>
            <p className="text-sm leading-relaxed text-blue-100">
              Shared, immutable records of credentials and achievements across the entire network, enabling{" "}
              <strong className="text-white">universal verification</strong> and trust.
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-blue-900/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      </div>
    </div>
  );
}
