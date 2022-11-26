import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <div style={{height: '10vh'}}>
            <div className="ml-4 columns-3">
                <Link href="/">
                    <Image className="columns-3 ml-3 mt-3" src="/Logo.svg" width={390} height={101} alt="logo" />
                </Link>
            </div>
        </div>
    );
};

export default Header;
