import {View, Text, Button, StyleSheet} from 'react-native';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ExpensesContext} from '../store/expensesContext';
import {Icon} from 'react-native-elements';
import Form from '../components/manageExpenses/Form';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { GlobalStyles } from '../constants/styles';

export default function ManageExpense({route, navigation}) {
  const ID = route.params?.expenseId;
  const isEdited = !!ID;
  
  const [isLoading,setIsLoading] = useState(false);

  const expCntx = useContext(ExpensesContext);

  const selectedExpense = expCntx.expenses.find(expense => expense.id === ID);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdited ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEdited]);

  async function deleteHandler() {
    
    expCntx.deleteExpense(ID);
    setIsLoading(true);
    await deleteExpense(ID);
    navigation.goBack();
  }

  async function addUpdateHandler(expenseData) {
    if (isEdited) {
     
      expCntx.updateExpense(ID, expenseData);
      setIsLoading(true);
      await updateExpense(ID, expenseData);
    } else {
  
      const id = await storeExpense(expenseData);
      setIsLoading(true);
      expCntx.addExpense({...expenseData, id: id});
    }
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  if(isLoading){
    return <LoadingOverlay />
  }
  return (
    <View style={styles.container}>
      <Form
        cancelHandler={cancelHandler}
        addUpdateHandler={addUpdateHandler}
        deleteHandler={deleteHandler}
        isEdited={isEdited}
        defaultValues={selectedExpense}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container:{
  flex:1,
  backgroundColor: GlobalStyles.colors.primary100,
}});
