import Image from "next/image";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.min.css';
import Dropdown from "../components/Dropdown"

const Header = () => {
    return (
        <div style={{height: '10vh'}} className="flex justify-between px-3">
            <div className="ml-4 columns-3">
                <Link href="/">
                    <Image className="columns-3 ml-3 mt-3" src="/Logo.svg" width={390} height={101} alt="logo" />
                </Link>
            </div>
            <div className="flex items-center">
                <Dropdown label="My Account">
                    <ul className="grid grid-cols-1 text-center">
                        <li className="pt-2 text-lg">Profil</li>
                        <li className="pt-2 text-lg">Disconect</li>
                    </ul>
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
