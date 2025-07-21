import { useEffect } from "react";
import { useRouter } from "next/router";
import { getRequiredStateKeys } from "../utils/flow";

const useRedirectOnInvalidState = (formState, steps, currentStep: string) => {
  const { replace } = useRouter();

  useEffect(() => {
    const currentStateKey = steps.filter(step => step.title === currentStep)[0]
      .state;
    const stateKeys = getRequiredStateKeys(steps, currentStep).filter(
      key => key !== currentStateKey
    );

    stateKeys.some(key => {
      if (formState[key] === undefined) {
        replace(steps[0].path);
      }
    });
  }, [currentStep, formState, replace, steps]);
};

export default useRedirectOnInvalidState;
