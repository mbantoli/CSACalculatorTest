import React, { useState, createContext } from "react";

export type NRFlowStepsType =
  | "Wind Pressure"
  | "Attachment"
  | "Membrane"
  | "Thermal Barrier"
  | "Cover board type"
  | "Vapour Retarder Application"
  | "Results";

type NRFlowRoutesType = Array<{
  path: string;
  title: NRFlowStepsType;
}>;

const NRFlowSteps: NRFlowRoutesType = [
  { path: "/", title: "Wind Pressure" },
  { path: "/attachment", title: "Attachment" },
  { path: "/membrane", title: "Membrane" },
  { path: "/thermal", title: "Thermal Barrier" },
  { path: "/coverboard", title: "Cover board type" },
  { path: "/vapour-retarder", title: "Vapour Retarder Application" }
];

type FormState = {
  windPressure?: string;
  windPressureUnit?: "psf" | "kpa";
  tags?: string;
  membrane?: string;
  attachment?: string;
  thermal?: string;
  coverBoardType?: string;
  vapourRetarderApplication?: string;
};

type NRFlowContextType = {
  steps: NRFlowRoutesType;
  formState: FormState;
  setFormState: (formState: FormState) => void;
};

export const NRFlowContext = createContext<NRFlowContextType>({
  steps: NRFlowSteps,
  formState: undefined,
  setFormState: () => {
    throw new Error("Form Context isn't wrapped with FormContextProvider");
  }
});

type Props = {
  children: React.ReactNode;
};

const defaultFormContext: FormState = {
  windPressure: undefined,
  membrane: undefined,
  attachment: undefined,
  thermal: undefined,
  tags: undefined
};

export const NRFlowContextProvider = ({ children }: Props) => {
  const [formState, setFormState] = useState(defaultFormContext);
  return (
    <NRFlowContext.Provider
      value={{
        steps: NRFlowSteps,
        formState,
        setFormState
      }}
    >
      {children}
    </NRFlowContext.Provider>
  );
};
