import Footer from "../Footer";
import Header from "../Header";
import { Analytics } from '@vercel/analytics/react';

const DefaultLayout = ({ children }) => {
    return (
        <div className="relative w-full bg-background">
            <Analytics />
            <Header/>
            <main>{children}</main>
            <Footer/>
        </div>
    );
};

export default DefaultLayout;
