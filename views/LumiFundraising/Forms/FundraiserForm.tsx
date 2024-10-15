import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import Coach from '../../../models/LumiFundraising/Users/Coach';
import Fundraiser from '../../../models/LumiFundraising/Fundraiser';
import { FundraiserTypes } from '../../../models/LumiFundraising/enums';
import CoachService from '../../../services/LumiFundraising/CoachService ';
import FundraiserService from '../../../services/LumiFundraising/FundraiserService';
import globalFormStyle from '../../../styles/LumiFundraising/views/FormStyle';
import FundraiserGlobalVariables from '../../../util/LumiFundraising/FundraiserGlobalVariables';
import ToolTip from '../../ToolTip';

/**
 * The fundraiser form
 * @param props
 * @returns
 */
function FundraiserForm({
  primary,
  secondary,
  setPrimary,
  setSecondary
}: {
  primary: string;
  secondary: string;
  setPrimary: Function;
  setSecondary: Function;
}) {
  //if we have set up data or not
  const dataFetchedRef = useRef(false);
  const router = useRouter();
  const fundraiserService = new FundraiserService();
  const coachService = new CoachService();
  let globals = FundraiserGlobalVariables.getInstance();
  const globalFormStyleString = globalFormStyle();

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [invertFontColor, setInvertFontColor] = useState<boolean>(false);

  const [showStudentRaffle, setShowStudentRaffle] = useState<boolean>(false);
  const today: Date = new Date();
  //allow 6 months ahead of time
  const maxAllowDate: Date = new Date(today.setMonth(today.getMonth() + 6));
  const [teams, setTeams] = useState<string[]>([]);
  const [showTeamsErrorPopup, setShowTeamsErrorPopup] = useState<boolean>(false);

  const types = Object.keys(FundraiserTypes)
    .filter((key: any) => isNaN(key))
    .map((key, index) => ({
      value: index,
      label: key
    }));
  const [selectedTypes, setSelectedTypes] = useState<number>(0);

  /**
   * var for error popup
   */
  const [showPopUP, setShowPopUP] = useState(false);
  const togglePopUp = () => setShowPopUP(!showPopUP);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!dataFetchedRef.current) {
      getTeams();
    }
    dataFetchedRef.current = true;
  }, []);

  React.useEffect(() => {}, []);

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append('myImage', selectedFile);
      console.log(selectedFile);
      const data = await fundraiserService.processImage(formData);
      console.log(data);
    } catch (error: any) {
      console.error(error.response?.data);
    }
    setUploading(false);
  };

  async function onSubmit(fields: any) {
    //TODO: Code to save phots, should work, but future work
    // handleUpload();
    let types: number = 0;

    let startDateString: string = fields.target.dateInput.value;
    let startDate: Date = new Date(
      startDateString.replace(/-/g, '/').replace(/T.+/, '')
    );
    let name: string = fields.target.nameInput.value;
    let athleteGoal: number = Number(fields.target.athleteGoalInput.value);
    let overallGoal: number = Number(fields.target.overallGoalInput.value);
    let address: string = fields.target.addressInput.value;
    let addressee: string = fields.target.addresseeInput.value;
    // let logo = URL.createObjectURL(fields.target.teamLogoInput.value);
    // let coachHead = URL.createObjectURL(fields.target.coachInput.value);
    let quote: string = fields.target.quoteInput.value;
    let team: string = fields.target.teamsInput.value;

    if (!team) {
      setErrorMessage('Invalid team');
      togglePopUp();
      return;
    }
    let coach: Coach | undefined = await globals?.getCoach();
    if (coach == undefined) {
      setErrorMessage('Coach could not be found.');
      togglePopUp();
      router.push(`/LumiFundraising/login`);
      return;
    }
    let fundraiser = new Fundraiser(
      name,
      team,
      fundraiserService.getTeamId(team),
      coach.email,
      primary,
      secondary,
      invertFontColor,
      startDate,
      selectedTypes,
      athleteGoal,
      overallGoal,
      address,
      addressee,
      'Sample message for athlete',
      quote
    );
    let creationError = await fundraiserService.createFundraiser(fundraiser);
    if (creationError.length === 0) {
      coachService.addFundraiserId(fundraiser?.id, coach);
      let error = await globals?.setCoach(coach);
      if (error && error.length > 0) {
        console.error('Error setting coach with fundraiser: ' + error);
        setErrorMessage(error);
        togglePopUp();
      } else {
        router.push(`/LumiFundraising/fundraisers`);
      }
    } else {
      console.error('Error setting coach with fundraiser: ' + creationError);
      setErrorMessage(creationError);
      togglePopUp();
    }
  }

  function primaryColorChange(input: any) {
    setPrimary(input.target.value);
  }

  function secondaryColorChange(input: any) {
    setSecondary(input.target.value);
  }

  function updateTypes(input: any) {
    let types = 0;
    input?.map((selected: any) => {
      types += Number(FundraiserTypes[selected.label]);
    });
    console.log(types);
    setSelectedTypes(types);
  }

  async function getTeams() {
    const coach = await globals?.getCoach();
    if (coach && coach.teams && coach.teams.length > 0) {
      if(coach.teams && coach.teams.length > 0){
        setTeams(coach.teams);
      }
      else{
        setShowTeamsErrorPopup(true);
      }
    }
  }

  const multiStyles: StylesConfig<any, true> = {
    control: styles => ({
      ...styles,
      backgroundColor: primary,
      borderColor: secondary,
      boxShadow: 'inset 1px 1px 4px ' + secondary,
      width: '100%'
    }),
    dropdownIndicator: styles => ({ ...styles, color: 'white' }),
    menu: styles => ({ ...styles, background: primary }),
    placeholder: styles => ({ ...styles, color: 'white' }),
    clearIndicator: styles => ({
      ...styles,
      color: 'white',
      ':hover': {
        backgroundColor: 'red'
      }
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: primary,
        ':active': {
          ...styles[':active'],
          backgroundColor: secondary
        }
      };
    },
    multiValue: styles => {
      return {
        ...styles,
        backgroundColor: primary
      };
    },
    multiValueLabel: styles => ({
      ...styles,
      color: 'white'
    }),
    multiValueRemove: styles => ({
      ...styles,
      color: 'white',
      ':hover': {
        backgroundColor: 'red'
      }
    })
  };

  return (
    <form
      className={'form'}
      onSubmit={e => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <style jsx global>
        {globalFormStyleString}
      </style>
      <style jsx>{`
        .fieldset {
          background: ${primary};
          border: 1px solid ${secondary};
          box-shadow: inset 0px 0px 15px ${secondary};
          -moz-box-shadow: inset 0px 0px 15px ${secondary};
          -webkit-box-shadow: inset 0px 0px 15px ${secondary};
        }
        .label > span {
          color: ${invertFontColor ? '#000000' : '#ffffff'};
          font-weight: ${invertFontColor ? 'bold' : 'none'};
        }
        .label > p {
          color: ${invertFontColor ? '#000000' : '#ffffff'};
        }
        .fieldset legend {
          color: ${invertFontColor ? '#000000' : '#ffffff'};
          border-top: 1px solid ${secondary};
          border-left: 1px solid ${secondary};
          border-right: 1px solid ${secondary};
          background: ${primary};
          box-shadow: -0px -1px 2px ${secondary};
          -moz-box-shadow: -0px -1px 2px ${secondary};
          -webkit-box-shadow: -0px -1px 2px ${secondary};
        }
        .input {
          border: 1px solid ${secondary};
          color: ${invertFontColor ? '#000000' : '#ffffff'};
          background: ${primary};
        }
        .input[type='text'],
        .input[type='date'],
        .input[type='datetime'],
        .input[type='number'],
        .input[type='search'],
        .input[type='time'],
        .input[type='url'],
        .input[type='email'],
        .input[type='file'],
        .select,
        .textarea {
          box-shadow: inset 1px 1px 4px ${secondary};
          -moz-box-shadow: inset 1px 1px 4px ${secondary};
          -webkit-box-shadow: inset 1px 1px 4px ${secondary};
        }
        .input[type='submit'],
        .input[type='button'] {
          font-weight: ${invertFontColor ? 'bold' : 'none'};
          box-shadow: inset -1px -1px 3px ${secondary};
          -moz-box-shadow: inset -1px -1px 3px ${secondary};
          -webkit-box-shadow: inset -1px -1px 3px ${secondary};
        }
        .button {
          box-shadow: inset -1px -1px 3px ${primary};
          -moz-box-shadow: inset -1px -1px 3px ${primary};
          -webkit-box-shadow: inset -1px -1px 3px ${primary};
          color: ${invertFontColor ? '#000000' : '#ffffff'};
          background: ${secondary};
        }
      `}</style>

      <fieldset className="fieldset">
        <legend>Create Fundraiser</legend>
        <label htmlFor="field3" className={'label'}>
          <span>Fundraiser Name</span>
          <input type="text" className={'input'} id="nameInput" required />
        </label>
        <label htmlFor="field1" className={'label'}>
          <span>
            Program
            <ToolTip message="Don't see your program? Add Request it to be added via the button on the previous screen" />
          </span>
          <select
            name="teams"
            id="teamsInput"
            className={'input'}
            // defaultValue={'DEFAULT'}
            required
          >
            {/*//TODO: Only show coaches programs */}
            <option disabled value="">
              {' '}
              -- Select Organization --{' '}
            </option>
            {teams.map(team => {
              return (
                <option key={team} value={team}>
                  {team}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="field4" className={'label'}>
          <span>Start Date</span>
          <input type="date" className={'input'} id="dateInput" required />
          {/*//TODO: min={today.toISOString()} max={maxAllowDate.toDateString()} */}
        </label>
        <label htmlFor="field4" className={'label'}>
          <span>Type</span>
          <Select
            isMulti
            name="FundType"
            options={types}
            isClearable={true}
            onChange={change => updateTypes(change as any)}
            styles={multiStyles}
          />
        </label>
        <label htmlFor="field5" className={'label'}>
          <span>Athlete Goal</span>
          <input
            type="number"
            className={'input'}
            id="athleteGoalInput"
            pattern="\d*"
            required
          />
        </label>
        <label htmlFor="field6" className={'label'}>
          <span>Overall Goal</span>
          <input
            type="number"
            className={'input'}
            id="overallGoalInput"
            pattern="\d*"
            required
          />
        </label>
        <label htmlFor="field7" className={'label'}>
          <span>
            Payout Address{' '}
            <ToolTip
              message="Address of school for check payout."
              invert={invertFontColor}
            />
          </span>
          <input type="text" className={'input'} id="addressInput" required />
        </label>
        <label htmlFor="field7" className={'label'}>
          <span>
            Payout Addressee{' '}
            <ToolTip
              message="Who payout should be addressed to."
              invert={invertFontColor}
            />
          </span>
          <input type="text" className={'input'} id="addresseeInput" required />
        </label>
      </fieldset>

      <fieldset className={'fieldset'}>
        <legend>Customize Donation Form</legend>
        <label htmlFor="field3" className={'label'}>
          <span>
            Primary Color{' '}
            <ToolTip
              message="Choose the colors for your donation form. Your donation form will look exactly how this form does after you change the colors."
              invert={invertFontColor}
            />
          </span>
          <input
            type="color"
            id="primaryInput"
            className={'input'}
            onChange={e => primaryColorChange(e)}
          />
        </label>
        <label htmlFor="field1" className={'label'}>
          <span>Secondary Color</span>
          <input
            type="color"
            id="secondaryInput"
            className={'input'}
            onChange={e => secondaryColorChange(e)}
          />
        </label>
        <label htmlFor="field1" className={'label'}>
          <span>Invert Text Color</span>
          <input
            type="checkbox"
            id="invertInput"
            className={'input'}
            onChange={() => setInvertFontColor(!invertFontColor)}
          />
        </label>
        {/* <label htmlFor="field4" className={"label"}>
          <span>Team Logo</span>
          <input
            type="file"
            className={"input"}
            id="teamLogoInput"
            accept="image/png, image/gif, image/jpeg"
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];
                setSelectedFile(file);
              }
            }}
          />
        </label>
        <label htmlFor="field5" className={"label"}>
          <span>Coach Head shot</span>
          <input
            type="file"
            id="coachInput"
            accept="image/png, image/gif, image/jpeg"
            className={"input"}
          />
        </label> */}
        <label htmlFor="field6" className={'label'}>
          <span>
            Quote{' '}
            <ToolTip
              message="A message to the donators that will display at the top of the donation page."
              invert={invertFontColor}
            />
          </span>
          <textarea
            className={'input'}
            name="postContent"
            id="quoteInput"
            rows={5}
          />
        </label>
        <input type="submit" value="Create" className={'button'} />
      </fieldset>
    </form>
  );
}

export default FundraiserForm;
