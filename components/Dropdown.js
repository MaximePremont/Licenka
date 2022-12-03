// import Image from "next/image";
// import MainButton from "./MainButton";
import { useState } from "react";

const Dropdown = () => {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
        <div
        className="w-64 font-medium h-16 bg-white"
        onClick={() => setIsOpen(!isOpen)}
        >

        </div>
        <div className={"absolute w-64 font-medium h-36 bg-slate-500 overflow-hidden transition-all ease-in-out duration-300 " + (isOpen ? "h-full" : "h-0 collapse")}>
        <ul class="list-disc">
            <li className="pt-2">Now this is a sto</li>
            <li className="pt-2">Now this is a sto</li>
            <li className="pt-2">Now this is a sto</li>
        </ul>
        </div>
    </div>

  );
};

export default Dropdown;