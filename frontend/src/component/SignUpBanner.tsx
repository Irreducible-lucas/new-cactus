import React from "react";
import { Link } from "react-router-dom";

const SignUpBanner: React.FC = () => {
  return (
    <section className="relative bg-yellow-100 py-12 pb-20 text-center overflow-hidden">
      {/* Decorative emojis/icons */}
      <div className="absolute lg:left-10 lg:top-10 top-4 left-4  text-5xl z-10">
        😊
      </div>
      <div className="absolute lg:right-10 lg:top-12 bottom-10 right-4 text-3xl z-10">
        ✨
      </div>

      {/* Text content */}
      <h2 className="text-2xl font-bold text-[#0c0745] mb-4 z-10 relative">
        Sign up.
      </h2>
      <p className="text-xl text-[#0c0745] mb-8 z-10 relative">
        Unlock exclusive deals just by signing up!
      </p>

      {/* Styled link as button */}
      <Link
        to="/sign-up"
        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-full transition duration-300 z-10 relative"
      >
        Sign Up Free
      </Link>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 w-full z-0">
        <svg
          className="w-full h-[100px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffb066"
            d="M0,224L48,213.3C96,203,192,181,288,165.3C384,149,480,139,576,154.7C672,171,768,213,864,213.3C960,213,1056,171,1152,154.7C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default SignUpBanner;
