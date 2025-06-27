const AnimatedLogo = () => {
  return (
    <>
      <span className="text-2xl sm:text-3xl font-bold uppercase bg-gradient-to-r from-blue-500 via-indigo-400 to-amber-500 bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradientMove_5s_ease-in-out_infinite]">
        Cactus
      </span>

      <style>
        {`
          @keyframes gradientMove {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
        `}
      </style>
    </>
  );
};

export default AnimatedLogo;
