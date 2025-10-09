import { ReactNode, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, position = "top", children }) => {
  const [visible, setVisible] = useState(false);
  const [coord, setCoord] = useState({
    top: 0, left: 0
  })
  const tootipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tootipRef.current) {
      const elem = tootipRef.current.getBoundingClientRect();
      setCoord({ top: elem.top, left: elem.left + elem.width / 2 });
    }
  }, [visible])

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  // console.log("tooltip", coord)

  return (
    <div ref={tootipRef} className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && createPortal(
        <div
          style={{
            top: coord.top,
            left: coord.left,
            transform: "translate(-50%, -100%)"
          }}
          className={`fixed bg-black text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap z-50`}>
          {content}
        </div>,
        document.body
      )}
    </div>
  );
};

export default Tooltip;
