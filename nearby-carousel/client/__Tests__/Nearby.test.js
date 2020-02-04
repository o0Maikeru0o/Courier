/* eslint-disable no-undef */
import axios from 'axios';
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import mockData from './mockData.json';
import Nearby from '../components/Nearby.jsx';

const wrapper = mount(<Nearby />);
// const shallowWrapper = shallow(<Nearby />);
jest.mock('axios');
global.console.log = jest.fn();


describe('Nearby.jsx component', () => {
  const response = { data: mockData };
  const instance = wrapper.instance();
  it('Should display "Loading..." prior to fetching data', () => {
    expect(wrapper.text()).toContain('Loading...');
  });

  it('Should render Carousel if data has been set in state', () => {
    wrapper.setState({ carouselData: mockData });
    expect(wrapper.find('Carousel').text().length).toBeGreaterThan(0);
  });

  describe('Nearby Methods', () => {
    it('Fetches data in componentDidMount()', async () => {
      axios.get.mockResolvedValue(response);
      await instance.componentDidMount();
    });

    // it('Should log an Error on a bad fetch request', async () => {
    //   axios.get.mockRejectedValue(new Error( 'Request failed with status code 400') );
    //   await instance.fetchData();
    //   expect(global.console.log).toEqual('Error: Request failed with status code 400');
    // });

    it('Adds favorites and updates state', async () => {
      axios.put.mockResolvedValue(response);
      await instance.addFavorite();
    });
  });
});
