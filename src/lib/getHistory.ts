export const getHistory = () => {
    return JSON.parse(localStorage.getItem("history") || "{}");
  };
  