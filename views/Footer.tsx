import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import styled from 'styled-components';
import { MediumSpacing } from '../styles/SharedStyles';
import Link from 'next/link';

export default function Footer() {
  return (
    <MDBFooter color="white-50" bgColor='dark' className='text-center text-lg-start text-muted'>
      <MediumSpacing/>
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                Luminescence Software
              </h6>
              {/* <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p> */}
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <Link href='/LumiFundraising' className='text-reset'>
                  Fundraising
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <Link href='/ContactUs' className='text-reset'>
                   Contact Us
                </Link>
              </p>
              <p>
                <Link href='/JoinUs' className='text-reset'>
                  Join Us
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                Reno, NV, US
              </p>
              <p>
              <a href='mailto:LuminescenceSoftware@gmail.com'>LuminescenceSoftware@gmail.com</a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {new Date().getFullYear().toString()} Copyright:
        Luminescence Software LLC
      </div>
    </MDBFooter>
  );
}