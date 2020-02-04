/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import MenuItems from '../components/MenuItems.jsx';

const wrapper = mount(<MenuItems />);


describe('Rendering App component', () => {
  it('renders without crashing', () => {
    expect(wrapper.find('.app').exists()).toBe(true);
  });
});

describe('Rendering Item component', () => {
  it('renders without crashing', () => {
    expect(wrapper.find('.menu').exists()).toBe(true);
  });
});
