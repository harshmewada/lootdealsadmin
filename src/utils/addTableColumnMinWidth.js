export const addTableColumnMinWidth = (condition, width) => {
  return (
    condition && {
      minWidth: width,
    }
  );
};
