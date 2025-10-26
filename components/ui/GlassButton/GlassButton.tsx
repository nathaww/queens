import "./GlassButton.css";

type Props = {
  className?: string;
  text1: string;
  text2?: string;
};

const GlassButton = ({
  className,
  text1,
  text2
}: Props) => {


  return (
    <div className={`${className}`}>
      <div className="button-wrap">
        <button className="flex justify-center items-center">
          <span className=" text-center p-5 text-white font-(--font-suisse-mono)">
            {text1} {text2}
          </span>
        </button>
        <div className="button-shadow"></div>
      </div>
    </div>
  );
};

export default GlassButton;