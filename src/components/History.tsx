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
}

interface Props {
  userId: string;
  filter: string; // Accepting filter for transaction type (All, Data, SMS)
  searchQuery: string; // Accepting search query to filter transactions by search text
}

const History = ({ userId, filter, searchQuery }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchQuery); // Local state for search query

  useEffect(() => {
    fetchTransactions();
  }, [filter]); // Fetch transactions when filter changes

  useEffect(() => {
    handleSearch(query);
  }, [query]); // Filter transactions based on search query

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('transactions')
        .select('transaction_id, user_id, transaction_type, amount, date_time, status')
        .eq('user_id', userId)
        .order('date_time', { ascending: false });

      // Apply filter for transaction type
      if (filter !== 'All') {
        query = query.eq('transaction_type', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTransactions(data || []);
      setFilteredTransactions(data || []); // Initialize filtered transactions
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error fetching transactions: ', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Search function to filter transactions based on search query
  const handleSearch = (text: string) => {
    setQuery(text);

    // Filter transactions based on search query
    if (text) {
      const filtered = transactions.filter((transaction) =>
        transaction.transaction_id.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions); // If no search query, show all transactions
    }
  };

  const renderTransactionItem = ({ item }: { item: Transaction }) => {
    const transactionDate = new Date(item.date_time);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Check if the transaction is today or yesterday
    const isToday = transactionDate.toDateString() === today.toDateString();
    const isYesterday = transactionDate.toDateString() === yesterday.toDateString();

    // Format the display for date and time
    let displayDate;
    if (isToday) {
      displayDate = `Today at ${transactionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isYesterday) {
      displayDate = `Yesterday at ${transactionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      displayDate = transactionDate.toLocaleString(); // Show full date and time for older transactions
    }

    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionId}>
            {item.transaction_id.slice(0, 8)}... {/* Truncate transaction ID */}
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
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search by transaction ID..."
        value={query}
        onChangeText={handleSearch} // Update search as the user types
      />

      {filteredTransactions.length === 0 ? (
        <Text style={styles.noTransactions}>No transactions found.</Text>
      ) : (
        <FlatList
          data={filteredTransactions} // Display filtered transactions
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

export default History;
