const getError = (err) =>
    err.response && err.response.data && err.resonse.data.message
        ? err.response.data.message
        : err.message

export { getError }