import { FaExchangeAlt } from "react-icons/fa";
import { AiFillCustomerService } from "react-icons/ai";
import { MdOutlinePolicy } from "react-icons/md";

const Policy = () => {
  return (
    <div className=" flex justify-evenly flex-wrap py-3 items-center">
      <div className="box flex flex-col p-3  items-center  ">
        <FaExchangeAlt className="mb-5 text-4xl" />
        <h4 className="font-semibold">Easy Exchange Policy</h4>
        <p className="text-gray-600 text-sm">We Offer Hassle Exchange Policy</p>
      </div>
      <div className="box flex flex-col p-3  items-center  ">
        <MdOutlinePolicy className="mb-5 text-4xl" />
        <h4 className="font-semibold">7 Days Return Policy</h4>
        <p className="text-gray-600 text-sm">We Provide 7 Days Return Policy</p>
      </div>
      <div className="box flex flex-col p-3  items-center  ">
        <AiFillCustomerService className="mb-5 text-4xl" />
        <h4 className="font-semibold">Best Customer Support</h4>
        <p className="text-gray-600 text-sm">
          We Provide 24 Hours Customer Support
        </p>
      </div>
    </div>
  );
};

export default Policy;
