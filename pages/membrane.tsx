import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { NRFlowContext } from "../components/NRFlowContext";
import PageLayout from "../components/PageLayout";
import FormLayout from "../components/FormLayout";
import RadioGroup from "../components/RadioGroup";
import useRedirectOnEmptyForm from "../components/useRedirectOnEmptyForm";
import { isRequired } from "../validators";
import { generateMembraneOptions, generateQueryParams } from "../utils/flow";

export const membraneValidator = isRequired("A membrane type is required.");

const MembraneForm = () => {
  useRedirectOnEmptyForm();

  const router = useRouter();
  const { formState, setFormState, steps } = useContext(NRFlowContext);
  const [showError, setShowError] = useState(false);

  const handleSelection = (event: React.FormEvent<HTMLInputElement>) => {
    setShowError(false);

    const newTags = [
      ...formState.tags
        .split(",")
        .filter(tag => tag !== "sbs" && tag !== "bur" && tag !== "tpo"),
      event.currentTarget.value
    ];

    setFormState({
      ...formState,
      tags: newTags.toString(),
      membrane: event.currentTarget.value
    });
  };

  const currentSelection = formState.membrane || "";

  const membraneOptions = generateMembraneOptions(formState.attachment);

  const errorMessage = membraneValidator(currentSelection);

  return (
    <PageLayout
      errorMessage={errorMessage}
      showError={showError}
      headTitle="Membrane Type | IKO"
      onSubmit={() => {
        if (errorMessage) {
          setShowError(true);
        } else {
          router.push(`/thermal${generateQueryParams(formState)}`);
        }
      }}
      stepName="Membrane"
      steps={steps}
    >
      <FormLayout stepText="Question 3 of 6" title="Select the membrane type">
        <RadioGroup
          name="membrane"
          options={membraneOptions}
          selected={currentSelection}
          onChange={handleSelection}
        />
      </FormLayout>
    </PageLayout>
  );
};

export default MembraneForm;
