/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Foot = styled.div`
    display: flex;
    position: absolute;
    bottom: 0px;
    left: 0px;
    align-items: center;
    justify-content: center;
    width: 80%;
    background-color: rgb(255, 255, 255);
    padding: 16px 20px;
    border-top: border: 1px solid rgba(217,219,224,0.5);
`;

const Left = styled.div`
    font-family: PostmatesStd, "Helvetica Neue", Helvetica;
    font-size: 16px;
    letter-spacing: -0.28px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: rgb(255, 255, 255);
    width: 168px;
    max-width: 168px;
    height: 56px;
    color: rgb(45, 49, 56);
    margin-left: auto;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-right: 12px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(217, 219, 224, 0.5);
    border-image: initial;
    border-radius: 100px;
`;
const CancelButton = styled.button`
  font-family: PostmatesStd, "Helvetica Neue", Helvetica;
  font-size: 12px;
  letter-spacing: 0.72px;
  line-height: normal;
  text-align: center;
  height: 56px;
  background-color: rgb(0, 204, 153);
  color: rgb(255, 255, 255);
  width: 100%;
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  font-weight: 600;
  -webkit-box-align: center;
  align-items: center;
  margin: 0px;
  outline: none;
  transition: background-color 0.2s ease-in-out 0s, color 0.2s ease-in-out 0s;
  padding: 0px 16px;
  border-radius: 28px;

`;

class ModalFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      oldPrice: 0,
      count: 1,
    };
    this.IncrementItem = this.IncrementItem.bind(this);
    this.DecreaseItem = this.DecreaseItem.bind(this);
    this.closeEvent = this.closeEvent.bind(this);
  }

  static getDerivedStateFromProps(next, state) {
    if (!state.price) {
      return { price: next.price, oldPrice: next.price, count: 1 };
    }
    return null;
  }

  DecreaseItem() {
    const { price, oldPrice, count } = this.state;
    this.setState({ price: (price - oldPrice).toFixed(2), count: count - 1 });
  }

  IncrementItem() {
    const { price, oldPrice, count } = this.state;
    const incrementPrice = parseFloat(price);

    const incrementOldPrice = parseFloat(oldPrice);

    const newPrice = parseFloat(incrementPrice + incrementOldPrice).toFixed(2);
    this.setState({ price: newPrice, count: count + 1 });
  }

  closeEvent() {
    const { clickHandler } = this.props;
    this.setState({ price: 0, oldPrice: 0, count: 1 });
    clickHandler();
  }

  render() {
    const { price, count } = this.state;
    return (
      <Foot>
        <Left className="increment-btn">
          <button className="btn-minus" onClick={this.DecreaseItem}> -  </button>
          <span className="countSpan">{count}</span>
          <button className="btn-plus" onClick={this.IncrementItem}>  + </button>
        </Left>
        <div>
          <CancelButton className="btn-cancel" onClick={this.closeEvent}>
            <span>ADD TO CART   {price}</span>
          </CancelButton>
        </div>
      </Foot>
    );
  }
}


export default ModalFooter;
