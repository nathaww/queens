import "./GlassButton.css";
import React from "react";

type FollowPos = { x: number; y: number } | null;

type Props = {
  className?: string;
  text1: string;
  text2?: string;
  followPos?: FollowPos;
  anchorPos?: FollowPos;
  followActive?: boolean;
};

const GlassButton = ({
  className,
  text1,
  text2,
  followPos = null,
  anchorPos = null,
  followActive = false,
}: Props) => {
  const target = followActive && followPos ? followPos : anchorPos;

  const style: React.CSSProperties | undefined = target
    ? {
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${Math.round(target.x) + 50}px, ${Math.round(target.y) + 60}px) translate(-50%, -50%)`,
        transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
        pointerEvents: "auto",
      }
    : undefined;

  return (
    <div className={`${className}`} style={style}>
      <div className="button-wrap">
        <button className="flex justify-center items-center">
          <span className="p- size-24 text-center py-5 text-white font-(--font-suisse-mono)">
            {text1} <br /> {text2}
          </span>
        </button>
        <div className="button-shadow"></div>
      </div>
    </div>
  );
};

export default GlassButton;