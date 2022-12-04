
import { useState, useRef, useEffect, Children } from "react";
import Container from "./Container"

const Dropdown = ({label, children}) => {

    const [isOpen, setIsOpen] = useState(false);
    const wrapper = useRef(null);
    const list = useRef(null);
    const button = useRef(null);
    const container = useRef(null);

    
    useEffect(() => {
      if (!container.current.style.height.length)
        container.current.style.height = button.current.clientHeight+"px";
    }, [])

    function toggle() {
      if (isOpen)
          wrapper.current.style.height = 0+'px';
      else
          wrapper.current.style.height = list.current.clientHeight+'px';
      setIsOpen(!isOpen);
    }

  return (
    <div ref={container}>
      <Container>
          <div
          ref={button}
          className="w-56 h-16 flex justify-center items-center text-2xl"
          onClick={() => toggle()}
          >
            {label}
          </div>
          <div ref={wrapper} className={" relative overflow-hidden transition-all ease-in-out duration-300 " + (isOpen ? "" : "h-0 collapse")}>
            <div className="h-0 flex justify-center">
              <div className={"relative bg-gradient-to-br from-primary to-secondary w-5/6 h-0.5 " + (isOpen ? "" : "")}></div>
            </div>
            <div ref={list}>
              {children}
            </div>
          </div>
          
      </Container>
    </div>

  );
};

export default Dropdown;