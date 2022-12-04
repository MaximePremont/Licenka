
import { useState, useRef, Children } from "react";
import Container from "./Container"

const Dropdown = ({children}) => {

    const [isOpen, setIsOpen] = useState(false);
    const wrapper = useRef(null);
    const list = useRef(null);

    function toggle() {
      if (isOpen)
          wrapper.current.style.height = 0+'px';
      else
          wrapper.current.style.height = list.current.clientHeight+'px';
      setIsOpen(!isOpen);
    }

  return (
    <div className="h-16">

    <Container className="">
        <div
        className="w-64 h-16 flex justify-center items-center text-xl"
        onClick={() => toggle()}
        >
          My Account
        </div>
          <div ref={wrapper} className={" relative w-64 overflow-hidden transition-all ease-in-out duration-300 " + (isOpen ? "" : "h-0 collapse")}>
              <ul ref={list}>
                  <li className="pt-2">Now this is a sto</li>
                  <li className="pt-2">Now this is a sto</li>
              </ul>
          </div>
        
    </Container>
          </div>

  );
};

export default Dropdown;