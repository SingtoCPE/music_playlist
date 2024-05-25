import React, { useState } from "react";
import { Modal } from "antd";
const App = (props) => {
  const { isModalOpen, setIsModalOpen, modalInfo, submitConfirmModal } = props;

  const handleOk = () => {
    submitConfirmModal();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{modalInfo.text}</p>
      </Modal>
    </>
  );
};
export default App;
