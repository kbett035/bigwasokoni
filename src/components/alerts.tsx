import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native';

interface Transaction {
  transaction_id: string;
  user_id: string;
  transaction_type: string;
  amount: number;
  date_time: string;
  status: string;
  phone_number?: string;
}

interface Props {
  userId: string;
  searchQuery: string;
}

const Alerts = ({ userId, searchQuery }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('transaction_id, user_id, transaction_type, amount, date_time, status, phone_number')
        .eq('user_id', userId)
        .in('status', ['Failed', 'Double']) // Fetch transactions with statuses 'Failed' and 'Double'
        .order('date_time', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
      setFilteredTransactions(data || []);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error fetching alerts: ', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setQuery(text);

    if (text) {
      const filtered = transactions.filter((transaction) =>
        transaction.transaction_id.toLowerCase().includes(text.toLowerCase()) ||
        (transaction.phone_number && transaction.phone_number.includes(text))
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const transactionDate = new Date(item.date_time);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday = transactionDate.toDateString() === today.toDateString();
    const isYesterday = transactionDate.toDateString() === yesterday.toDateString();

    let displayDate;
    if (isToday) {
      displayDate = `Today at ${transactionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isYesterday) {
      displayDate = `Yesterday at ${transactionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      displayDate = transactionDate.toLocaleString();
    }

    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionId}>
            {item.transaction_id.slice(0, 8)}...
          </Text>
          <Text style={styles.transactionInfo}>
            {displayDate} - {item.status}
          </Text>
        </View>
        <Text style={styles.transactionAmount}>Ksh {item.amount.toFixed(2)}</Text>
      </View>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by transaction ID or phone number..."
        value={query}
        onChangeText={handleSearch}
      />

      {filteredTransactions.length === 0 ? (
        <Text style={styles.noTransactions}>No alerts found.</Text>
      ) : (
        <FlatList
          data={filteredTransactions}
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
  listContainer: {
    paddingBottom: 16,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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

export default Alerts;
