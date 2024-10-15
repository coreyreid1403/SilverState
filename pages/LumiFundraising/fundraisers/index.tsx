import type { NextPage } from 'next';
import { Button } from 'react-bootstrap';
import { useRef, useEffect, useState } from 'react';
import Fundraiser from '../../../models/LumiFundraising/Fundraiser';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import FundraiserGlobalVariables from '../../../util/LumiFundraising/FundraiserGlobalVariables';
import { useRouter } from 'next/router';
import FundraiserService from '../../../services/LumiFundraising/FundraiserService';
import FundraiserRow from '../../../views/LumiFundraising/Rows/FundraiserRow';
import { InheritingLink } from '../../../styles/SharedStyles';
import styled from 'styled-components';
import CoachService from '../../../services/LumiFundraising/CoachService ';
import Coach from '../../../models/LumiFundraising/Users/Coach';
import StyledContainer from '../../../views/StyledContainer';
import FormPopUpWindow from '../../../views/popups/FormPopUpWindow';
import SetUpOrganizationForm from '../../../views/LumiFundraising/Forms/SetUpOrganizationForm';
import EmailService from '../../../services/LumiFundraising/EmailService';

const CoachDisplayName = styled.div`
  display: inline-block;
  float: right;
  padding: 25px;
`;

const StyledButton = styled.button`
  margin-left: 5px;
`;

const CoachesHome: NextPage = () => {
  //if we have set up data or not
  const dataFetchedRef = useRef(false);
  const router = useRouter();
  let globals = FundraiserGlobalVariables.getInstance();
  let fundraiserService = new FundraiserService();
  let emailService = new EmailService();
  let coachService = new CoachService();

  const [coach, setCoach] = useState<Coach | undefined>(undefined);

  /**
   * var for error popup
   */
  const [showPopUP, setShowPopUP] = useState(false);
  const [windowOpenFlag, setWindowOpenFlag] = useState(false);
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);

  useEffect(() => {
    if (!dataFetchedRef.current) {
      getFundraisers();
    }
    dataFetchedRef.current = true;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFundraisers = async () => {
    const coach = await globals?.getCoach();
    if (coach) {
      setCoach(coach);
      let funds = await fundraiserService.getAllCoachesFundraisers(coach);
      setFundraisers(funds);
    } else {
      console.error('Cannot get coach');
      router.push(`/LumiFundraising/login`);
    }
  };

  async function updateDisplayName(fields: any) {
    let name = fields.target.nameInput?.value;
    if (coach) {
      coach.displayName = name;
      let sad = await coachService.updateCoach(coach);
      if(sad && sad.length > 0){
        alert('Error updating Name, refresh and try again');
      }
    } else {
      console.error('Cannot get coach');
      router.push(`/LumiFundraising/login`);
    }
  }

  return (
    <StyledContainer>
      <CoachDisplayName>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateDisplayName(e);
          }}
        >
          <b>Coaches Display Name: </b>
          <input
            type="text"
            className={'input'}
            id="nameInput"
            defaultValue={coach?.displayName}
            required
          />
          <StyledButton>{'>'}</StyledButton>
        </form>
      </CoachDisplayName>
      <FormPopUpWindow
          title="Add New Organization"
          buttonName="Add New Organization"
          windowOpen={windowOpenFlag}
          setWindowOpenFlag={setWindowOpenFlag}
          buttonStyle={'dark'}
        >
          <SetUpOrganizationForm
           setWindowOpenFlag={setWindowOpenFlag}
           coach={coach}/>
        </FormPopUpWindow>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Start Date</th>
            <th scope="col">$/Goal</th>
            <th scope="col">Team</th>
            <th scope="col">Fully Paid Out</th>
            <th scope="col">Close Date</th>
            <th scope="col">End</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {fundraisers.map(fund => (
            <FundraiserRow
              key={fund.name}
              fund={fund}
              router={router}
              fundraiserService={fundraiserService}
              pageRefresh={getFundraisers}
              emailService={emailService}
            />
          ))}
          <tr>
            <td colSpan={8}>
              <Button variant="outline-success">
                <InheritingLink
                  href={{
                    pathname: `/LumiFundraising/fundraisers/makeFundraiser`
                  }}
                >
                  Add New Fundraiser
                </InheritingLink>
              </Button>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
      </StyledContainer>
  );
};

export default CoachesHome;
