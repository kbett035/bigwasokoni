import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';

interface Transaction {
  transaction_id: string;
  user_id: string;
  transaction_type: string;
  amount: number;
  date_time: string;
  status: string;
}

interface Props {
  userId: string;
  onViewAll: () => void; // Function to handle "View All" press
}

const Transactions = ({ userId, onViewAll }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('transaction_id, user_id, transaction_type, amount, date_time, status')
        .eq('user_id', userId)
        .limit(5); // Limit to show only recent transactions

      if (error) throw error;
      setTransactions(data || []);
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
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionId}>
          {item.transaction_id.slice(0, 8)}... {/* Truncate transaction ID */}
        </Text>
        <Text style={styles.transactionInfo}>
          {new Date(item.date_time).toLocaleString()} - {item.status}
        </Text>
      </View>
      <Text style={styles.transactionAmount}>Ksh {item.amount.toFixed(2)}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      {transactions.length === 0 ? (
        <Text style={styles.noTransactions}>No transactions found.</Text> // Display message when no transactions
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item.transaction_id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    fontSize: 16,
    color: '#262626',
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionDetails: {
    flexDirection: 'column',
  },
  transactionId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noTransactions: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Transactions;
