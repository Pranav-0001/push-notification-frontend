import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modalSlice"; 
import CreateOrUpdateModal from "./CreateOrUpdateModal";

export default function Modals() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.modal.open);
  const modalProps = useSelector((state) => state.modal.modalProps);
  const modals = {
    createOrUpdateModal:CreateOrUpdateModal
  };
  const ModalComponent = useMemo(() => modals[open], [open]);
  const close = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);
  console.log({ ModalComponent, modal: modals[open] });

  return (
    <>
      {ModalComponent && (
        <div className="absolute left-0 top-0 h-[100vh] w-full flex justify-center items-center" style={{background:'rgba(0, 0, 0,.5)'}}>
        <ModalComponent
          open={true}
          {...modalProps}
          handleClose={() => {
            close();
          }}
        />
        </div>
      )}
    </>
  );
}
