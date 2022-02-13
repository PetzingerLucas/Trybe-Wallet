// Coloque aqui suas actions

export const USER_LOGIN = 'USER_LOGIN';
export const EDIT = 'EDIT';
export const EXPENSE = 'EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const CHANGE = 'CHANGE';
export const CHANGE_EXPENSE = 'CHANGE_EXPENSE';
export const userLogin = (email) => ({
  type: USER_LOGIN,
  email,
});

export const editExpense = () => ({
  type: EDIT,
});

export const changeExpense = (expense) => ({
  type: CHANGE,
  expense,
});

export const removeExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  expense,
});
export const addExpense = (expense) => async (dispatch) => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await request.json();
  dispatch({
    type: EXPENSE,
    expense: { ...expense, exchangeRates },
  });
};

export const editExpenses = (expense, exchangeRates) => ({
  type: EXPENSE,
  expense: { ...expense, exchangeRates },
});
