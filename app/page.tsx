import BestSeller from "./componenets/BestSeller";
import Hero from "./componenets/Hero";
import NewCollection from "./componenets/NewCollection";
import Offers from "./componenets/Offers";
import Policy from "./componenets/Policy";
import Subscrib from "./componenets/Subscrib";

export default function Home() {
  return (
    <div>
      <Hero />
      <NewCollection />
      <Offers />
      <BestSeller />
      <Policy />
      <Subscrib />
    </div>
  );
}
