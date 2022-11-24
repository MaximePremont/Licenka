import Image from "next/image";
import DefaultLayout from "../modules/layout";

const ApprovePage = () => {
  return (
    <div className="bg-background ">
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
<<<<<<< HEAD
        <img
=======
        <Image
>>>>>>> master
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
<<<<<<< HEAD
          <img
=======
          <Image
>>>>>>> master
            src="/card_arrow_right.svg"
            width={475}
            height={483}
            alt="logo"
            className="w-2/5"
          />
<<<<<<< HEAD
          <img
=======
          <Image
>>>>>>> master
            src="/card_arrow_left.svg"
            width={475}
            height={483}
            alt="logo"
            className="w-2/5"
          />
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

// /* Frame 9 */

// /* Auto layout */
// display: flex;
// flex-direction: column;
// align-items: flex-start;
// padding: 32px 64px;
// gap: 22px;

// width: 510px;
// height: 439px;

// /* Bckground */
// background: #0C0026;
// box-shadow: 0px 8px 32px rgba(255, 255, 255, 0.16);
// border-radius: 20px;

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;

// /* Entreprise */

// width: 381px;
// height: 101px;

// font-family: 'Cabinet Grotesk';
// font-style: normal;
// font-weight: 700;
// font-size: 81.6px;
// line-height: 101px;

// /* Rad */
// background: radial-gradient(147.73% 1160.43% at 29.52% -21.59%, #FF0E0E 0%, #AD00FF 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
// -webkit-background-clip: text;
// -webkit-text-fill-color: transparent;
// background-clip: text;
// text-fill-color: transparent;

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;

// /* Lorem ipsum dolor sit amet consectetur. Ornare neque faucibus dolor duis est senectus a condimentum mi. */

// width: 382px;
// height: 252px;

// font-family: 'Roboto';
// font-style: normal;
// font-weight: 400;
// font-size: 36px;
// line-height: 42px;

// color: #FFFFFF;

// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 0;
