import Image from "next/image";

const MainButton = ({ label, iconSrc, callback, type }) => {
  return (
    <button
      type={type}
      onClick={callback}
      className="w-80 relative inline-flex items-center justify-center shadow-lg shadow-gray-600 p-0.5 overflow-hidden rounded-lg group bg-gradient-to-br from-primary to-secondary"
    >
      <span className="w-80 items-center justify-between align-center flex px-5 py-2.5 transition-all ease-in duration-75 bg-background rounded-md group-hover:bg-opacity-0">
        <p className="text-xl">{label}</p>
        {iconSrc ? (
          <Image src={iconSrc} width={48} height={48} alt="icon"></Image>
        ) : (
          <></>
        )}
      </span>
    </button>
  );
};

export default MainButton;