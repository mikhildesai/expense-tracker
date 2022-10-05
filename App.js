/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from './constants/styles';
import AllExpense from './screens/AllExpense';
import ManageExpense from './screens/ManageExpense';
import RecentExpense from './screens/RecentExpense';
import ExpensesContextProvider from './store/expensesContext';
import {Icon} from 'react-native-elements';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

function ExpensesOverview() {
  const navigation = useNavigation();
  return (
    <Bottom.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        tabBarInactiveTintColor: GlobalStyles.colors.primary50,
        tabBarActiveBackgroundColor: 'white',
        headerRight: () => (
          <Icon
            name="add"
            color="white"
            onPress={() => navigation.navigate('ManageExpenses')}
          />
        ),
      }}>
      <Bottom.Screen
        name="RecentExpenses"
        component={RecentExpense}
        options={{
          title: 'Recent',
          tabBarIcon: () => (
            <Icon
              name="hourglass-bottom"
              color={GlobalStyles.colors.accent500}
            />
          ),
        }}
      />
      <Bottom.Screen
        name="AllExpense"
        component={AllExpense}
        options={{
          tabBarIcon: () => (
            <Icon name="calendar-today" color={GlobalStyles.colors.accent500} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
}

function App() {
  return (
  
      <NavigationContainer>
        <ExpensesContextProvider>
        
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white',
            }}>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpense}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
          
        </ExpensesContextProvider>
      </NavigationContainer>
    
  );
}

export default App;

