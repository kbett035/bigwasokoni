import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';

type TransactionDetailsRouteProp = RouteProp<{ params: { transaction: Transaction } }, 'params'>;

interface Transaction {
  transaction_id: string;
  user_id: string;
  transaction_type: string;
  amount: number;
  date_time: string;
  status: string;
}

const TransactionDetailsScreen = () => {
  const route = useRoute<TransactionDetailsRouteProp>();
  const { transaction } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Transaction Details</Text>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Transaction ID:</Text>
        <Text style={styles.value}>{transaction.transaction_id}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Type:</Text>
        <Text style={styles.value}>{transaction.transaction_type}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>Ksh {transaction.amount.toFixed(2)}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{new Date(transaction.date_time).toLocaleString()}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{transaction.status}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default TransactionDetailsScreen;
