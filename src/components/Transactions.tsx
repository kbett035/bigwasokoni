import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';

interface Transaction {
  transaction_id: string;
  user_id: string;
  customer_id: string;
  transaction_type: string;
  amount: number;
  phone_number: string;
  date_time: string;
  status: string;
  payment_method: string;
  mpesa_transaction_code: string;
  data_bundle_size: number;
  sms_count: number | null;
  notification_status: boolean;
  remarks: string;
  alert_flag: boolean;
}

interface Props {
  userId: string; // Pass the user's ID as a prop
}

const Transactions = ({ userId }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*') // Fetch all columns; adjust as necessary
        .eq('user_id', userId); // Use the passed userId prop

      if (error) {
        throw error;
      }

      setTransactions(data || []); // Set to an empty array if data is null
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error fetching transactions: ', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>Transaction ID: {item.transaction_id}</Text>
      <Text style={styles.transactionText}>Type: {item.transaction_type}</Text>
      <Text style={styles.transactionText}>Amount: Ksh {item.amount}</Text>
      <Text style={styles.transactionText}>Date: {new Date(item.date_time).toLocaleString()}</Text>
      <Text style={styles.transactionText}>Status: {item.status}</Text>
      <Text style={styles.transactionText}>Remarks: {item.remarks}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={transactions}
      renderItem={renderTransactionItem}
      keyExtractor={(item) => item.transaction_id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Transactions;
