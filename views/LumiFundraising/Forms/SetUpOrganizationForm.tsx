import Coach from '../../../models/LumiFundraising/Users/Coach';
import { Form, FormButton } from '../../../styles/SharedStyles';
import emailjs from '@emailjs/browser';

function SetUpOrganizationForm({
  setWindowOpenFlag,
  coach
}: {
  setWindowOpenFlag: Function;
  coach: Coach | undefined;
}) {

  async function onSubmit(fields: any) {
    const templateParams = {
      nameInput: fields.target.nameInput.value,
      emailInput: fields.target.emailInput.value,
      organizationInput: fields.target.organizationInput.value,
      titleInput: fields.target.titleInput.value
      // logoInput: fields.target.logoInput.value
    };
    setWindowOpenFlag(true);
    emailjs
      .send(
        'service_xs0c0jr',
        'template_szt52si',
        templateParams,
        'Zkbx45WjmPPGRw3ho'
      )
      .then(
        function () {
          console.log('Sent');
        },
        function (error: any) {
          alert('OOPs something went wrong... Try again later');
          console.log('FAILED...', error);
        }
      );
  }

  return (
    <Form>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e);
        }}
      >
        <input
          type="text"
          name="name"
          id="nameInput"
          defaultValue={coach?.userName}
          placeholder="Enter your Name..."
          required
        />
        <input
          type="email"
          name="email"
          id="emailInput"
          defaultValue={coach?.email}
          placeholder="Enter Your Email..."
          required
        />
        <input
          type="text"
          name="organization"
          id="organizationInput"
          placeholder="Organization Name"
          required
        />
        <input
          type="text"
          name="title"
          id="titleInput"
          placeholder="Title at Organization"
          required
        />
        {/* <Title>
          Logo
          <ToolTip message="The Logo will be displayed during donation." />
        </Title>
        <input
          type="file"
          name="logo"
          id="logoInput"
          accept="image/png, image/gif, image/jpeg"
          placeholder="Logo"
          required
        /> */}
        <FormButton type="submit">Submit New Organization</FormButton>
      </form>
    </Form>
  );
}

export default SetUpOrganizationForm;
