/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Item from './item.jsx';


const Container = styled.div`
  @media screen and (min-width: 1061px){
    padding-top: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const Menu = ({ menuItems }) => (
  <Container className="menu">
    {menuItems.map(item => <Item item={item} menuItems={menuItems} className="itemTest" />)}
  </Container>
);

export default Menu;
