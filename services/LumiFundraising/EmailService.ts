import emailjs from '@emailjs/browser';

export default class EmailService {

  /**
   * Adds new Donator to database
   * @returns
   */
    public notifyOfError(
      locationOfError: string,
      error: string,
      errorObject: any
    ): void {      
      const templateParams = {
        message: locationOfError + " --- " + error + " --- Object: " + JSON.stringify({ errorObject })
      };
      emailjs
      .send(
        'service_xs0c0jr',
        'template_85l6fue',
        templateParams,
        'Zkbx45WjmPPGRw3ho'
      )
    }
}
