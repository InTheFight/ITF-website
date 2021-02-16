import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const PurpleButton = styled.button`
  background: #2C358F;
  border: none;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
  font-family: urw-din;
  color: #FFFFFF;
  height: 60px;
  width: 280px;
`;

const Button = ({ color, text }) => {
    return (
      <PurpleButton>{text}</PurpleButton>
    );
};

Button.defaultProps = {
  color: '',
  type: '',
  onClick: () => {},
};
const Container = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`
export const PlaceholderLinks = styled.ul`
  list-style: none;
`

export const PlaceholderLink = ({text, href}) => {

    return <Container>
             <li>
               <a href={href}>
                 <Button type="button" color="purple" text={text}/>
               </a>
             </li>
           </Container>
}
