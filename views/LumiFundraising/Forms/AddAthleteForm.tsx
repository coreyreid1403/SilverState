import React, { useState } from 'react';
import Fundraiser from '../../../models/LumiFundraising/Fundraiser';
import AthleteService from '../../../services/LumiFundraising/AthleteService';
import ToolTip from '../../ToolTip';
import styled from 'styled-components';
import { MediumSpacing, FormButton } from '../../../styles/SharedStyles';

const Titles = styled.p`
  font-weight: bold;
`;

const Center = styled.div`
  padding: 10px;
  text-align: center;
`;

/**
 * The donation form
 * @param props
 * @returns
 */
// @ts-ignore
function AddAthleteForm({
  fundraiser,
  athleteService,
  submit,
  setWindowOpenFlag,
  setRefresh
}: {
  fundraiser: Fundraiser;
  athleteService: AthleteService;
  submit: Function;
  setWindowOpenFlag: Function;
  setRefresh: Function;
}) {
  const [file, setFile] = useState<any>(undefined);

  function onSubmit(e: any) {
    if (file) {
      handleSubmitFile();
    }
    submit(e);
    setWindowOpenFlag(true);
  }

  /**
   * Process the excel
   */
  async function handleSubmitFile() {
    athleteService.addViaExcel(
      fundraiser.id,
      fundraiser.athleteGoal,
      file,
      setRefresh
    );
  }

  /**
   * set the excel
   */
  async function handleExcel(fields: any) {
    setFile(fields.target.files[0]);
  }

  return (
    <form
      className={'form'}
      onSubmit={e => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <p>
        <b>Fundraiser: </b>
        {fundraiser.name}
      </p>
      <Center>
        <Titles>Add Single Athlete</Titles>
        <label>
          <span>Athlete Name: </span>
          <input type="text" id="nameInput" />
        </label>
        <MediumSpacing />
        <p>Or</p>
        <Titles>
          Add Multiple Athletes{' '}
          <ToolTip message="Input an Excel file with all athletes names in column 1. Leave the rest of the file blank" />
        </Titles>
        <input
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleExcel}
        />
        <MediumSpacing />
        <FormButton type="submit">Add</FormButton>
      </Center>
    </form>
  );
}

export default AddAthleteForm;
