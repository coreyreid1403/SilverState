import Link from 'next/link';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const PhoneLinks = styled(Link)`
  display: block;
  text-decoration: none;
  text-align: center;
  color: white;

  &:hover {
    color: var(--color-blue);
  }
  &:active {
    color: var(--color-grey);
  }
`;

export const TopBar = styled.div`
  margin: 1rem;
  padding: 2rem 2rem;
  text-align: center;
  width: 80%;
`;

export const OuterGlowTitle = styled.p`
  text-align: center;
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  font-weight: bold;
  text-shadow: 0 0 45px white;
`;


export const StyledTable = styled.table`
  background-color: var(--color-offWhite);
  margin-left: auto;
  margin-right: auto;
`;
export const StyledHeader = styled.th`
  width: 150px;
  padding: 10px;
  text-align: center;
`;
export const StyledRow = styled.td`
  width: 150px;
  padding: 10px;
  text-align: center;
`;

export const StyledHr = styled.hr`
  width: 50%;
  margin: auto;
  padding: 5px;
`;

export const Divider = styled.div`
  border-top: 1px solid #e7e7f4;
  height: 1px;
  margin: 0 20px;
`;

export const InheritingLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: bold;
`;

export const Center = styled.div`
  text-align: center;
`;

export const CenterEverything = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SideLinkArea = styled.div`
  float: left;
  width: 40%;
  display: block;
`;

export const PaddingDiv = styled.div`
  padding: 5px;
`;

export const Spacing = styled.div`
  padding: 20px;
  margin: 20px;
`;
export const MediumSpacing = styled.div`
  padding: 10px;
  margin: 10px;
`;

export const Required = styled.div`
  color: red;
  font-weight: normal;
`;

export const SmallSpace = styled.div`
  padding-right: 10px;
  margin-right: 10px;
`;

export const Card = styled.div`
  background: var(--color-offWhite);
  border-radius: 25px;
  border-style: solid;
  border-color: var(--color-blue);
  box-shadow: 80px 80px 107px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 15px;
  width: 80%;
  max-width: 700px;
  font-size: 1.6rem;
  word-wrap: break-word;
`;

export const HalfCard = styled.div`
  background: var(--color-offWhite);
  border-radius: 25px;
  border-style: solid;
  border-color: var(--color-blue);
  box-shadow: 80px 80px 107px -2px rgba(0, 0, 0, 0.05);
  display: inline;
  height: 100%;
  margin: 15px;
  min-width: 250px;
  font-size: 1.2rem;
  word-wrap: break-word;
`;

export const CardContent = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  padding: 24px;
`;

export const CardHeader = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 700;
  padding: 2em 1.5em 0;

  @media (min-width: 576px) {
    align-items: center;
    flex-direction: row;
  }
`;

export const FormButton = styled.button`
  background-color: transparent;
  outline: none;
  padding: 1rem;
  border: 2px solid #fff;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  color: #000;
  font-weight: 600;
  margin-top: 10px;
  transition: all 0.5s;
  color: #fff;
`;

export const Title = styled.h1`
  text-align: center;
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`;

export const Description = styled.p`
  text-align: center;
  margin: 4rem 0;
  line-height: 1.5;
  font-size: 1.5rem;
`;

export const GridStyle = styled.div`
  display: grid;
  margin: 15px;
  grid-gap: 3em;
  @media (min-width: 576px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const Form = styled.div`
  width: 100%;
  color: #fff;
  form {
    margin-top: 20px;
    display: flex;
    // align-items: flex-end;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    input,
    textarea {
      width: 100%;
      margin: 10px 0;
      padding: 10px;
      outline: none;
      border: none;
      background: #fff;
      color: #000;
      &:focus {
        border: 3px solid cyan;
        background: transparent;
        color: #fff;
      }
    }
    input {
      height: 50px;
    }
  }
`;

export const RedBorder = styled.div<{ show?: boolean }>`
  ${({ show }) => {
    if (show) {
      return `border-style: solid;`;
    }
  }}
  border-color: red;
  display: inline-block;
`;
