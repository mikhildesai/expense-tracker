import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../../constants/styles';

export default function ExpenseSumary({periodName, expenses}) {
  const expenseSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{periodName}</Text>
      <Text style={styles.sum}>{expenseSum}$</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.colors.primary50,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    color: GlobalStyles.colors.primary500,
  },
})
