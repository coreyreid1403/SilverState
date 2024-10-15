import type { NextPage } from 'next';
import StyledContainer from '../views/StyledContainer';
import {
  Form,
  FormButton,
  PaddingDiv,
  SideLinkArea
} from '../styles/SharedStyles';
import CoachService from '../services/LumiFundraising/CoachService ';
import FormPopUpWindow from '../views/popups/FormPopUpWindow';
import { useEffect, useRef, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Donation from '../models/LumiFundraising/Donation';
import FundraiserService from '../services/LumiFundraising/FundraiserService';
import styled from 'styled-components';
import Fundraiser from '../models/LumiFundraising/Fundraiser';
import VerifyPopUpWindow from '../views/popups/VerifyPopUpWindow';
import AthleteService from '../services/LumiFundraising/AthleteService';
import { read, utils, writeFile } from 'xlsx';
import Customer from '../models/LumiFundraising/Customer';
import { Button } from 'react-bootstrap';
import DonationService from '../services/LumiFundraising/DonationService';
import DonatorService from '../services/LumiFundraising/DonatorService';
import Donator from '../models/LumiFundraising/Users/Donator';
import Athlete from '../models/LumiFundraising/Users/Athlete';

const StyledButton = styled.button`
  margin-left: 5px;
`;

/**
 * Page for Admin tools and usage information
 */
const Admin: NextPage = () => {
  const donationService = new DonationService();
  const fundraiserService = new FundraiserService();
  const coachService = new CoachService();
  const athleteService = new AthleteService();
  const donatorService = new DonatorService()

  const [windowOpenFlag, setWindowOpenFlag] = useState(false);
  const [windowOpenFlag2, setWindowOpenFlag2] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [cardDonators, setCardDonators] = useState<Donator[]>([]);
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [donationsToShow, setDonationsToShow] = useState<Donation[]>([]);
  const [actualPayments, setActualPayments] = useState<Customer[]>([]);
  const [fundraiser, setFundraiser] = useState<Fundraiser | undefined>(
    undefined
  );
  const [isMe, setIsMe] = useState(false);
  //if we have set up data or not
  const dataFetchedRef = useRef(false);
  let donationNumber = 0;

  useEffect(() => {
    if (!dataFetchedRef.current) {
    }
    dataFetchedRef.current = true;
  }, []);

  useEffect(() => {
    if (actualPayments.length > 0) {
      let cardDonations = donations.filter(donation => {
        if (!donation.cash) {
          return donation;
        }
      });
      console.log('Documented donations: ' + cardDonations.length);
      console.log('Actual donations: ' + actualPayments.length);
      //compare names
      actualPayments.map((payment, index) => {
        //remove middle initials
        if (payment.name.length > 0) {
          let matching = cardDonators.filter(
            donator =>
              normalizeName(donator.name) === normalizeName(payment.name)
          );
          if (matching.length === 1) {
            let donation = cardDonations.find(donation => donation.donatorId == matching[0].donatorId)
            if (donation && payment.amount === donation.amount) {
              // payment.date.getDate() === matching[0].received.getDate()
              //remove from each array
              let poping = actualPayments.splice(index, 1);
              let donationIndex = cardDonations.indexOf(donation);
              let popping = cardDonations.splice(donationIndex, 1);
              console.log(
                'Popping: ' + poping[0].name + ' : ' + popping[0].donatorId
              );
            }
          } else if (matching.length > 1) {
            console.log('Two!!!');
            matching.map(match => {
              console.log(match.donatorId);
            });
            //they donated more than once,
          }
        }
      });
      downloadFile(actualPayments, cardDonations);
      console.log('Documented Left: ' + cardDonations.length);
      console.log('Actual Left: ' + actualPayments.length);
      //compare dates and amounts
      // actualPayments.map((payment, index) => {
      //   if (payment.date) {
      //     let matching = cardDonations.filter(donation => {
      //       if (payment.amount === donation.amount) {
      //         var diffMs = payment.date - donation.received;
      //         var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
      //         if (diffMins < 5) {
      //           return donation;
      //         }
      //       }
      //     });
      //     if (matching.length === 1) {
      //       //remove from each array
      //       actualPayments.splice(index, 1);
      //       let donationIndex = cardDonations.indexOf(matching[0]);
      //       cardDonations.splice(donationIndex, 1);
      //     } else if (matching.length > 1) {
      //       console.log('Multiple!!!');
      //       matching.map(match => {
      //         console.log(match.donator);
      //       });
      //     }
      //   }
      // });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actualPayments]);

  function normalizeName(name: string): string {
    let tmp = name.trim().toLowerCase().split(' ');
    return tmp[0] + tmp[tmp.length - 1];
  }

  function getFundraiserPayout() {
    let totalCard = 0;
    let totalPayout = 0;
    let totalCardFees = 0;
    let totalMyFee = 0;

    donations.map(donation => {
      if (!donation.cash) {
        totalCard += donation.amount;
        let percentage = donation.amount * 0.03;
        let myFee = percentage;
        let cardFees = 0.3 + percentage;
        totalPayout += donation.amount - myFee - cardFees;
        totalCardFees += cardFees;
        totalMyFee += myFee;
      }
    });
    alert(
      'TotalCard: ' +
        totalCard +
        'TotalPayout: ' +
        totalPayout +
        ' TotalCardFee: ' +
        totalCardFees +
        ' TotalMyFee: ' +
        totalMyFee
    );
  }

  async function downloadFile(
    actualPayments: Customer[],
    cardDonations: Donation[]
  ) {
    let rows = actualPayments.map(Customer => ({
      name: Customer.name,
      amount: Customer.amount
    }));
    rows.push({
      name: '############',
      amount: 0
    });
    const rows2 = cardDonators.map(donator => ({
      name: donator.donatorId,
      amount: cardDonations.find(donation => donation.donatorId ==  donator.donatorId)?.amount ?? 0
    }));

    rows = rows.concat(rows2);

    /* generate worksheet and workbook */
    const worksheet = utils.json_to_sheet(rows);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Dates');

    /* fix headers */
    utils.sheet_add_aoa(
      worksheet,
      [
        [
          'Stripe - Name',
          'Stripe - Amount',
          '',
          'Actual - Name',
          'Actual - Amount'
        ]
      ],
      { origin: 'A1' }
    );

    /* calculate column width */
    const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet['!cols'] = [{ wch: max_width }];

    /* create an XLSX file and try to save to Presidents.xlsx */
    writeFile(workbook, 'Compare.xlsx');
  }

  async function getDonations(fields: any): Promise<void> {
    const fundraiserId = fields.target.idInput?.value;
    if (fundraiserId && typeof fundraiserId === 'string') {
      const [fund, error] = await fundraiserService.getFundraiser(fundraiserId);
      if (fund) {
        setFundraiser(fund);
      }
      if (fundraiserId) {
        let [donations, error] =
          await donationService.getDonationsByFundraiser(fundraiserId);
        if (error.length > 0) {
          console.error(error);
        }
        //sort by date amd time
        donations.sort((a, b) => {
          return (
            new Date(b.received).valueOf() - new Date(a.received).valueOf()
          );
        });

        let cardDonations = donations.filter(donation => {
          if (!donation.cash) {
            return donation;
          }
        });
        let donators = await donatorService.getDonators(cardDonations.map(donation => donation.donatorId))
        let [athletes, athleteError] = await athleteService.getAthletesByFundraiserId(fundraiserId)

        setDonations(donations);
        setDonationsToShow(donations);
        setCardDonators(donators);
        setAthletes(athletes);
      }
    }
  }

  async function showSpecificAthletesDonations(fields: any): Promise<void> {
    const athleteId = fields.target.idInput?.value;
    if (athleteId && typeof athleteId === 'string') {
      const selectedDonations: Donation[] = donations.filter(donation => {
        if (donation.athleteId === athleteId) {
          return donation;
        }
      });
      setDonationsToShow(selectedDonations);
    }
  }

  async function onAddOrgSubmit(fields: any) {
    let email = fields.target.emailInput?.value;
    let organization = fields.target.organizationInput?.value;
    const error = await coachService.addOrganizationToCoach(
      email,
      organization
    );
    if (error && error.length > 0) {
      alert(error);
    } else {
      alert('Done');
    }
  }

  async function onPayoutSubmit(fields: any) {
    let id = fields.target.id?.value;
    const [fund, error] = await fundraiserService.getFundraiser(id);
    if(fund){
      fund.fullyPaidOutDate = new Date();
      const error = await fundraiserService.updateFundraiser(fund);
      if (error && error.length > 0) {
        alert(error);
      } else {
        alert('Done');
        return;
      }
    }
    alert(error);
  }

  async function addToAthlete(fields: any, donation: Donation) {
    alert('Turned Off');
    // let athleteId = fields.target.idInput?.value;
    // const [athlete, athleteError] = await athleteService.getAthlete(
    //   athleteId,
    //   fundraiser?.id
    // );
    // if (athleteError && athleteError.length > 0) {
    //   alert(athleteError);
    // } else if (athlete) {
    //   const addingError = await athleteService.addDonation(
    //     athlete,
    //     donation.donationId
    //   );
    //   if (addingError && addingError.length > 0) {
    //     alert(addingError);
    //   } else {
    //     alert('Added to ' + athlete.name);
    //   }
    //   setWindowOpenFlag2(false);
    // }
  }

  async function cancelDonation(donationId: string) {
    if (fundraiser) {
      const donationError = await donationService.cancelDonation(donationId);
      if (donationError && donationError.length > 0) {
        alert(donationError);
      } else {
        alert('Canceled');
      }
    }
  }

  async function handleExcel(fields: any) {
    const file = fields.target.files[0];
    addViaExcel(file);
  }

  function addViaExcel(file: any) {
    // Create a new FileReader object
    const reader = new FileReader();

    // Read the file contents into a string
    reader.onload = async file => {
      // Parse the contents as an excel file
      const workbook = read(file.target?.result, { type: 'binary' });

      // Get names from each sheet and add to set
      let rows: string[] = [];
      workbook.SheetNames.forEach(function (sheetName) {
        utils
          .sheet_to_csv(workbook.Sheets[sheetName])
          .split('\n')
          .forEach(item => rows.push(item));
        // .forEach(item => athletesNames.add(item.substring(0, item.indexOf(",")).trim()));
      });
      let payments: Customer[] = [];
      //loop through each name on that sheet
      rows.forEach(str => {
        const array = str.split(',');
        // let payment: Payment = new Payment(
        //   array[20],
        //   array[2],
        //   array[1],
        //   array[0]
        // );
        let payment: Customer = new Customer(array[1], array[2]);
        if (!isNaN(payment.amount)) {
          payments.push(payment);
        }
      });
      setActualPayments(payments);
    };
    // Read the file
    reader.readAsArrayBuffer(file);
  }

  return (
    <StyledContainer>
      <SideLinkArea>
        <FormPopUpWindow
          title="Add New Organization To Coach"
          buttonName="Add New Organization To Coach"
          windowOpen={windowOpenFlag}
          setWindowOpenFlag={setWindowOpenFlag}
          buttonStyle={'dark'}
        >
          <Form>
            <form
              onSubmit={e => {
                e.preventDefault();
                onAddOrgSubmit(e);
              }}
            >
              <input
                type="text"
                name="email"
                id="emailInput"
                placeholder="Enter Coach email..."
                required
              />
              <input
                type="text"
                name="organization"
                id="organizationInput"
                placeholder="Organization Name"
                required
              />
              <FormButton type="submit">Add New Organization</FormButton>
            </form>
          </Form>
        </FormPopUpWindow>
        <PaddingDiv />
        <FormPopUpWindow
          title="Set Fundraiser Payout"
          buttonName="Set Fundraiser Payout"
          windowOpen={windowOpenFlag}
          setWindowOpenFlag={setWindowOpenFlag}
          buttonStyle={'dark'}
        >
          <Form>
            <form
              onSubmit={e => {
                e.preventDefault();
                onPayoutSubmit(e);
              }}
            >
              <input
                type="text"
                name="id"
                id="id"
                placeholder="Fundraiser Id"
                required
              />
              <FormButton type="submit">Set Fundraiser Payout</FormButton>
            </form>
          </Form>
        </FormPopUpWindow>
        <PaddingDiv />
        <form
          onSubmit={e => {
            e.preventDefault();
            showSpecificAthletesDonations(e);
          }}
        >
          <b>Show Athletes Donations: </b>
          <input type="text" className={'input'} id="idInput" required />
          <StyledButton>{'>'}</StyledButton>
        </form>
        <PaddingDiv />
        {fundraiser && donations.length > 0 && (
          <FormPopUpWindow
            title="Check athlete donations vs real"
            buttonName="Check athlete donations vs real"
            windowOpen={windowOpenFlag}
            setWindowOpenFlag={setWindowOpenFlag}
            buttonStyle={'dark'}
          >
            <>
              {/* <AthleteDonationVsReal
                athleteService={athleteService}
                donationService={donationService}
                donations={donations}
                fundraiserId={fundraiser.id}
                isOpen={windowOpenFlag}
              /> */}
            </>
          </FormPopUpWindow>
        )}
        <PaddingDiv />
        {fundraiser && donations.length > 0 && (
          <>
            <p>Check Stripe vs Card Payments</p>
            <input type="file" accept=".csv" onChange={handleExcel} />
          </>
        )}
        <PaddingDiv />
        {fundraiser && donations.length > 0 && (
          <Button variant="dark" onClick={getFundraiserPayout}>
            Calculate Payout
          </Button>
        )}
      </SideLinkArea>

      <form
        onSubmit={e => {
          e.preventDefault();
          getDonations(e);
        }}
      >
        <b>Fundraiser Id: </b>
        <input type="text" className={'input'} id="idInput" required />
        <StyledButton>{'>'}</StyledButton>
      </form>

      <MDBTable className="table table-striped">
        <MDBTableHead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Donator</th>
            <th scope="col">Date</th>
            <th scope="col">Failed</th>
            <th scope="col">Type</th>
            <th scope="col">Athlete</th>
            <th scope="col">AthleteId</th>
            <th scope="col">Amount</th>
            <th scope="col">Add to Athlete</th>
            <th scope="col">Cancel</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {donationsToShow.map((donation: Donation) => {
            donationNumber = donationNumber + 1;
            return (
              <tr key={donationNumber}>
                <td>{donation.donationId}</td>
                <td>{cardDonators.find(donator => donator.donatorId === donation.donatorId)?.name ?? ''}</td>
                <td>{donation.received.toDateString()}</td>
                <td>{donation.completed ? '' : 'Failed'}</td>
                <td>{donation.cash ? 'Cash' : ''}</td>
                <td>{athletes.find(athlete => athlete.userId === donation.athleteId)?.name ?? ''}</td>
                <td>{donation.athleteId}</td>
                <td>{donation.amount}</td>
                <td>
                  <FormPopUpWindow
                    title="Add to Athlete"
                    buttonName="Add to Athlete"
                    windowOpen={windowOpenFlag2}
                    setWindowOpenFlag={setWindowOpenFlag2}
                  >
                    <form
                      className={'form'}
                      onSubmit={e => {
                        e.preventDefault();
                        addToAthlete(e, donation);
                      }}
                    >
                      <label>
                        <span>Athlete id: </span>
                        <input type="text" id="idInput" />
                      </label>
                      <FormButton type="submit">Add</FormButton>
                    </form>
                  </FormPopUpWindow>
                </td>
                <td>
                  <VerifyPopUpWindow
                    title="Cancel"
                    buttonName="Cancel"
                    submitButtonName="Cancel"
                    buttonClick={() => cancelDonation(donation.donationId)}
                  >
                    You sure you want to remove donation?
                  </VerifyPopUpWindow>
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </StyledContainer>
  );
};

export default Admin;
