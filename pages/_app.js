import HeaderMeta from '../modules/HeaderMeta';
import '../styles/globals.css';

function RootApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
      <div>
        <HeaderMeta/>
        {getLayout(<Component {...pageProps} />)}
      </div>    
  )
}

export default RootApp
