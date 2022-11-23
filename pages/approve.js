import DefaultLayout from '../modules/layout'

const ApprovePage = () => {
  return (
    <div>
      <p>Salut</p>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
        Button
      </button>
    </div>
  )
}

ApprovePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ApprovePage
