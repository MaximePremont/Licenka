import Image from "next/image";
import DefaultLayout from "../modules/layout";

const PageNotFound = () => {
  return (
    <div className="space-l-2">
      <section className="flex">
        <div className="ml-32 mt-48 w-3/5 container flex flex-col space-y-4">
          <h1 className="text-primary">404</h1>
          <h1>Error page not found.</h1>
        </div>
        <Image
          className="w-2/5"
          src="/joker.svg"
          width={652}
          height={877}
          alt="logo"
        />
      </section>
    </div>
  );
};

PageNotFound.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default PageNotFound;
