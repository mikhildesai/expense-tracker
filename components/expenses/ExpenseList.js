import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import ExpenseItem from './ExpenseItem';



export default function ExpenseList({expenses}) {
  function renderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item} />;
  }
  return (
    <View style={styles.listContainer}>
    
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom:100
  },
})
