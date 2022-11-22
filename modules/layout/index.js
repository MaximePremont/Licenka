import Footer from "../Footer";
import Header from "../Header";

const DefaultLayout = ({ children }) => {
    return (
        <div className="relative w-full">
            <Header/>
            <main>{children}</main>
            <Footer/>
        </div>
    );
};

export default DefaultLayout;
