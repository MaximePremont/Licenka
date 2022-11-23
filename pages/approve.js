import Image from "next/image";
import DefaultLayout from "../modules/layout";
import MainButton from "../components/MainButton";

const ApprovePage = () => {
  return (
    <div className="space-l-2">
      <section className="flex">
        <div className="ml-32 mt-48 w-3/5 container flex flex-col space-y-4">
          <h1>
            Get <span className="text-primary">minecraft's</span> license
          </h1>
          <h1>
            for <span className="text-primary">19.99</span> BUSD,
          </h1>
          <h1>
            <span className="text-primary">forever</span>.
          </h1>
          <p>
            By clicking on “get license” you agree to have transaction between
            you and the license’s provider
          </p>
        </div>
        <Image
          className="w-2/5"
          src="/joker.svg"
          width={652}
          height={877}
          alt="logo"
        />
      </section>
      <section className="mx-32 py-4">
        <p className="py-4">Set a password to access your licenses</p>
        <div className="flex justify-between">
          <div className="container flex justify-between py-4">
            <input
              type="password"
              id="first_name"
              class="bg-background border border-gray-300 rounded-lg  p-2.5 w-1/2"
              placeholder="Password"
            />
            <MainButton label="Set password"></MainButton>
          </div>
          <div className="container flex justify-end py-4">
            <MainButton label="Get license" iconSrc={"/add_icon.svg"}></MainButton>
          </div>
        </div>
      </section>
    </div>
  );
};

ApprovePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ApprovePage;
