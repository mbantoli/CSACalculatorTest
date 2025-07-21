import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { NRFlowContext } from "./NRFlowContext";

const useRedirectOnEmptyForm = () => {
  const { formState } = useContext(NRFlowContext);

  const { replace } = useRouter();

  useEffect(() => {
    if (formState.windPressure === undefined) {
      replace("/");
    }
  }, [formState.windPressure, replace]);
};

export default useRedirectOnEmptyForm;
