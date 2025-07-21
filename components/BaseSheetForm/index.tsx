import React, { useState } from "react";

import { useRouter } from "next/router";

import PageLayout from "../../components/PageLayout";
import FormLayout from "../../components/FormLayout";
import RadioGroup from "../../components/RadioGroup";
import GridWrapper from "../GridWrapper";
import { isRequired } from "../../validators";
import {
  getCurrentStepStateName,
  getFlowProgressString,
  getNextRoute
} from "../../utils/flow";

export const validator = isRequired("Please select an option.");

/********
 * Note: This file depends on the Cap Sheet
 * step existing earlier in the flow.
 ********/

const BaseSheetForm = ({
  results,
  formState,
  steps,
  setFormState,
  stepName
}) => {
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  const stateName = getCurrentStepStateName(steps, stepName);
  const [baseSheetRequired, setBaseSheetRequired] = React.useState(undefined);

  React.useEffect(() => {
    setBaseSheetRequired(
      formState.capSheet &&
        formState.capSheet.data.requires_base_sheet === "yes"
    );
  }, [formState.capSheet]);

  const handleSelection = (event: React.FormEvent<HTMLInputElement>) => {
    setShowError(false);

    const option = results.filter(
      result => result.id === event.currentTarget.value
    )[0];

    setFormState({
      ...formState,
      [stateName]: option
    });
  };

  const options = results.map(result => {
    return {
      value: result.id,
      label: result.data.name[0].text
    };
  });

  const foundOption =
    baseSheetRequired &&
    formState[stateName] &&
    options.find(option => option.id === formState[stateName].id);

  const currentSelection =
    (baseSheetRequired && foundOption && foundOption.id) ||
    (baseSheetRequired && formState[stateName] && formState[stateName].id) ||
    "";

  const errorMessage = baseSheetRequired && validator(currentSelection);

  const renderContent = () => {
    return baseSheetRequired ? (
      <>
        <GridWrapper>
          <RadioGroup
            name={stateName}
            options={options}
            selected={currentSelection}
            onChange={handleSelection}
          />
        </GridWrapper>
      </>
    ) : (
      <p>
        {formState.capSheet.data.name[0].text} cap sheet does not require a base
        sheet. You can continue to the next step.
      </p>
    );
  };

  return (
    <PageLayout
      errorMessage={errorMessage}
      showError={showError}
      headTitle={`${stepName} | IKO`}
      onSubmit={() => {
        if (errorMessage) {
          setShowError(true);
        } else {
          // The only CoverBoard that does not require a Base Sheet is Unilay 750 and it
          // always requires a Cap Sheet
          if (!baseSheetRequired) {
            setFormState({
              ...formState,
              [stateName]: {
                id: "na",
                data: {
                  requires_cover_board: "yes",
                  name: "Base Sheet not required"
                }
              }
            });
          }

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
        {baseSheetRequired !== undefined ? renderContent() : null}
      </FormLayout>
    </PageLayout>
  );
};

export default BaseSheetForm;
