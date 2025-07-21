import React, { useContext, useEffect, useState } from "react";
import qs from "qs";
import debounce from "lodash/debounce";
import { useRouter } from "next/router";
import { NRFlowContext } from "../components/NRFlowContext";
import PageLayout from "../components/PageLayout";
import FormLayout from "../components/FormLayout";
import useRedirectOnEmptyForm from "../components/useRedirectOnEmptyForm";
import { generateQueryParams } from "../utils/flow";

import { isRequired } from "../validators";
import styles from "./vapour-retarder.module.scss";
import RadioGroup from "../components/RadioGroup";
export const thermalValidator = isRequired("Please select an option.");

const getQueryString = formState => {
  return qs.stringify(formState);
};

const debouncedPrefetch = debounce((router, resultsPageUrl) => {
  router.prefetch(resultsPageUrl);
}, 500);

const VapourRetarderApplicationForm = () => {
  useRedirectOnEmptyForm();

  const router = useRouter();
  const { formState, setFormState, steps } = useContext(NRFlowContext);
  const [showError, setShowError] = useState(false);

  const queryString = getQueryString(formState);
  const resultsPageUrl = `/results?${queryString}`;
  const currentVapourRetarderApplication = formState.vapourRetarderApplication
    ? formState.vapourRetarderApplication
    : "";

  const errorMessage = thermalValidator(currentVapourRetarderApplication);

  useEffect(() => {
    if (!errorMessage) {
      debouncedPrefetch(router, resultsPageUrl);
    }
  }, [router, errorMessage, resultsPageUrl]);

  const handleSelectionUpdate = (event: React.FormEvent<HTMLInputElement>) => {
    const selectionId = event.currentTarget.value;

    setShowError(false);

    const newTags = [
      ...formState.tags.split(",").filter(tag => !tag.startsWith("vapour")),
      selectionId
    ];

    setFormState({
      ...formState,
      tags: newTags.toString(),
      vapourRetarderApplication: selectionId
    });
  };

  return (
    <PageLayout
      errorMessage={errorMessage}
      showError={showError}
      headTitle="Vapour retarder application | IKO"
      onSubmit={() => {
        if (errorMessage) {
          setShowError(true);
        } else {
          debouncedPrefetch.cancel();
          router.push(`/results${generateQueryParams(formState)}`);
          router.push(resultsPageUrl);
        }
      }}
      stepName="Vapour retarder application"
      steps={steps}
    >
      <FormLayout
        stepText="Question 5 of 6"
        title="Vapour retarder application"
      >
        <RadioGroup
          className={styles.Options}
          labelClassName={styles.OptionLabel}
          selected={currentVapourRetarderApplication}
          name="Vapour Retarder"
          options={[
            {
              value: "vapour-heatfused",
              label: "Heat Fused",
              className: styles.OptionButton
            },
            {
              value: "vapour-selfadhered",
              label: "Self-Adhered",
              className: styles.OptionButton
            },
            {
              value: "vapour-hotasphalt",
              label: "Hot Asphalt",
              className: styles.OptionButton
            },
            {
              value: "vapour-coldadhesive",
              label: "Cold Adhesive",
              className: styles.OptionButton
            },
            {
              value: "vapour-other",
              label: "Other",
              className: styles.OptionButton
            }
          ]}
          onChange={handleSelectionUpdate}
        />
      </FormLayout>
    </PageLayout>
  );
};

export default VapourRetarderApplicationForm;
