import Image from "next/image";
import MainButton from "./MainButton";

const SimpleButton = ({ label, iconSrc, callback, type, disabled }) => {

  return (
    <MainButton type={type} callback={callback} disabled={disabled} className={"w-80 items-center justify-between align-center flex px-5 py-2.5"}>
        <p className="text-xl">{label}</p>
        {iconSrc && !disabled ? (
          <Image src={iconSrc} width={48} height={48} alt="icon"></Image>
        ) : (
          <></>
        )}
    </MainButton>
  );
};

export default SimpleButton;