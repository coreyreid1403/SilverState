export default function globalFormStyle() {

return `
  .container {
    padding: 0 2rem;
  }

  .main {
    min-height: 100vh;
    padding: 4rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .form {
    display: inline-block;
    max-width: 450px;
    font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  }

  .label {
    display: block;
    margin-bottom: 10px;
    padding: 5px;
    text-align: left;
  }

  .label > span {
    float: left;
    width: 100px;
    font-size: 13px;
    width: 300px;
  }

  .label > div {
    display: inline-block;
    padding: 5px;
    font-size: 13px;
    margin-left: auto;
    text-align: center;
    width: 50%;
  }

  .label > title {
    display: inline-block;
    padding: 5px;
    font-size: 13px;
    width: 150px;
    margin-right: auto;
  }

  .fieldset {
    border-radius: 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    margin: 0px 0px 10px 0px;
    padding: 20px;
    margin-top: 25px;
    margin-bottom: 25px;
    display: inline-block;
    vertical-align: top;
  }

  .fieldset legend {
    border-radius: 5px 5px 0px 0px;
    -webkit-border-radius: 5px 5px 0px 0px;
    -moz-border-radius: 5px 5px 0px 0px;
    padding: 0px 8px 3px 8px;
    font-weight: normal;
    font-size: 12px;
    margin-top: -30px;
    width: 100px;
  }

  .textarea {
    width: 250px;
    height: 100px;
  }

  .input[type="text"],
  .input[type="date"],
  .input[type="number"],
  .input[type="search"],
  .input[type="time"],
  .input[type="url"],
  .input[type="email"],
  .select,
  .textarea {
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    outline: none;
    padding: 5px 8px 5px 8px;
    width: 50%;
  }

  .button {
    border-style: outset;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    outline: none;
    padding: 5px 8px 5px 8px;
    width: 50%;
    font: bold15px arial,sans-serif;
    text-shadow: none;
  }
`;
}