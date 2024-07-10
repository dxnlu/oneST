import { FormEvent, useState } from "react";

const UENValidator = () => {
  // prettier-ignore
  const entityTypeIndicator = [
    'LP', 'LL', 'FC', 'PF', 'RF', 'MQ', 'MM', 'NB', 'CC', 'CS', 
    'MB', 'FM', 'GS', 'GA', 'GB', 'DP', 'CP', 'NR', 'CM', 'CD', 
    'MD', 'HS', 'VH', 'CH', 'MH', 'CL', 'XL', 'CX', 'RP', 'TU', 
    'TC', 'FB', 'FN', 'PA', 'PB', 'SS', 'MC', 'SM'
  ];

  const [msg, setMsg] = useState("");
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Function to handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const uen = String(formData.get("uen"));
    const uenStrArray = uen.split("");

    // Check for empty form
    if (!uen || uen === "") {
      setIsDisplayed(true);
      setMsg("No UEN received. Please input a valid UEN.");
      showAlert(false);
      return;
    }
    // Check for UEN Format - 9 or 10 digits
    if (uen.length < 9 || uen.length > 10) {
      setIsDisplayed(true);
      setMsg("Invalid UEN. UEN format should be 9 or 10 digits");
      showAlert(false);
      return;
    }

    // Check if last digit is a letter only, assuming no logic in generation
    if (
      typeof uenStrArray[uenStrArray.length - 1] === "string" &&
      !isNaN(Number(uenStrArray[uenStrArray.length - 1]))
    ) {
      setIsDisplayed(true);
      setMsg("Invalid UEN. Last digit should be a letter");
      showAlert(false);
      return;
    }

    // (A) Businesses registered with ACRA
    if (uenStrArray.length === 9) {
      // Check if first 8 digits are numbers
      for (let i = 0; i < uenStrArray.length - 1; i++) {
        if (isNaN(Number(uenStrArray[i]))) {
          setIsDisplayed(true);
          setIsValid(false);
          setMsg(
            "(A) Invalid UEN. There are non-numbers in the first 8 digits."
          );
          showAlert(false);
          return;
        }
      }

      // (A) Successful
      setIsDisplayed(true);
      setIsValid(true);
      showAlert(true);
      setMsg(
        "Success! UEN is registered under (A) Businesses registered with ACRA."
      );

      return;
    }
    // (B) + (C) Logic
    else if (uenStrArray.length === 10) {
      // (B) Local companies registered with ACRA
      if (!isNaN(Number(uenStrArray[0]))) {
        for (let i = 0; i < uenStrArray.length - 1; i++) {
          if (isNaN(Number(uenStrArray[i]))) {
            setIsDisplayed(true);
            setMsg(
              "(B) Invalid UEN. There are non-numbers in the first 9 digits."
            );
            showAlert(false);
            return;
          }
        }
        // (B) Successful
        setIsDisplayed(true);
        setIsValid(true);
        showAlert(true);
        setMsg(
          "Success! UEN is registered under (B) Local companies registered with ACRA."
        );
        return true;
      }
      // (C) All other entities which will be issued new UEN
      else {
        // Check if first digit is T, S or R
        if (!["T", "S", "R"].includes(uenStrArray[0])) {
          setIsDisplayed(true);
          setMsg(
            "(C) Invalid UEN. 1st character is invalid for Year of Issurance."
          );
          showAlert(false);
          return;
        }

        // Check if 2nd and 3rd digits are numbers
        if (isNaN(Number(uenStrArray[1])) || isNaN(Number(uenStrArray[2]))) {
          setIsDisplayed(true);
          setMsg("(C) Invalid UEN. Year of Issurance is invalid.");
          showAlert(false);
          return;
        }

        // Check if entity-type matches, assuming PQ is not case sensitive
        const entityType = (
          String(uenStrArray[3]) + String(uenStrArray[4])
        ).toUpperCase();
        if (!entityTypeIndicator.includes(entityType)) {
          setIsDisplayed(true);
          setMsg("(C) Invalid UEN. Entity-Type Indicator is invalid.");
          showAlert(false);
          return;
        }

        // Check if remaining digits are numbers
        if (
          isNaN(Number(uenStrArray[5])) ||
          isNaN(Number(uenStrArray[6])) ||
          isNaN(Number(uenStrArray[7])) ||
          isNaN(Number(uenStrArray[8]))
        ) {
          setIsDisplayed(true);
          setMsg("(C) Invalid UEN. 6th to 9th digits are invalid.");
          showAlert(false);
          return false;
        }

        // (C) Successful
        setIsDisplayed(true);
        setIsValid(true);
        showAlert(true);
        setMsg(
          "Success! UEN is registered under (C) All other entities which will be issued new UEN'."
        );
        return;
      }
    }
  };

  const showAlert = (isValid: boolean) => {
    const alertDiv = document.getElementById("alertDiv");
    if (alertDiv) {
      alertDiv.classList.remove("d-none", "alert-danger", "alert-success");
      alertDiv.classList.add(
        "alert",
        isValid ? "alert-success" : "alert-danger"
      );
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="uenInput" className="form-label">
            Verify a UEN (Unique Entity Number)
          </label>
          <div className="input-group mb-3">
            <input
              id="uen"
              name="uen"
              type="text"
              className="form-control"
              placeholder="Input UEN here"
            />
            <button className="btn btn-primary" type="submit">
              Verify
            </button>
          </div>
          <div id="uenHelpBlock" className="form-text mb-3">
            UEN is the standard identification number of an entity. UEN shall be
            for registered entities as NRIC is for Singapore citizens. The UEN
            uniquely identifies the entity.
            <br></br>
            <br />
            The validation criteria for UEN can be found{" "}
            <a href="https://www.uen.gov.sg/ueninternet/faces/pages/admin/aboutUEN.jspx">
              here
            </a>
            .
          </div>
          <div
            id="alertDiv"
            className={`alert ${
              isDisplayed && isValid ? "alert-success" : "alert-danger"
            } ${isDisplayed ? "" : "d-none"}`}
            role="alert"
          >
            {msg}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UENValidator;
