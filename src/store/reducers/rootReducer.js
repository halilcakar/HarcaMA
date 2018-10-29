import { ADD_EXPENSE, CHANGE_DATE, DELETE_EXPENSE, UPDATE_EXPENSE, DELETE_ALL_EXPENSE } from '../actions/actionTypes';
import { AsyncStorage } from 'react-native';
import uuidv4 from 'uuid/v4';



/*
* <Picker.Item label="Ev Giderleri(Kira, boya vs.)" value="evGider"/>
  <Picker.Item label="Yemek" value="yemek"/>
  <Picker.Item label="Sağlık" value="saglik"/>
  <Picker.Item label="Market" value="market"/>
  <Picker.Item label="Kozmetik" value="kozmetik"/>
  <Picker.Item label="Elektronik" value="elektronik"/>
  <Picker.Item label="Kıyafet" value="kiyafet"/>
  <Picker.Item label="Okul" value="okul"/>
*
* */


var harcama = {
  expenseTypes: [
    { label: 'Ev Giderleri(Kira, boya vs.)', value: 'evGider' },
    { label: 'Yemek', value: 'yemek' },
    { label: 'Sağlık', value: 'saglik' },
    { label: 'Kozmetik', value: 'kozmetik' },
    { label: 'Elektronik', value: 'elektronik' },
    { label: 'Kıyafet', value: 'kiyafet' },
    { label: 'Okul', value: 'okul' },
  ],
};
const initialState = {
  chosenDate: new Date(),
  dailyExpense: [],
  todayExpense: 0,
  totalMonthExpense: 0
};
const getDateString = date => {
  return { prefix: date.getFullYear()+'-'+(date.getMonth()+1), day: date.getDate() };
};
const checkPrefixDay = (prefix, day) => {
  if (harcama[prefix] === undefined) {
    harcama[prefix] = {
      totalMonthExpense: 0,
      days: {
        [day]: []
      }
    };
  }
  if (harcama[prefix]['days'][day] === undefined) {
    harcama[prefix]['days'][day] = [];
  }
};
const setItem = async () => {
  try {
    await AsyncStorage.setItem('HarcaMA', JSON.stringify(harcama));
  }
  catch (e) {
    console.log(e);
  }
};

const getItems = async () => {
  try {
    // await AsyncStorage.removeItem('HarcaMA');
    harcama = await AsyncStorage.getItem('HarcaMA');
    if(harcama == null) { harcama = '{}'; }
    harcama = JSON.parse(harcama);
    console.log(harcama);
  }
  catch (e) {
    harcama = {};
  }
};
getItems();
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      let data = { ...action.payload };
      data.total = parseInt(data.adet) * parseFloat(data.fiyat);
      let { prefix, day } = getDateString(state.chosenDate);
      checkPrefixDay(prefix, day);
      harcama[prefix]['days'][day].push({ ...data, id: uuidv4() });
      harcama[prefix].totalMonthExpense += data.total;
      let totalMonthExpense = harcama[prefix].totalMonthExpense;
      let todayExpense = 0;
      harcama[prefix]['days'][day].forEach(item =>todayExpense += item.total);
      setItem();
      return {
        ...state,
        dailyExpense: [].concat(harcama[prefix]['days'][day]),
        totalMonthExpense,
        todayExpense
      };
    case DELETE_EXPENSE:
      let dd = getDateString(state.chosenDate);
      let deleteItem = action.payload;
      harcama[dd.prefix]['days'][dd.day] = harcama[dd.prefix]['days'][dd.day].filter(item => item.id !== deleteItem.id);
      harcama[dd.prefix].totalMonthExpense -= parseInt(deleteItem.total);
      totalMonthExpense = harcama[dd.prefix].totalMonthExpense;
      todayExpense = 0;
      harcama[dd.prefix]['days'][dd.day].forEach(item =>todayExpense += item.total);
      setItem();
      return {
        ...state,
        dailyExpense: [].concat(harcama[dd.prefix]['days'][dd.day]),
        totalMonthExpense,
        todayExpense
      };
    case UPDATE_EXPENSE:
      let ud = getDateString(state.chosenDate);
      checkPrefixDay(ud.prefix, ud.day);
      let updateNewData = { ...action.payload };
      updateNewData.total = parseInt(updateNewData.adet) * parseFloat(updateNewData.fiyat);
      harcama[ud.prefix]['days'][ud.day] = harcama[ud.prefix]['days'][ud.day].filter(item => {
        if(item.id === updateNewData.id) { harcama[ud.prefix].totalMonthExpense -= item.total; }
        return item.id !== updateNewData.id;
      });
      harcama[ud.prefix]['days'][ud.day].push(updateNewData);
      harcama[ud.prefix].totalMonthExpense += updateNewData.total;
      totalMonthExpense = harcama[ud.prefix].totalMonthExpense;
      todayExpense = 0;
      harcama[ud.prefix]['days'][ud.day].forEach(item =>todayExpense += item.total);
      setItem();
      return {
        ...state,
        dailyExpense: [].concat(harcama[ud.prefix]['days'][ud.day]),
        totalMonthExpense,
        todayExpense
      };
    case DELETE_ALL_EXPENSE:
      harcama = {};
      setItem();
      return {
        chosenDate: new Date(),
        dailyExpense: [],
        todayExpense: 0,
        totalMonthExpense: 0
      };
    case CHANGE_DATE:
      const chosenDate = action.payload;
      let obj = getDateString(chosenDate);
      checkPrefixDay(obj.prefix, obj.day);
      totalMonthExpense = harcama[obj.prefix].totalMonthExpense;
      todayExpense = 0;
      harcama[obj.prefix]['days'][obj.day].forEach(item => { todayExpense += item.total; });
      return {
        ...state,
        dailyExpense: [].concat(harcama[obj.prefix]['days'][obj.day]),
        totalMonthExpense,
        todayExpense,
        chosenDate
      };
    default:
      return state;
  }
};
export default reducer;