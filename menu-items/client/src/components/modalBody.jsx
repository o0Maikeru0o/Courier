/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import styled from 'styled-components';

const Name = styled.div`
  margin-top: 0px;
  font-family: PostmatesStd, "Helvetica Neue", Helvetica;
  font-size: 24px;
  letter-spacing: -1.16px;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 8px;
`;
const Description = styled.div`
  font-family: PostmatesStd, "Helvetica Neue", Helvetica;
  font-size: 16px;
  letter-spacing: 0.14px;
  font-weight: 400;
  color: rgb(143, 149, 163);
  line-height: 1.33;
`;
const Extras = styled.div`
@media screen and (min-width: 1061px){
  font-family: PostmatesStd, "Helvetica Neue", Helvetica;
    padding-top: 10px;
    padding-bottom: 10px;
}
  border-bottom: 1px solid #ECEDEF;
`;
const Label = styled.div`
  font-family: PostmatesStd, "Helvetica Neue", Helvetica;
  margin-top: 20px;
  display: flex;
  font-size: 12px;
  letter-spacing: 0.14px;
  font-weight: 400;
  line-height: normal;
`;
const ModalBody = ({ name, description, options }) => {
  const modalOptions = options ? Object.keys(options) : [];

  return (
    <div>
      <div>
        <Name className="itemName">{name}</Name>
        <Description className="itemDescription">{description}</Description>
        <Extras>Extra Add-Ons</Extras>
      </div>
      <div>
        <form>
          <fieldset>
            {
            modalOptions.map(item => (
              <div>
                <Label>
                  <label className="container">
                    {item}
                    <input type="checkbox" className="checklist" />
                    <span className="checkmark" />
                  </label>
                </Label>
              </div>
            ))
          }
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ModalBody;
