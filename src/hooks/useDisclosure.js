import React from "react";

const useDisclosure = (props) => {
  const [modalData, setModalData] = React.useState({
    isOpen: props?.defaultOpen || false,
    data: null,
  });

  const onOpen = (data = null) => {
    setModalData({
      isOpen: true,
      data,
    });
  };

  const onClose = () => {
    setModalData({
      isOpen: false,
      data: null,
    });
  };

  const { isOpen, data } = modalData;

  return { isOpen, data, onOpen, onClose };
};

export default useDisclosure;
