import React, { Component } from 'react';
import styled from 'styled-components';
import { MdChevronRight } from 'react-icons/md';
import axios from 'axios';
import Carousel from './Carousel';

const NearbyApp = styled.div`
  display: flex;
  font-family: 'PostMates', 'Helvetica Neue', Helvetica;
  max-width: 100%;
  height: 682px;
  margin: 0 auto;
`;


const Title = styled.h3`
  margin-top: auto;
  font-family: 'PostMatesMed', 'Helvetica Neue', Helvetica;
  font-size: 24px;
  letter-spacing: -0.2px;
`;


const AllInArea = styled.div`
  display: flex;
  margin: auto 0 auto auto;
  letter-spacing: 0.3px;
  font-size: 16px;
  color: #8F95A3;
`;


const NearbyContent = styled.div`
  width: 1024px;
  height: auto;
  padding-left: 36px;
  padding-right: 36px;
  margin: 0 auto;
`;

const TopBar = styled.div`
  height: 30px;
  length: 100%;
  display: flex;
  text-transform: capitalize;
  padding-bottom: 14px;
  align-items: flex-end;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(217,219,224,0.5);
`;

const RightChevron = styled(MdChevronRight)`
  position: relative;
  margin-top: auto;
  height: 26px;
  width: 26px;
  color: #8F95A3;
`;

const id = window.location.pathname;

class Nearby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carouselData: [],
      error: '',
    };
    this.addFavorite = this.addFavorite.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(id);
  }

  async fetchData() {
    await axios.get(`/api/nearby${id}`)
      .then((carousel) => {
        if (carousel.data.length === 0) { this.setState({ error: 'Data not retrieved' }); }
        this.setState({ carouselData: carousel.data });
      })
      .catch(err => console.log(err));
  }

  async addFavorite(restaurantId, favoriteAdded) {
    let increment;
    if (!favoriteAdded) {
      increment = 1;
    } else {
      increment = -1;
    }
    await axios.put(`/api/nearby${id}?restaurantId=${restaurantId}&increment=${increment}`)
      .then(res => this.setState({ carouselData: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    const {
      carouselData, error,
    } = this.state;
    if (carouselData.length === 0) {
      return (<div>Loading...</div>);
    } if (error) { return <div>{error}</div>; }
    return (
      <NearbyApp>
        <NearbyContent>
          <TopBar>
            <Title>Other Options Nearby</Title>
            <AllInArea>
              {`All ${carouselData[0].category} Delivery `}
            </AllInArea>
            <RightChevron />
          </TopBar>
          <Carousel carouselData={carouselData} addFavorite={this.addFavorite} />
        </NearbyContent>
      </NearbyApp>
    );
  }
}

export default Nearby;
