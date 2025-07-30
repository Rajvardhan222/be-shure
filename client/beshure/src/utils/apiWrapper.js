

export function withErrorHandler(apiFn) {
  return async (...args) => {
    try {
      const data = await apiFn(...args);

      return { data, error: null };
    } catch (error) {
      let message = "Unknown error";

      // Handle Axios errors (4xx, 5xx responses)
      if (error.response) {
        // Server responded with error status
        if (error.response.data?.message) {
          message = error.response.data.message;
        } else if (error.response.data) {
          // Sometimes the entire response.data is the message
          message = typeof error.response.data === 'string' 
            ? error.response.data 
            : error.response.statusText || `HTTP ${error.response.status} Error`;
        } else {
          message = error.response.statusText || `HTTP ${error.response.status} Error`;
        }
      } else if (error.request) {
        // Network error (no response received)
        message = "Network error - please check your connection";
      } else if (error.message) {
        // Other errors
        message = error.message;
      }

      console.error("API Error:", error);
      console.error("Error response:", error.response?.data);
      return { data: null, error: message };
    }
  };
}
