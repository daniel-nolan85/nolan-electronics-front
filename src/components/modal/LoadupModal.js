import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const LoadupModal = () => {
  const [modalIsOpen, setmodalIsOpen] = useState(true);
  return (
    <div>
      <Modal
        className='my-modal'
        isOpen={modalIsOpen}
        onRequestClose={() => setmodalIsOpen(false)}
      >
        <h2>This is a portfolio project</h2>
        <p>All items are contained for display purposes only</p>
        <button className='close' onClick={() => setmodalIsOpen(false)}>
          Got it
        </button>
      </Modal>
    </div>
  );
};

export default LoadupModal;
