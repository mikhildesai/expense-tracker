import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import Input from './Input';
import {Button, Icon} from 'react-native-elements';
import {GlobalStyles} from '../../constants/styles';

export default function Form({
  isEdited,
  addUpdateHandler,
  cancelHandler,
  deleteHandler,
  defaultValues,
}) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
      isValid: true,
    },

    description: {
      value: defaultValues ? defaultValues.description : '',
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputValues(currentValue => {
      return {
        ...currentValue,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }
  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value,
      description: inputValues.description.value,
      date: new Date(inputValues.date.value),
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const descriptionIsValid = expenseData.description.trim().length > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';

    if (!amountIsValid || !descriptionIsValid || !dateIsValid) {
      //Alert.alert('Invalid Input', 'Please check your input values!');
      setInputValues(curr => {
        return {
          amount: {value: curr.amount.value, isValid: amountIsValid},
          date: {value: curr.date.value, isValid: dateIsValid},
          description: {
            value: curr.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    addUpdateHandler(expenseData);
  }
  const formIsValid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <View style={styles.rowContainer}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValues.amount.isValid}
          inputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputValues.amount.value,
          }}
        />

        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputValues.date.isValid}
          inputConfig={{
            maxLength: 10,
            placeholder: 'YYYY-MM-DD',
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        inputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputValues.description.value,
        }}
      />
   
      
        {formIsValid && (
          <Text style={styles.errorText}>
            Error- please check your input Data
          </Text>
        )}
     
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={cancelHandler} />
        <Button title={isEdited ? 'Update' : 'Add'} onPress={submitHandler} />
      </View>
      <View style={styles.deleteContainer}>
        <Icon name="delete" onPress={deleteHandler} color="red" size={36} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  form: {
    height: 350,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    marginTop: 20,
  },
  deleteContainer: {
    width: 80,
    marginLeft: 140,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
  },
});
