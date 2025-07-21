export const alphabeticalOptionsSort = (a, b) => {
  const nameA = a.label;
  const nameB = b.label;
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  return 0;
};
