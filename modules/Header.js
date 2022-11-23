import Image from "next/image";

const Header = () => {
    return (
        <div>
            <p className='font-cabinet font-bold'>Header</p>
            <Image src="/Logo.svg" width={390} height={101} alt="An SVG of an eye" />
            <h1 className="">Salut</h1>
        </div>
    );
};

export default Header;
