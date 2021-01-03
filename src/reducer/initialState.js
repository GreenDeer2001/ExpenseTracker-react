const initialState = () => {
  const data = JSON.parse(localStorage.getItem("MONEYTRACKER"));
  if (data) {
    return data;
  } else {
    return {
      saldo: 0,
      revenue: 0,
      expenses: 0,
      transations: [],
    };
  }
};

export default initialState;
