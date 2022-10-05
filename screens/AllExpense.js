import {View, Text} from 'react-native';
import React, { useContext } from 'react';
import ExpenseOutput from '../components/expenses/ExpenseOutput';
import { ExpensesContext } from '../store/expensesContext';

export default function AllExpense() {
  const expCntx = useContext(ExpensesContext);
  return <ExpenseOutput periodName="Total" expenses={expCntx.expenses} />;
}
