/* eslint-disable react-hooks/exhaustive-deps */
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LocalButton from '../../../views/LinkButton';
import DocData from '../../../models/LumiFundraising/DocData';
import Docxtemplater from 'docxtemplater';
import saveAs from 'file-saver';
import PizZip from 'pizzip';
import emailjs from '@emailjs/browser';
import StyledContainer from '../../../views/StyledContainer';
import { Center } from '../../../styles/SharedStyles';
import DonationService from '../../../services/LumiFundraising/DonationService';
import DonatorService from '../../../services/LumiFundraising/DonatorService';
import EmailService from '../../../services/LumiFundraising/EmailService';

const Success: NextPage = () => {
  let PizZipUtils: any = null;
  /**
   * Var for getting param from route
   */
  const router = useRouter();
  let data = router.query;
  let donationId = data.donationId;
  let fundraiserId = data.fundraiserId;
  let donationService = new DonationService();
  let donatorService = new DonatorService();
  let emailService = new EmailService();
  let docData: DocData;

  async function validatePayment(donationId: string | string[] | undefined) {
    if (
      donationId &&
      typeof donationId === 'string' &&
      fundraiserId &&
      typeof fundraiserId === 'string'
    ) {
      let [donation, error] = await donationService.getDonation(donationId);
      if (donation && error.length === 0) {
        donationService.validateDonation(donationId, true);
        let name = await donatorService.getDonatorName(donation.donatorId);
        docData = new DocData(formatDate(new Date()), name, formatAmount(donation.amount));
      } else {
        console.error('Error finding donationId: ' + donationId);
        emailService.notifyOfError('Error finding donationId', "fundraiserId: " + fundraiserId + " - donationId: " + donationId, '');
      }
    }
  }

  function formatDate(date: Date): string{
    return date.toDateString();
  }

  function formatAmount(amount: number): string{
    return amount.toFixed(2)
  }

  function generateDocument(): void {
    PizZipUtils?.getBinaryContent(
      '/assets/docs/DRHSDonationLetter.docx',
      processFile
    );
  }

  function processFile(error: any, content: PizZip.LoadData) {
    if (error) {
      throw error;
    }
    var zip = new PizZip(content);
    var doc = new Docxtemplater().loadZip(zip);
    doc.setData(docData);
    try {
      // render the document (replace all occurrences of {first_name} by John, {last_name} by Doe, ...)
      doc.render();
    } catch (error: any) {
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
      function replaceErrors(key: any, value: any) {
        if (value instanceof Error) {
          return Object.getOwnPropertyNames(value).reduce(function (
            error: any,
            key: any
          ) {
            error[key] = (value as any)[key];
            return error;
          }, {});
        }
        return value;
      }
      console.log(JSON.stringify({ error: error }, replaceErrors));

      if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors
          .map(function (error: { properties: { explanation: any } }) {
            return error.properties.explanation;
          })
          .join('\n');
        console.error('ErrorMessages', errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
      }
      throw error;
    }
    let finalDoc = doc.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
    // Output the document using Data-URI
    saveAs(finalDoc, 'DRHSTrackDonationReceipt.docx');
  }

  useEffect(() => {
    validatePayment(donationId);
    if (typeof window !== 'undefined') {
      import('pizzip/utils/index.js').then(function (r) {
        PizZipUtils = r;
      });
    }
  }, [donationId]);

  return (
    <StyledContainer center={true}>
        <Center>
          Success! Your payment has been processed. Thank you for your support!
        </Center>
        <br />
        <h5>Download tax recept</h5>
        <LocalButton onClick={generateDocument}>Download</LocalButton>
    </StyledContainer>
  );
};

export default Success;
