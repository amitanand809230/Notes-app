const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* LEFT */}
        <p className="text-sm text-gray-500 text-center md:text-left">
          © {new Date().getFullYear()} Notes Manager. All rights reserved.
        </p>

        {/* CENTER — YOUR BRAND */}
        <p className="text-sm text-gray-700 text-center font-medium">
          Amit Anand — React Frontend Developer
        </p>

        {/* RIGHT — OPTIONAL LINKS */}
        <div className="flex items-center gap-4 text-sm">
          <a
            href="https://github.com/amitanand809230"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/amitanand809230"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-800 transition"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
