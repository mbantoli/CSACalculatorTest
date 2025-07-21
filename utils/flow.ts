export const getCurrentStepIndex = (steps, currentStepName): number => {
  const foundStep = steps.find(step => step.title === currentStepName);

  return steps.indexOf(foundStep);
};

export const getCurrentStepStateName = (steps, currentStepName) => {
  const foundStep = steps.find(step => step.title === currentStepName);

  return foundStep.state;
};

export const getNextRoute = ({ steps, currentStepName }) => {
  const currentIndex: number = getCurrentStepIndex(steps, currentStepName);

  return steps[currentIndex + 1].path;
};

export const getFlowProgressString = (steps, currentStepName) => {
  return `Question ${getCurrentStepIndex(steps, currentStepName) + 1} of ${
    steps.length
  }`;
};

export const getRequiredStateKeys = (steps, currentStepName) => {
  const index: number = steps.map(e => e.title).indexOf(currentStepName);

  return steps.slice(0, index + 1).map(step => step.state);
};

export const generateQueryParams = formState => {
  let queryString = "?";

  Object.entries(formState).forEach(data => {
    if (data[1] !== undefined) {
      if (Array.isArray(data[1]) && data[1]) {
        if (data[1].length > 0) {
          queryString = `${queryString}${data[0]}=${data[1].toString()}&`;
        }
      } else {
        queryString = `${queryString}${data[0]}=${data[1]}&`;
      }
    }
  });

  return queryString.substring(0, queryString.length - 1);
};

export const validateFormStateAgainstQuery = (formState, query) => {
  let isValid = true;
  if (Object.keys(formState).find(key => formState[key] === undefined)) {
    isValid = false;
  }

  // Do query param ids match the ids in the context state?
  Object.keys(query).forEach(key => {
    if (Array.isArray(formState[key])) {
      formState[key].forEach(item => {
        if (!item) {
          isValid = false;
        } else if (!query[key].includes(item.id)) {
          isValid = false;
        }
      });
    } else {
      if (!formState[key]) {
        isValid = false;
      } else if (query[key] !== formState[key].id) {
        isValid = false;
      }
    }
  });

  // Are all requirements met for components?
  if (formState.capSheet && formState.capSheet.data.requires_base_sheet) {
    if (!formState.baseSheet.id) {
      isValid = false;
    }
  }

  if (formState.baseSheet && formState.baseSheet.data) {
    if (
      formState.baseSheet.data.requires_cover_board &&
      formState.coverboard &&
      !formState.coverboard.id
    ) {
      isValid = false;
    }

    const compatible =
      formState.baseSheet.data &&
      formState.baseSheet.data.compatible_cap_sheets &&
      formState.baseSheet.data.compatible_cap_sheets.map(data => {
        return data.cap_sheet.id;
      });

    if (compatible && !compatible.includes(formState.capSheet.id)) {
      isValid === false;
    }
  }

  return isValid;
};

export const getPrettyComponentType = componentSlug => {
  switch (componentSlug) {
    case "cap-sheet":
      return "Capsheet";
    case "base-sheet":
      return "Base Sheet";
    case "coverboard":
      return "Coverboard";
    case "insulation-layer":
      return "Insulation layer";
    case "levelling-surface":
      return "Auxiliary levelling surface";
    case "vapour-retarder":
      return "Vapour retarder";
    default:
      return "DEFAULT";
  }
};

export const groupAndOrderResults = results => {
  const groupedByManufacturer = {};

  results.forEach(result => {
    if (!result.data.manufacturer.data) {
      throw new Error(
        `Oops! Missing manufacturer link for "${result.id} - ${result.data.name[0].text}". Check that all products have a manufacturer attached and that you are fetching the manufacturer links in your page query`
      );
    }

    if (!groupedByManufacturer[result.data.manufacturer.slug]) {
      groupedByManufacturer[result.data.manufacturer.slug] = {
        name: result.data.manufacturer.data.name,
        options: [],
        logo: result.data.manufacturer.data.logo
          ? result.data.manufacturer.data.logo.url
          : ""
      };
    }

    groupedByManufacturer[result.data.manufacturer.slug].options.push(result);
  });

  const sortedGroupedResults = {};

  Object.keys(groupedByManufacturer)
    .sort()
    .forEach(function(key) {
      sortedGroupedResults[key] = groupedByManufacturer[key];
    });

  return sortedGroupedResults;
};

export const generateMembraneOptions = (attachment: string) => {
  const options = [
    {
      value: "sbs",
      label: "SBS"
    }
  ];

  if (attachment !== "MARS") {
    options.push({
      value: "bur",
      label: "BUR"
    });
  }

  // TODO: Uncomment this to turn on TPO option
  options.push({
    value: "tpo",
    label: "TPO"
  });

  return options;
};
