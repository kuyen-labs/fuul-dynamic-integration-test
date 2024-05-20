export const handleError = (error: any) => {
  alert(
    error instanceof Error
      ? `Error sending connect wallet event: ${error.message} `
      : "Error sending connect wallet event"
  );
};
