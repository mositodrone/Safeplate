const HeroSection = () => {
  return (
    <section
      className="relative min-h-[100vh] w-full items-center"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40">
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center mt-30">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Know What You Eat.
            <br />
            <span className="text-blue-400">Before You Eat It.</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Scan barcodes, upload food labels, or search products to instantly
            understand ingredients, allergens, and safety insights.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl border border-blue-600 text-blue-400 font-semibold hover:bg-blue-700
            hover:text-white
            transition cursor-pointer">
              <a href="#scan">
                Scan a Product
              </a>
            </button>

            <button className="px-8 py-4 rounded-xl border border-red-500 text-red-400 font-semibold hover:bg-red-500 hover:text-white transition cursor-pointer">
              Upload Label
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
