import React, { useContext, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import { NRFlowContext } from "../components/NRFlowContext";
import PageLayout from "../components/PageLayout";
import FormLayout from "../components/FormLayout";
import useRedirectOnEmptyForm from "../components/useRedirectOnEmptyForm";
import { generateQueryParams } from "../utils/flow";

import { isRequired } from "../validators";
import RadioGroup from "../components/RadioGroup";
import styles from "./coverboard.module.scss";

export const coverboardValidator = isRequired("Please select an option.");

const CoverboardTypeForm = () => {
  useRedirectOnEmptyForm();

  const router = useRouter();
  const { formState, setFormState, steps } = useContext(NRFlowContext);
  const [showError, setShowError] = useState(false);

  const currentCoverboardType = formState.coverBoardType
    ? formState.coverBoardType
    : "";

  const errorMessage = coverboardValidator(currentCoverboardType);

  const handleSelectionUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    const selectionId = event.currentTarget.value;

    const newTags = [
      ...formState.tags.split(",").filter(tag => !tag.startsWith("cover")),
      selectionId
    ];
    setShowError(false);

    setFormState({
      ...formState,
      tags: newTags.toString(),
      coverBoardType: selectionId
    });
  };

  return (
    <PageLayout
      errorMessage={errorMessage}
      showError={showError}
      headTitle="Cover board type | IKO"
      onSubmit={() => {
        if (errorMessage) {
          setShowError(true);
        } else {
          router.push(`/vapour-retarder${generateQueryParams(formState)}`);
        }
      }}
      stepName="Cover board type"
      steps={steps}
    >
      <FormLayout stepText="Question 5 of 6" title="Cover board type">
        <RadioGroup
          className={styles.Options}
          labelClassName={styles.OptionLabel}
          selected={currentCoverboardType}
          name="Cover board"
          options={[
            {
              value: "cover-protectoboard",
              label: (
                <>
                  Protectoboard{" "}
                  <span
                    className={cx(styles.AttachmentOption, {
                      [styles.OptionSelected]:
                        currentCoverboardType === "cover-protectoboard"
                    })}
                  >
                    Asphaltic Core Board
                  </span>
                </>
              ),
              className: styles.OptionButton
            },
            {
              value: "cover-covershield",
              label: (
                <>
                  CoverShield{" "}
                  <span
                    className={cx(styles.AttachmentOption, {
                      [styles.OptionSelected]:
                        currentCoverboardType === "cover-covershield"
                    })}
                  >
                    HD Polyiso Board
                  </span>
                </>
              ),
              className: styles.OptionButton
            },
            {
              value: "cover-prelaminated",
              label: (
                <>
                  Pre-laminated Board{" "}
                  <span
                    className={cx(styles.AttachmentOption, {
                      [styles.OptionSelected]:
                        currentCoverboardType === "cover-prelaminated"
                    })}
                  >
                    Laminated cover board & base sheet
                  </span>
                </>
              ),
              className: styles.OptionButton
            },
            {
              value: "cover-none",
              label: "None"
            },
            {
              value: "cover-other",
              label: "Other"
            }
          ]}
          onChange={handleSelectionUpdate}
        />
      </FormLayout>
    </PageLayout>
  );
};

export default CoverboardTypeForm;
