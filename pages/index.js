import Image from "next/image";
import DefaultLayout from "../modules/layout";
import { useRouter } from "next/router";
import MainButton from "../components/MainButton";

const ApprovePage = () => {
  const router = useRouter();

  const navigateCreate = () => {
    router.push("/create");
  };

  return (
    <div className="bg-background ">
      <div className="flex justify-end mr-16">
        <MainButton
          callback={navigateCreate}
          label="Create license"
          iconSrc="/arrow_forward.svg"
        />
      </div>
      <section className="mx-32 flex justify-between">
        <div className="mt-32 w-2/5 container flex">
          <h1>
            Create <span className="text-primary">your</span> license the{" "}
            <span className="text-primary">secure</span> way
          </h1>
        </div>
        <Image
          src="/lock.svg"
          width={475}
          height={483}
          alt="logo"
          className="w-2/5"
        />
      </section>
      <section className="ml-32 flex justify-between">
        <div className="mt-32 w-2/5 container">
          <h1>
            Our <span className="text-primary">mission</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur. Ornare neque faucibus dolor
            duis est senectus a condimentum mi. Fringilla id sed leo risus ut
            sollicitudin tempus.
          </p>
        </div>
        <Image
          src="/computer.svg"
          width={475}
          height={483}
          alt="logo"
          className="w-2/5"
        />
      </section>
      <section className="h-96 py-16 bg-background flex justify-center space-x-32">
        <div className="p-4 shadow-lg shadow-blue-500/50 space-y-4 rounded-xl bg-background w-96 h-64">
          <p>Entreprise</p>
          <p className="text-sm">lorem ipsum</p>
        </div>
        <div className="p-4 shadow-lg shadow-blue-500/50 space-y-4 rounded-xl bg-background w-96 h-64">
          <p>Entreprise</p>
          <p className="text-sm">lorem ipsum</p>
        </div>
      </section>
      <section className="py-4 space-y-32">
        <h1 className="text-primary text-center">Roadmap</h1>
        <div className="mx-32 grid grid-cols-2 place-content-center gap-32">
          <div className="p-4 shadow-lg shadow-blue-500/50 space-y-4 rounded-xl bg-background w-full h-64">
            <p>Entreprise</p>
            <p className="text-sm">lorem ipsum</p>
          </div>
          <Image
            src="/card_arrow_right.svg"
            width={475}
            height={483}
            alt="logo"
            className="w-2/5"
          />
          <div className="flex justify-end">
            <Image
              src="/card_arrow_left.svg"
              width={475}
              height={483}
              alt="logo"
              className="w-2/5"
            />
          </div>
          <div className="p-4 shadow-lg shadow-blue-500/50 space-y-4 rounded-xl bg-background w-full h-64">
            <p>Entreprise</p>
            <p className="text-sm">lorem ipsum</p>
          </div>
          <div className="p-4 shadow-lg shadow-blue-500/50 space-y-4 rounded-xl bg-background w-full h-64">
            <p>Entreprise</p>
            <p className="text-sm">lorem ipsum</p>
          </div>
        </div>
      </section>
    </div>
  );
};

ApprovePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ApprovePage;
