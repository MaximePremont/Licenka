import Image from "next/image";
import DefaultLayout from "../modules/layout";
import { useRouter } from "next/router";
import MainButton from "../components/MainButton";

import dynamic from "next/dynamic";
const Animator = dynamic(
  import("react-scroll-motion").then((it) => it.Animator),
  { ssr: false }
);

import {
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  MoveIn,
} from "react-scroll-motion";
const ZoomInScrollOut = batch(FadeIn(), MoveIn(-800));
const FadeUp = batch(Fade(), MoveIn(800));

const ApprovePage = () => {
  const router = useRouter();

  const navigateCreate = () => {
    router.push("/create");
  };

  return (
    <div className="bg-background ">
      <div className="absolute top-6 right-12">
        <MainButton
          callback={navigateCreate}
          label="Create license"
          iconSrc="/arrow_forward.svg"
        />
      </div>
      <ScrollContainer>
        <ScrollPage>
          <Animator animation={batch(Fade())}>
            <div className="py-32 ml-32 flex justify-between">
              <div className="mt-32 w-3/5 container flex">
                <h1>
                  Create <span className="text-primary">your</span> license the{" "}
                  <span className="text-primary">secure</span> way
                </h1>
              </div>
              <Image src="/secure5.png" width={920} height={480} alt="logo" />
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={batch(FadeUp)}>
            <div className="mt-64 pb-32 flex justify-center space-x-16">
              <Image
                src="/computer.svg"
                width={475}
                height={483}
                alt="logo"
                className="w-2/5 mr-12"
              />
              <div className="mt-12 w-2/5 container">
                <h1>
                  Our <span className="text-primary">mission</span>
                </h1>
                <p>
                  Enable companies to deliver trusted licenses that are truly
                  owned by their users.
                </p>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator animation={batch(ZoomInScrollOut)} center>
            <div className="mt-64 bg-background flex justify-center space-x-32">
              <div className="p-16 w-2/6 shadow-lg shadow-blue-500/50 space-y-4 rounded-xl bg-background">
                <h1 className="text-5xl">As a company</h1>
                <p className="text-xl">
                  No matter the size of your project, Licenka will allow you to
                  manage your users and the sale of your licenses for only 3% of
                  costs.
                </p>
              </div>
              <div className="p-16 w-2/6 shadow-lg shadow-blue-500/50 space-y-4 rounded-xl bg-background">
                <h1 className="text-5xl">As a User</h1>
                <p className="text-xl">
                  Own your own license, and take advantage of the security
                  offered by the blockchain.
                </p>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        <Animator animation={batch(FadeIn())}>
          <div className="py-4 h-max space-y-16">
            <h1 className="text-primary text-center">Roadmap</h1>
            <div className="mx-32 grid grid-cols-2 place-content-center gap-x-32 gap-y-16">
              <div className="flex justify-end">
                <div className="p-16 w-4/6 shadow-xl shadow-blue-500/50 space-y-4 rounded-xl bg-background">
                  <h1 className="text-5xl">1. Create</h1>
                  <p className="text-xl">
                    Very easily create your own license on the blockchain with
                    the button at the top of this page.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <Image
                  src="/card_arrow_right.svg"
                  width={475}
                  height={483}
                  alt="logo"
                  className="w-2/5"
                />
              </div>
              <div className="flex justify-end">
                <Image
                  src="/card_arrow_left.svg"
                  width={475}
                  height={483}
                  alt="logo"
                  className="w-2/5"
                />
              </div>
              <div className="p-16 w-4/6 shadow-xl shadow-blue-500/50 space-y-4 rounded-xl bg-background">
                <h1 className="text-5xl">2. Buy</h1>
                <p className="text-xl">
                  Buy or sell licenses extremely easily via a web interface
                  integrating Metamask and Ledger compatible.
                </p>
              </div>
              <div className="flex justify-end">
                <div className="p-16 w-4/6 shadow-xl shadow-blue-500/50 space-y-4 rounded-xl bg-background">
                  <h1 className="text-5xl">Use</h1>
                  <p className="text-xl">
                    Take advantage of your license or have your product taken
                    advantage of everywhere, no matter if your platform is in
                    Web2 or Web3.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Animator>
      </ScrollContainer>
    </div>
  );
};

ApprovePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ApprovePage;
