import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Alert, TextInput } from 'react-native';

interface Offer {
  offer_id: string;
  user_id: string;
  ussd_code: string;
  data: string;
  sms: string;
  offers_type: string;
  amount: number;
  created_at: string;
}

interface Props {
  userId: string;
  filter: string;
  searchQuery: string;
}

const Offers = ({ userId, filter, searchQuery }: Props) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    fetchOffers();
  }, [filter]);

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('offers')
        .select('offer_id, user_id, ussd_code, data, sms, offers_type, amount, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (filter !== 'All') {
        query = query.eq('offers_type', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setOffers(data || []);
      setFilteredOffers(data || []);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error fetching offers: ', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setQuery(text);

    if (text) {
      const filtered = offers.filter((offer) =>
        offer.ussd_code.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredOffers(filtered);
    } else {
      setFilteredOffers(offers);
    }
  };

  const renderOfferItem = ({ item }: { item: Offer }) => {
    const offerDate = new Date(item.created_at);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let displayDate;

    if (offerDate.toDateString() === today.toDateString()) {
      displayDate = `Today at ${offerDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (offerDate.toDateString() === yesterday.toDateString()) {
      displayDate = `Yesterday at ${offerDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      displayDate = `${offerDate.toLocaleDateString()} at ${offerDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    return (
      <View style={styles.offerItem}>
        <View style={styles.offerDetails}>
          <Text style={styles.ussdCode}>{item.ussd_code}</Text>
          <Text style={styles.offerDate}>{displayDate}</Text>
        </View>
        <Text style={styles.offerAmount}>Ksh {item.amount.toFixed(2)}</Text>
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
        placeholder="Search by USSD code..."
        value={query}
        onChangeText={handleSearch}
      />

      {filteredOffers.length === 0 ? (
        <Text style={styles.noOffers}>No offers found.</Text>
      ) : (
        <FlatList
          data={filteredOffers}
          renderItem={renderOfferItem}
          keyExtractor={(item) => item.offer_id}
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
  offerItem: {
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
  offerDetails: {
    flexDirection: 'column',
  },
  ussdCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  offerDate: {
    fontSize: 14,
    color: '#666',
  },
  offerAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  noOffers: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Offers;
