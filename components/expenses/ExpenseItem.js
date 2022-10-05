import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {GlobalStyles} from '../../constants/styles';
import {dateFormatter} from '../../utils/date';
import {useNavigation} from '@react-navigation/native';

export default function ExpenseItem({id, description, date, amount}) {
  const navigation = useNavigation();



  return (
    <Pressable
      onPress={() => navigation.navigate('ManageExpenses', {expenseId: id})}>
      <View style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text>{dateFormatter(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>$ {amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary100,
  },
  amountContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 5,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountText: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
});
