import Image from "next/image";
import DefaultLayout from "../modules/layout";
import MainButton from "../components/MainButton";

const CreatePage = () => {
  return (
    <div>
      <section className="flex">
        <div className="ml-32 mt-32 w-3/5 container flex flex-col space-y-4">
          <h1>
            Create <span className="text-primary">your </span> license, the way{" "}
            <span className="text-primary">you</span> want it license
          </h1>
        </div>
        <Image src="/shine.svg" width={475} height={483} alt="logo" />
      </section>
      <section className="mx-32 py-4">
        <div className="flex justify-between">
          <div className="w-3/5 container flex flex-col space-y-8">
            <input
              type="text"
              id="name"
              class="bg-background border border-gray-300 rounded-lg  p-2.5 h-16 w-3/4"
              placeholder="License name"
            />
            <input
              type="text"
              id="address"
              class="bg-background border border-gray-300 rounded-lg  p-2.5 h-16 w-3/4"
              placeholder="Wallet address"
            />
            <input
              type="number"
              min="0"
              id="price"
              class="bg-background border border-gray-300 rounded-lg  p-2.5 h-16 w-3/4"
              placeholder="Price in BUSD"
            />
            <div className="flex w-3/4 justify-between">
              <input
                type="radio"
                id="forever"
                name="validity"
                value="forever"
                class="hidden peer"
                required
              />
              <label
                for="forever"
                className="inline-flex justify-between items-center h-16 p-5 text-gray-500 bg-gray-400 rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:peer-checked:text-blue-500 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white hover:text-white hover:bg-primary"
              >
                <div class="block">
                  <div class="w-full">Forever</div>
                </div>
              </label>
              <input
                type="radio"
                id="limited"
                name="validity"
                value="limited"
                className="hidden peer"
              />
              <label
                for="limited"
                class="inline-flex justify-between items-center h-16 p-5 text-gray-500 bg-gray-400 rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:peer-checked:text-blue-500 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white hover:text-white hover:bg-primary"
              >
                <div className="block">
                  <div className="w-full">Limited</div>
                </div>
              </label>
              <input
                type="number"
                min="0"
                id="price"
                className="bg-background border border-gray-300 rounded-lg  p-2.5 h-16"
                placeholder="Price in BUSD"
              />
            </div>
          </div>
          <div className="flex flex-col-reverse">
            <MainButton label="Create" iconSrc={"/add_icon.svg"}></MainButton>
          </div>
        </div>
      </section>
      <section className="flex">
        <div className="ml-32 mt-32 w-3/5 container flex flex-col space-y-4">
          <h1>
            <span className="text-primary">How </span> to create a license ? 🪄
          </h1>
          <div className="ml-8">
            <p>
              <span className="text-primary">1. </span>Choose a name to give to
              your product’s license.
            </p>
            <p>
              <span className="text-primary">2. </span>Enter the wallet’s
              address to which the money will be send.
            </p>
            <p>
              <span className="text-primary">3. </span>Select the price of your
              license (can be free).
            </p>
            <p>
              <span className="text-primary">4. </span>Choose how long is your
              license valid
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="ml-32 mt-32 w-1/2 container flex flex-col space-y-4">
          <h1>
            And <span className="text-primary">tada </span> your license has
            been created 🎩
          </h1>
        </div>
      </section>
    </div>
  );
};

CreatePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default CreatePage;
