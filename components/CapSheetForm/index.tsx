import React, { useState } from "react";

import { useRouter } from "next/router";

import PageLayout from "../PageLayout";
import FormLayout from "../FormLayout";
import RadioGroup from "../RadioGroup";
import GridWrapper from "../GridWrapper";
import { isRequired } from "../../validators";
import {
  getCurrentStepStateName,
  getFlowProgressString,
  getNextRoute
} from "../../utils/flow";
import { alphabeticalOptionsSort } from "../../utils/arraySort";

export const validator = isRequired("Please select an option.");

/********
 * Note: This file depends on the the Base Sheet and Cap Sheet
 * steps existing earlier in the flow.
 ********/

const CapSheetForm = ({
  formState,
  steps,
  setFormState,
  groupedResults,
  allResults
}) => {
  const router = useRouter();

  const [showError, setShowError] = useState(false);
  const stepName = "Cap Sheet";
  const stateName = getCurrentStepStateName(steps, stepName);

  const handleSelection = (event: React.FormEvent<HTMLInputElement>) => {
    setShowError(false);

    const option = allResults.filter(
      result => result.id === event.currentTarget.value
    );

    setFormState({
      ...formState,
      [stateName]: option[0]
    });
  };

  const currentSelection =
    (formState[stateName] && formState[stateName].id) || "";

  const errorMessage = validator(currentSelection);

  return (
    <PageLayout
      errorMessage={errorMessage}
      showError={showError}
      headTitle={`${stepName} | IKO`}
      onSubmit={() => {
        if (errorMessage) {
          setShowError(true);
        } else {
          router.push(
            getNextRoute({
              steps,
              currentStepName: stepName
            })
          );
        }
      }}
      stepName={stepName}
      steps={steps}
    >
      <FormLayout
        stepText={getFlowProgressString(steps, stepName)}
        title={`Select the ${stepName.toLowerCase()}`}
      >
        <GridWrapper largeGrid={3}>
          {Object.keys(groupedResults).map(key => {
            const options = groupedResults[key].options
              .map(result => {
                return {
                  value: result.id,
                  label: result.data.name[0].text
                };
              })
              .sort(alphabeticalOptionsSort);

            return (
              <div key={key}>
                <RadioGroup
                  name={stateName}
                  options={options}
                  selected={currentSelection}
                  onChange={handleSelection}
                />
              </div>
            );
          })}
        </GridWrapper>
      </FormLayout>
    </PageLayout>
  );
};

export default CapSheetForm;
