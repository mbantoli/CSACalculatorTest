import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import cx from "classnames";
import { NRFlowContext } from "../components/NRFlowContext";
import PageLayout from "../components/PageLayout";
import FormLayout from "../components/FormLayout";
import RadioGroup from "../components/RadioGroup";
import useRedirectOnEmptyForm from "../components/useRedirectOnEmptyForm";
import { isRequired } from "../validators";
import styles from "./attachment.scss";
import { generateQueryParams } from "../utils/flow";

export const attachmentValidator = isRequired(
  "An attachment type is required."
);

const AttachmentForm = () => {
  useRedirectOnEmptyForm();

  const router = useRouter();
  const { formState, setFormState, steps } = useContext(NRFlowContext);
  const [showError, setShowError] = useState(false);

  const handleSelection = (event: React.FormEvent<HTMLInputElement>) => {
    setShowError(false);
    const newTags = formState.tags
      ? [
          ...formState.tags
            .split(",")
            .filter(tag => tag !== "mars" && tag !== "pars" && tag !== "aars"),
          event.currentTarget.value
        ]
      : [event.currentTarget.value];

    setFormState({
      ...formState,
      attachment: event.currentTarget.value,
      tags: newTags.toString(),
      membrane: undefined
    });
  };

  const currentSelection = formState.attachment || "";

  const attachmentOptions = (currentSelection: string) => [
    {
      value: "mars",
      label: (
        <>
          MARS{" "}
          <span
            className={cx(styles.AttachmentOption, {
              [styles.OptionSelected]: currentSelection === "mars"
            })}
          >
            Mechanically Attached Roof System
          </span>
        </>
      ),
      className: styles.OptionButton
    },
    {
      value: "pars",
      label: (
        <>
          PARS{" "}
          <span
            className={cx(styles.AttachmentOption, {
              [styles.OptionSelected]: currentSelection === "pars"
            })}
          >
            Partially Attached (Hybrid) Roof System
          </span>
        </>
      ),
      className: styles.OptionButton
    },
    {
      value: "aars",
      label: (
        <>
          AARS{" "}
          <span
            className={cx(styles.AttachmentOption, {
              [styles.OptionSelected]: currentSelection === "aars"
            })}
          >
            Adhesive Applied Roof System
          </span>
        </>
      ),
      className: styles.OptionButton
    }
  ];

  const errorMessage = attachmentValidator(currentSelection);

  return (
    <PageLayout
      errorMessage={errorMessage}
      showError={showError}
      headTitle="Attachment Type | IKO"
      steps={steps}
      stepName="Attachment"
      onSubmit={() => {
        if (errorMessage) {
          setShowError(true);
        } else {
          router.push(`/membrane${generateQueryParams(formState)}`);
        }
      }}
    >
      <FormLayout
        stepText="Question 2 of 6"
        title="Select the attachment method"
      >
        <RadioGroup
          name="attachment"
          options={attachmentOptions(currentSelection)}
          selected={currentSelection}
          onChange={handleSelection}
        />
      </FormLayout>
    </PageLayout>
  );
};

export default AttachmentForm;
