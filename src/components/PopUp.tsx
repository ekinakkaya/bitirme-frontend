import { FC, ReactNode } from "react";

interface PopUpProps {
  handleClose: () => void;
  show: boolean;
  children?: ReactNode;
}

const PopUp: FC<PopUpProps> = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block PopUp" : "modal display-none PopUp";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button className="closePop" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default PopUp;

