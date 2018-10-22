import { ADD_EXPENSE, CHANGE_DATE, DELETE_EXPENSE, UPDATE_EXPENSE } from './actionTypes';

export const addExpense = (data) => {
  return {
    type: ADD_EXPENSE,
    payload: data
  }
};
export const deleteExpense = (id) => {
  return {
    type: DELETE_EXPENSE,
    payload: id
  }
};
export const updateExpense = (data) => {
  return {
    type: UPDATE_EXPENSE,
    payload: data
  }
};
export const changeDate = (date) => {
  return {
    type: CHANGE_DATE,
    payload: date
  }
};
