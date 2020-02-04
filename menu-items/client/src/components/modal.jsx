/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import ModalFooter from './modalFooter.jsx';
import ModalBody from './modalBody.jsx';

const Modal = styled.div`
  @media screen and (min-width: 1060px)
  {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    box-sizing: border-box;
  }
`;

const ModalBody1 = styled.div`
  @media screen and (min-width: 1060px){
      height: calc(100% - 80px);
      overflow-y: auto;
      border-bottom: 1px solid rgba(217, 219, 224, 0.5);
      position: relative;
      padding: 20px
  }
`;

const modal = ({ data, show, close }) => (
  <Modal>
    <div
      className="modal-wrapper"
      style={{
        transform: show ? 'translateY(0vh)' : 'translateY(100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      <ModalBody1 clasName="footer">
        <div className="modal-header" />
        <span className="close-modal-btn" onClick={close}>×</span>
        <div className="modal-body">
          <ModalBody name={data.name} description={data.description} options={data.options} />
        </div>
      </ModalBody1>
      <div className="modal-footer">
        <ModalFooter price={data.price} clickHandler={close} />
      </div>
    </div>
  </Modal>

);

export default modal;
