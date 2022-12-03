const MainButton = ({ style, className, callback, type, disabled, children }) => {

  return (
    <button
      type={type}
      onClick={callback}
      disabled={disabled}
      className={"inline-flex items-center justify-center shadow-lg shadow-gray-600 p-0.5 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary"}
    >
      <span
        style={style}
        className={className + " transition-all ease-in duration-100 " + (disabled ? "" : "bg-background rounded-md hover:bg-opacity-0")}>
        {children}
      </span>
    </button>
  );
};

export default MainButton;