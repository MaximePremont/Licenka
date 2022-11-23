import Image from 'next/image';
import DefaultLayout from '../modules/layout'

const ApprovePage = () => {
  return (
    <div>
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3">01</div>
        <div className="row-span-3">
          <Image className="columns-3 ml-3 mt-3" src="/joker.svg" width={652} height={877} alt="logo" />
        </div>
      </div>
    </div>
  )
}

ApprovePage.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default ApprovePage
