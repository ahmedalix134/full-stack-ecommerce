import Link from "next/link";

const contact = () => {
  return (
    <div className="h-[100vh] bg-gray-200 flex flex-col items-center gap-10 pb-3">
      <div className="contact-hero bg-no-repeat bg-cover  h-[50%]  flex text-white items-center w-full justify-center">
        <h1 className="text-5xl font-bold">Contact Us</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-[30%] max-sm:w-[95%] max-md:w-[95%]  p-3 rounded-2xl gap-5 shadow bg-white">
        <h1 className="border-b border-solid w-full text-center pb-2">
          Let’s Talk
        </h1>
        <div className="form flex flex-col gap-5 w-full max-w-md">
          <div className="email flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="border border-solid rounded px-2 py-1"
            />
          </div>
          <div className="message flex flex-col gap-2">
            <label htmlFor="message">Your Message</label>
            <input
              type="text"
              name="message"
              className="border border-solid rounded px-2 py-1"
            />
          </div>
          <Link
            href={"/"}
            className="bg-black text-white text-center py-1 rounded-2xl"
          >
            {" "}
            Send
          </Link>
        </div>
      </div>
    </div>
  );
};

export default contact;
