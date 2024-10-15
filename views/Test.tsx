import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select, { MultiValue } from 'react-select';
import { Price } from '../models/LumiMeals/enums';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import { InheritingLink } from '../styles/SharedStyles';
import StyledContainer from './StyledContainer';

function Test(props: any) {
  return (
    <StyledContainer>
      <MDBBtn outline rounded className='mx-2' color='dark'>
        Dark
      </MDBBtn>

      <MDBBtn rounded className='mx-2' color='dark'>
        Dark
      </MDBBtn>
      <MDBBtn outline className='mx-2' color='dark'>
        Dark
      </MDBBtn>
      <MDBBtn className='mx-2' color='dark'>
        Dark
      </MDBBtn>
      <Button variant="dark">
        <InheritingLink
          href={{
            pathname: `/LumiFundraising/fundraisers/makeFundraiser`
          }}
        >
          Live View
        </InheritingLink>
      </Button>

      <Button variant="outline-dark">
        <InheritingLink
          href={{
            pathname: `/LumiFundraising/fundraisers/makeFundraiser`
          }}
        >
          Add New Fundraiser
        </InheritingLink>
      </Button>
    </StyledContainer>
  );
}

export default Test;
