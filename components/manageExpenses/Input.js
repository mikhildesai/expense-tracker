import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../../constants/styles';

export default function Input({label, inputConfig, invalid}) {
  const inputStyles = [styles.input];
  if (inputConfig && inputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...inputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
  },
  input: {
    padding: 6,
    borderRadius: 6,
    marginVertical: 6,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
 
});
