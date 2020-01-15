import React from "react";
import Modal from "react-modal";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : 'rgba(234, 233, 233, .95)',
      boxShadow             : '0 4px 8px 0 rgba(0,0,0,0.2)',
      transition            : '0.3s',
      height                : '400px',
      overflow              : 'scroll'
    }
  };

// Modal.setAppElement("#root");

const ModalBox = props => {
    
    return(
    <div>
      <Modal
          isOpen={props.isOpen}
          onAfterOpen={props.onAfterOpen}
          onRequestClose={props.onRequestClose}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <button onClick={props.onRequestClose}>close</button>
          {props.children}
        </Modal>
    </div>
  );}

  export default ModalBox;