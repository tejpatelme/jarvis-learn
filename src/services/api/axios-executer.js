export const axiosWithTryCatch = async (fn, toastDispatch) => {
  try {
    const response = await fn();

    return response.data;
  } catch (err) {
    if (err?.response?.data?.errorType === "JWT") {
      return;
    }
    toastDispatch({
      type: "ERROR",
      payload: { message: "Server Error! Please try again" },
    });
  }
};
