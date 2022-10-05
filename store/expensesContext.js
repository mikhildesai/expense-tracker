/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-trailing-spaces */
import {createContext, useReducer} from 'react';
// const Dummy_Expenses = [
//   {id: 'e1', description: 'book', amount: 100, date: new Date('2022-08-22')},
//   {id: 'e2', description: 'fruits', amount: 200, date: new Date('2022-06-01')},
//   {id: 'e3', description: 'grocery', amount: 500, date: new Date('2022-08-23')},
//   {id: 'e4', description: 'clothes', amount: 600, date: new Date('2022-10-15')},
//   {
//     id: 'e5',
//     description: 'stationary',
//     amount: 50,
//     date: new Date('2022-05-22'),
//   },
//   {id: 'e6', description: 'tax', amount: 100, date: new Date('2022-10-16')},
//   {
//     id: 'e7',
//     description: 'electronics',
//     amount: 200,
//     date: new Date('2022-08-21'),
//   },
//   {id: 'e8', description: 'paint', amount: 500, date: new Date('2022-08-20')},
//   {id: 'e9', description: 'vehicle', amount: 600, date: new Date('2022-09-15')},
//   {
//     id: 'e10',
//     description: 'education',
//     amount: 50,
//     date: new Date('2022-05-22'),
//   },
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, date, amount}) => {},
  setExpense: () => {},
  deleteExpense: id => {},
  updateExpense: (id, {description, date, amount}) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      // const id = new Date().toString() + Math.random().toString();

      return [action.payload, ...state];
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    case 'UPDATE':
      // state is array of objects
      //search for the id of object that needs to be updated
      //after finding the index of object from array of objects, store it in updatableExpenseIndex
      const updatableExpenseIndex = state.findIndex(
        expense => expense.id === action.payload.id,
      );
      // use the index found above to locate exactly the object that needs to updated.
      const updatableExpense = state[updatableExpenseIndex];
      // merge or add the updated data (received via payload) to the object found above(updatableExpense).
      const updatedItem = {...updatableExpense, ...action.payload.data};
      //update the whole array after updating the particular object and store this new array as updatedExpenses.
      const updatedExpenses = [...state];
      //overwrite the object in updatedExpenses array with newly updatedItem.
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      //finally return the newly updated array.
      return updatedExpenses;

    case 'DELETE':
      return state.filter(expense => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({children}) {
  const [expenseState, dispatch] = useReducer(expenseReducer, []);

  function addExpense(expenseData) {
    dispatch({type: 'ADD', payload: expenseData});
  }
  function setExpense(expenses) {
    dispatch({type: 'SET', payload: expenses});
  }
  function deleteExpense(id) {
    dispatch({type: 'DELETE', payload: id});
  }
  function updateExpense(id, expenseData) {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    setExpense: setExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
