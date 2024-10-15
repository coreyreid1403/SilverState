/* eslint-disable react-hooks/exhaustive-deps */
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Athlete from '../../../../models/LumiFundraising/Users/Athlete';
import Fundraiser from '../../../../models/LumiFundraising/Fundraiser';
import StudentRaffleProperties from '../../../../models/LumiFundraising/TypeProperties/StudentRaffleProperties';
import { FundraiserTypes } from '../../../../models/LumiFundraising/enums';
import AthleteService from '../../../../services/LumiFundraising/AthleteService';
import FundraiserService from '../../../../services/LumiFundraising/FundraiserService';
import localStyles from '../../../../styles/LumiFundraising/pages/athlete.module.css';
import {
  Center,
  PaddingDiv,
  SideLinkArea,
  Spacing,
  StyledHeader,
  StyledRow,
  TopBar
} from '../../../../styles/SharedStyles';
import StyledContainer from '../../../../views/StyledContainer';
import FormPopUpWindow from '../../../../views/popups/FormPopUpWindow';
import VerifyPopUpWindow from '../../../../views/popups/VerifyPopUpWindow';
import StudentRaffleRow from '../../../../views/LumiFundraising/Rows/StudentRaffleRow';
import DonationService from '../../../../services/LumiFundraising/DonationService';
import StudentRafflePropertiesForm from '../../../../views/LumiFundraising/Forms/StudentRafflePropertiesForm';
import StudentRaffleDrawForm from '../../../../views/LumiFundraising/Forms/StudentRaffleDrawForm';
import { Button } from 'react-bootstrap';
import BackButton from '../../../../views/BackButton';

const StyledTable = styled(MDBTable)``;

const StudentRaffle: NextPage = () => {
  const athleteService = new AthleteService();
  const fundraiserService = new FundraiserService();
  const donationService = new DonationService();
  /**
   * Var for getting param from route
   */
  const router = useRouter();
  let data = router.query;
  let fundraiserId = data.fundraiserId;
  //if we have set up data or not
  const dataFetchedRef = useRef(false);
  const [fundraiser, setFundraiser] = useState<Fundraiser | undefined>(
    undefined
  );
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [fundProperties, setFundProperties] = useState<
    StudentRaffleProperties | undefined
  >(undefined);
  const [windowOpenFlag, setWindowOpenFlag] = useState(false);
  const [windowOpenFlagDraw, setWindowOpenFlagDraw] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [athleteDonationMap, setAthleteDonationMap] = useState(new Map());

  useEffect(() => {
    if (router && router.query) {
      data = router.query;
      if (data.fundraiserId) {
        if (!dataFetchedRef.current) {
          getData();
        }
        dataFetchedRef.current = true;
      }
    }
  }, [router]);

  async function getData() {
    if (fundraiserId && typeof fundraiserId === 'string') {
      const [fund, error] = await fundraiserService.getFundraiser(fundraiserId);
      if (fund) {
        setFundraiser(fund);
        setFundProperties(
          fundraiserService.getStudentRaffleProperties(fund.typeProperties)
        );
        getAthletes(fund?.id);
        const [donations, error] = await donationService.getDonationsByFundraiser(fundraiserId);
        if(donations){
          setAthleteDonationMap(athleteService.sortDonationsToAthletes(athletes, donations));
        }
      }
    }
  }

  //when fundraiser is updated, refetch athletes
  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    }
    getData();
  }, [refresh]);

  async function getAthletes(
    fundraiserId: string | undefined
  ): Promise<void> {
    if (fundraiserId) {
      let [fundAthletes, error] =
        await athleteService.getAthletesByFundraiserId(fundraiserId);
        setAthletes(fundAthletes);
    }
  }

  async function onSubmit(fields: any) {
    let price: number = Number(fields.target.priceInput.value);
    let first: number = Number(fields.target.firstInput.value);
    let second: number = Number(fields.target.secondInput.value);
    let third: number = Number(fields.target.thirdInput.value);

    let prizes: number[] = [first];
    if (second && second > 0) {
      prizes.push(second);
    }
    if (third && third > 0) {
      prizes.push(third);
    }

    let props: StudentRaffleProperties = new StudentRaffleProperties(
      price,
      prizes
    );
    if (fundraiser) {
      let updatedFund = prepareFundForProperties(fundraiser);
      updatedFund.typeProperties.push(props);
      let updateError = await fundraiserService.updateFundraiser(updatedFund);
      if (updateError && updateError.length > 0) {
        console.error('Error updating fundraiser');
      } else {
        setRefresh(true);
      }
    }
  }

  async function onSubmitDraw(winners: string[]) {
    if (fundraiser) {
      //get the raffle properties to update
      let raffleProps = fundraiserService.getStudentRaffleProperties(
        fundraiser.typeProperties
      );
      if (raffleProps) {
        //prep types
        raffleProps.winners = winners;
        let updatedFund = prepareFundForProperties(fundraiser);
        //update fundraiser
        updatedFund.typeProperties.push(raffleProps);
        let updateError = await fundraiserService.updateFundraiser(updatedFund);
        setRefresh(true);
        if (updateError && updateError.length > 0) {
          console.error('Error updating fundraiser');
        }
      }
    }
  }

  function prepareFundForProperties(fund: Fundraiser): Fundraiser {
    if (!fund.typeProperties) {
      fund.typeProperties = [];
    }
    let foundIndex = fund.typeProperties.findIndex(prop => {
      return (prop.type === FundraiserTypes.StudentRaffle);
    });
    if (foundIndex !== -1) {
      fund.typeProperties.splice(foundIndex, 1);
    }
    return fund;
  }

  return (
    <StyledContainer>
      <BackButton router={router}>Return to Fundraiser</BackButton>
      <Center>
        <h1>{fundraiser?.name ?? 'Fundraiser Name'} - Student Raffle</h1>
        <TopBar>{/* TODO//set the places */}</TopBar>
      </Center>
      <SideLinkArea>
        <PaddingDiv>
          {fundraiser && (
            <PaddingDiv>
              <FormPopUpWindow
                title="Set Up Raffle"
                buttonName="Set up Raffle"
                windowOpen={windowOpenFlag}
                setWindowOpenFlag={setWindowOpenFlag}
                buttonStyle={'dark'}
                redBorder={fundProperties === undefined}
              >
                <StudentRafflePropertiesForm
                  setWindowOpenFlag={setWindowOpenFlag}
                  submit={onSubmit}
                  fundraiser={fundraiser}
                />
              </FormPopUpWindow>
            </PaddingDiv>
          )}
        </PaddingDiv>

        {fundProperties && fundraiser && (
          <PaddingDiv>
            <FormPopUpWindow
              title="Draw Raffle"
              buttonName="Draw Raffle"
              windowOpen={windowOpenFlagDraw}
              setWindowOpenFlag={setWindowOpenFlagDraw}
              buttonStyle={'dark'}
            >
              <StudentRaffleDrawForm
                setWindowOpenFlag={setWindowOpenFlagDraw}
                submit={onSubmitDraw}
                fundraiser={fundraiser}
                athletes={athletes}
                athleteService={athleteService}
                athleteDonationMap={athleteDonationMap}
              />
            </FormPopUpWindow>
          </PaddingDiv>
        )}
        {fundProperties && fundProperties.winners?.length > 0 && (
          <PaddingDiv>
            <VerifyPopUpWindow
              title="Raffle Winners"
              buttonName="See Winners Information"
              buttonStyle="dark"
              submitButtonName="Woot"
              buttonClick={() => []}
            >
              <StyledTable>
                <tbody>
                  <tr>
                    <StyledHeader>Place</StyledHeader>
                    <StyledHeader>Name</StyledHeader>
                  </tr>
                  {fundProperties.winners.map((winner, index) => {
                    return (
                      <tr key={index}>
                        <StyledRow>{index + 1}</StyledRow>
                        <StyledRow>{winner}</StyledRow>
                      </tr>
                    );
                  })}
                </tbody>
              </StyledTable>
            </VerifyPopUpWindow>
          </PaddingDiv>
        )}
      </SideLinkArea>
      <Spacing />
      <MDBTable className="table table-striped">
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Tickets</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
        {fundraiser && (
          athletes.map((athlete: Athlete, index) => {
              return (
                <StudentRaffleRow 
                key={index}
                athleteName={athlete.userName}
                donations={athleteDonationMap.get(athlete.userId)}
                index={index}
                athleteService={athleteService}
                fundProperties={fundProperties}
                fundraiserId={fundraiser.id}/>
                );
          })
        )}
        </MDBTableBody>
      </MDBTable>
    </StyledContainer>
  );
};

export default StudentRaffle;
