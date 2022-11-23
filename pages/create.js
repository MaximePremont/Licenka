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
          <div className="flex">
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
              class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-background rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-background"
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
              class="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-background rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-background"
            >
              <div class="block">
                <div class="w-full">Limited</div>
              </div>
            </label>
            <input
              type="number"
              min="0"
              id="price"
              class="bg-background border border-gray-300 rounded-lg  p-2.5 h-16 w-3/4"
              placeholder="Price in BUSD"
            />
          </div>
        </div>
        <div className="container flex justify-end py-4">
          <MainButton
            label="Get license"
            iconSrc={"/add_icon.svg"}
          ></MainButton>
        </div>
      </section>
    </div>
  );
};

CreatePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default CreatePage;
