import {View, Text} from 'react-native';
import React from 'react';
import ExpenseSumary from './ExpenseSumary';
import ExpenseList from './ExpenseList';
import { StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';


export default function ExpenseOutput({periodName, expenses}) {
  return (
    <View style={styles.container}>
      <ExpenseSumary periodName={periodName} expenses={expenses} />
      <ExpenseList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: GlobalStyles.colors.primary200,
  }
})