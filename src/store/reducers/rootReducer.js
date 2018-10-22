import { ADD_EXPENSE, CHANGE_DATE, DELETE_EXPENSE, UPDATE_EXPENSE } from '../actions/actionTypes';
import _ from 'lodash';
import { AsyncStorage } from 'react-native';

let harcama = {};
const initialState = {
  isLoading: true,
  chosenDate: new Date(),
  dailyExpense: [],
  todayExpense: 0,
  totalMonthExpense: 0
};
const getDateString = date => {
  return { prefix: date.getFullYear()+'-'+(date.getMonth()+1), day: date.getDate() };
};
const checkPrefixDay = (prefix, day) => {
  if (harcama.month[prefix] === undefined) {
    harcama.month[prefix] = {
      totalMonthExpense: 0,
      days: {
        [day]: []
      }
    };
  }
  if (harcama.month[prefix]['days'][day] === undefined) {
    harcama.month[prefix]['days'][day] = [];
  }
};
const setItem = async () => {
  try {
    await AsyncStorage.setItem('HarcaMA', JSON.stringify(harcama));
  } catch (e) {
    console.log(e);
  }
};

const reducer = (state = initialState, action) => {
  let { prefix, day } = getDateString(state.chosenDate);
  switch (action.type) {
    case ADD_EXPENSE:
      checkPrefixDay(prefix, day);
      harcama[prefix]['days'][day].push({ ...action.payload, id: _.uniqueId() });
      harcama[prefix].totalMonthExpense += action.payload.total;
      let totalMonthExpense = harcama[prefix].totalMonthExpense;
      let todayExpense = 0;
      harcama[prefix]['days'][day].forEach(function (item) { todayExpense += item.toplam; });

      return {
        ...state,
        dailyExpense: [].concat(harcama[prefix]['days'][day]),
        totalMonthExpense,
        todayExpense
      };
    case DELETE_EXPENSE:
      checkPrefixDay(prefix, day);

      return {
        ...state
      };
    case UPDATE_EXPENSE:
      return {
        ...state
      };
    case CHANGE_DATE:
      return {
        ...state,
        chosenDate: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
