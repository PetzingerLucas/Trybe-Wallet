// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { EDIT, EXPENSE, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [
    'USD',
    'CAD',
    'EUR',
    'GBP',
    'ARS',
    'BTC',
    'LTC',
    'JPY',
    'CHF',
    'AUD',
    'CNY',
    'ILS',
    'ETH',
    'XRP',
  ],
  expenses: [],
  edit: false,
};

const wallet = (state = INITIAL_STATE, { type, expense }) => {
  const newExpense = state.expenses.filter((ex) => ex !== expense);
  switch (type) {
  case EDIT:
    return { ...state,
      edit: !state.edit,
    };
  case EXPENSE:
    return { ...state,
      expenses: [...state.expenses, expense].sort((a, b) => a.id - b.id),
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: [...newExpense],
    };
  default: return state;
  }
};

export default wallet;
