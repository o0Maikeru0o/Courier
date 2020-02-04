import React, { Component } from 'react';
import styled from 'styled-components';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import Slide from './Slide';

const CarouselContainer = styled.div`
  display: flex;
  position: relative;
  height: auto;
`;


const SlideDeck = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  overflow: visible;
  justify-content: space-between;
  transition: transform 400ms cubic-bezier(0.86,0,0.07,1);
  transform: ${props => props.offset}
`;

const OverflowWrapper = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const LeftArrow = styled.button`
  display: flex;
  outline: none;
  position: absolute;
  align-items: center;
  height: 40px;
  width: 40px;
  top: 35%;
  background-color: white;
  cursor: pointer;
  border: 1px solid rgb(217, 219, 224);
  border-radius: 50%;
  left: -26px;
`;

const RightArrow = styled.button`
  display: flex;
  outline: none;
  position: absolute;
  align-items: center;
  height: 40px;
  width: 40px;
  top: 35%;
  background-color: white;
  cursor: pointer;
  border: 1px solid rgb(217, 219, 224);
  border-radius: 50%;
  right: -24px;
`;

const LeftChevron = styled(MdChevronLeft)`
  margin: 0 auto;
  height: 24px;
  width: 24px;
`;

const RightChevron = styled(MdChevronRight)`
  margin: 0 auto;
  height: 24px;
  width: 24px;
`;

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      direction: '',
      offset: '',
      hideRightArrow: true,
      hideLeftArrow: true,
    };
    this.scrollByThree = this.scrollByThree.bind(this);
  }

  componentDidMount() {
    const { carouselData } = this.props;
    if (carouselData.length > 3) {
      this.setState({
        hideRightArrow: false,
      });
    }
  }

  scrollByThree(direction) {
    const { carouselData } = this.props;
    let {
      position, hideRightArrow, hideLeftArrow, offset,
    } = this.state;

    if (direction === 'right' && position < 8) {
      position += 3;
      hideLeftArrow = false;
      if (position >= carouselData.length - 3) {
        hideRightArrow = true;
      }
    } else if (direction === 'left' && position > 0) {
      position -= 3;
      hideRightArrow = false;
      if (position === 0) {
        hideLeftArrow = true;
      }
    }
    offset = `translateX(calc(-${100 * position / 3}% + -${36 * position / 3}px))`;
    const currentState = {
      position, hideLeftArrow, hideRightArrow, direction, offset,
    };
    this.setState({
      ...currentState,
    });
  }

  render() {
    const { carouselData, addFavorite } = this.props;
    const {
      direction, hideRightArrow, hideLeftArrow, offset,
    } = this.state;

    const slides = carouselData.map((slide, index) => (
      <Slide
        key={slide.restaurantId}
        index={index}
        {...slide}
        addFavorite={addFavorite}
      />
    ));

    return (
      <CarouselContainer>
        <OverflowWrapper>
          <SlideDeck direction={direction} offset={offset}>{slides}</SlideDeck>
        </OverflowWrapper>

        {!hideLeftArrow
        && (
        <LeftArrow className="leftArrow" dir="left" onClick={() => this.scrollByThree('left')}>
          <LeftChevron />
        </LeftArrow>
        )}
        {!hideRightArrow && (
        <RightArrow className="rightArrow" dir="right" onClick={() => this.scrollByThree('right')}>
          <RightChevron />
        </RightArrow>
        )}
      </CarouselContainer>

    );
  }
}


export default Carousel;
