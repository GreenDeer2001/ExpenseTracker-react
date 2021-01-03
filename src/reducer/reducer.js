const Reducer = (state, action) => {
  switch (action.type) {
    case "SALDO": {
      const newSaldo = +state.saldo + +action.amount;

      return {
        ...state,
        saldo: +newSaldo.toFixed(2),
      };
    }
    case "ADD": {
      return {
        ...state,
        transations: state.transations.concat(action.transation),
      };
    }
    case "REVENUE": {
      return {
        ...state,
        revenue: action.revenue
      };
    }
    case "EXPENSES": {
      return {
        ...state,
        expenses: action.expenses

      };
    }
    case "REMOVE": {
      const remTran = state.transations.find((tran) => tran.id === action.ID);
      const updatedTransations = state.transations.filter(
        (tran) => tran.id !== action.ID
      );
      const updatedSaldo =
        state.saldo + +(remTran.type ? -remTran.amount : remTran.amount);
      return {
        ...state,
        saldo: updatedSaldo,
        transations: updatedTransations,
      };
    }
    case "EDIT": {
      const updatedTransations = state.transations.map((tran) => {
        if (tran.id === action.obj.id) return action.obj;
        return tran;
      });

      const { Usaldo, Urevenue, Uexp } = updatedTransations.reduce(
        (total, cur) => {
          total.Usaldo += cur.type ? cur.amount : -cur.amount;
          total.Urevenue += cur.type && cur.amount;
          total.Uexp -= !cur.type && cur.amount;
          return total;
        },
        { Usaldo: 0, Urevenue: 0, Uexp: 0 }
      );

      return {
        ...state,
        saldo: +Usaldo,
        revenue: +Urevenue,
        expenses: +Uexp,
        transations: updatedTransations,
      };
    }
    default:
      return state;
  }
};

export default Reducer;
