const WrapperItems = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="py-5  flex flex-col items-center gap-10 ">
      <h1 className="text-3xl pb-5 font-semibold border-b border-solid ">
        {title}
      </h1>
      <div className="items grid grid-cols-4 gap-5  max-sm:grid-cols-2 max-md:grid-cols-3 ">
        {children}
      </div>
    </div>
  );
};

export default WrapperItems;
