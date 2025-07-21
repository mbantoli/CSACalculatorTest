declare module "*.scss" {
  const content: { [className: string]: string };
  export = content;
}

interface IMyWindow extends Window {
  GA_INITIALIZED?: boolean;
}

type PrismicBooleanType = "yes" | "no";

type PrismicWarrantyTermType = "5/10" | "5/10/15";

type PrismicManufacturerType = {
  id: string;
  slug: string;
  data: {
    name: Array<{ text: string }>;
    is_new_roof_option: PrismicBooleanType;
    url: string;
    logo: { url: string };
  };
};

type PrismicCapSheetType = {
  id: string;
  data: {
    name: Array<{ text: string }>;
    manufacturer: PrismicManufacturerType;
    warranty: PrismicWarrantyTermType;
    requires_base_sheet: PrismicBooleanType;
  };
};

type PrismicBaseSheetType = {
  id: string;
  data: {
    name: Array<{ text: string }>;
    manufacturer: PrismicManufacturerType;
    compatible_cap_sheets: Array<{ cap_sheet: PrismicCapSheetType }>;
    requires_cover_board: PrismicBooleanType;
  };
};

type PrismicInsulationType = {
  id: string;
  data: {
    name: Array<{ text: string }>;
    manufacturer: PrismicManufacturerType;
    warranty: PrismicWarrantyTermType;
  };
};

type PrismicCoverboardType = {
  id: string;
  data: {
    name: Array<{ text: string }>;
    manufacturer: PrismicManufacturerType;
  };
};

type PrismicVapourRetarderType = {
  id: string;
  data: {
    name: Array<{ text: string }>;
    manufacturer: PrismicManufacturerType;
    warranty: PrismicWarrantyTermType;
  };
};

type PrismicLevellingSurfaceType = {
  id: string;
  data: { name: Array<{ text: string }> };
};

type StepNameType = NRFlowStepsType | RRFlowStepsType | MEMFlowStepsType;
