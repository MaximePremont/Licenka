const Container = ({fill, className, style, children}) => {

  return (
    <div
    className={"inline-flex items-center justify-center shadow-lg shadow-gray-600 p-0.5 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary disabled:cursor-not-allowed"}
    >
      <span
        style={style}
        className={className + " transition-all ease-in duration-100 " + (fill ? "" : " bg-background rounded-md")}>
          {children}
      </span>
    </div>
  );
};

export default Container;