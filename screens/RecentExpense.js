import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import ExpenseOutput from '../components/expenses/ExpenseOutput';
import {ExpensesContext} from '../store/expensesContext';
import {getDays} from '../utils/date';
import {fetchExpenses} from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

export default function RecentExpense() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const expCntx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpenses();
        expCntx.setExpense(expenses);
      } catch (error) {
        setError('Could not fetch Expenses!');
      }

      setIsLoading(false);
    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }
  if (error && !isLoading) {
    return <ErrorOverlay message={error} confirm={errorHandler} />;
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }
  const RecentExpenses = expCntx.expenses.filter(expense => {
    const today = new Date();
    const sevenDaysAgo = getDays(today, 7);
    return expense.date >= sevenDaysAgo;
  });

  return <ExpenseOutput periodName="Last 7 Days" expenses={RecentExpenses} />;
}
