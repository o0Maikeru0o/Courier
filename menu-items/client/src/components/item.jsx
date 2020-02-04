/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable comma-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Modal from './modal.jsx';

const Container = styled.div`
  @media screen and (min-width: 1061px){
    width: calc(50% - 17.5px);
    margin: 16px 0;
    padding: 0;
    border: 1px solid rgba(217,219,224,0.5);
    height: 128px;
  }
  &:hover {background-color:#F7F7F8};
  cursor: pointer;
`;

const Body = styled.div`
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 20px 20px 15px;
`;
const Name = styled.h3`
  font-family: 'PostmatesStd',Helvetica Neue,Helvetica;
  font-size: 16px;
  letter-spacing: -0.28px;
  font-weight: 500;
  line-height: normal;
  display: block;
  overflow: hidden;
  color: #2D3138;
  margin: 0 0 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Description = styled.div`
  font-family: 'PostmatesStd',Helvetica Neue,Helvetica;
  font-size: 14px;
  line-height: 1.43;
  color: rgba(143,149,163,0.9);
  margin-bottom: 5px;
  letter-spacing: 0.14px;
  font-weight: 400;
`;

const Price = styled.div`
  font-family: 'PostmatesStd',Helvetica Neue,Helvetica;
  letter-spacing: -0.16px;
  font-weight: 500;
  color: #00CC99;
  line-height: 20px;
  font-size: 13px;
  margin-top: 20px;
`;

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      modalData: {},
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      showModal: true,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
      modalData: {},
    });
  }

  handleItemClick(e) {
    const { menuItems } = this.props;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < menuItems.length; i++) {
      // eslint-disable-next-line no-underscore-dangle
      if (e.target.parentNode.id === menuItems[i]._id) {
        this.setState({ modalData: menuItems[i] }, this.openModal);
      }
    }
  }

  render() {
    const { modalData, showModal } = this.state;
    const { item } = this.props;
    const {
      name, description, price, _id,
    } = item;

    return (

      <Container className="singleItem">
        <Body id={_id} onClick={this.handleItemClick}>
          { showModal ? <div onClick={this.closeModal} className="back-drop" /> : null }
          <Modal
            data={modalData}
            className="modal"
            show={showModal}
            close={this.closeModal}
          />
          <Name className="itemName">{name}</Name>
          <Description className="itemDescription">{description}</Description>
          <Price className="itemPrice">
            $
            {price}
          </Price>
        </Body>
      </Container>

    );
  }
}

export default Item;
