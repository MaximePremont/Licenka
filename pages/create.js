import DefaultLayout from "../modules/layout";

const ApprovePage = () => {
  return (
    <div>
      <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Teal</button>
      <button class="label relative inline-flex items-center justify-center shadow-lg shadow-gray-600 p-0.5 mb-2 mr-2 overflow-hidden rounded-lg group bg-gradient-to-br from-primary to-secondary">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-background dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Cyan to blue
        </span>
      </button>
    </div>
  );
};

ApprovePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ApprovePage;
