const about = () => {
  return (
    <div className="h-[100vh] bg-gray-200 flex flex-col items-center gap-10 pb-3">
      <div className="about-hero bg-no-repeat bg-cover  h-[50%] bg-gray-700 flex text-white items-center w-full justify-center">
        <h1 className="text-5xl font-bold">About Us</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-[90%]   p-3 rounded-2xl gap-5 shadow bg-white">
        <p>
          Welcome to Fashion , your go-to destination for trendy, high-quality
          clothing and lifestyle essentials. We believe that fashion should be
          accessible, stylish, and comfortable for everyone. That&apos;s why we
          offer a wide range of products for men, women, and kids — from
          everyday basics to standout statement pieces. Our mission is to make
          your shopping experience easy, enjoyable, and inspiring. We carefully
          select each item to ensure quality, affordability, and the latest
          styles. Thank you for choosing us — we're excited to be part of your
          style journey!
        </p>
      </div>
    </div>
  );
};

export default about;
