import { supabase } from '@/lib/supabase';
import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  TextInput,
  Button,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Offer {
  id: string;
  offer_type: string;
  amount: number;
  ussd_code: string;
  created_at: string;
}

interface Props {
  userId: string;
  onViewAll: () => void;
}

const Offers = ({ userId, onViewAll }: Props) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [newOffer, setNewOffer] = useState({ type: 'Data', amount: 20.00, ussd_code: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchOffers();

    const channel = supabase
      .channel('offers')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'offers', filter: `user_id=eq.${userId}` },
        () => {
          fetchOffers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('offers')
        .select('id, offer_type, amount, ussd_code, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error fetching offers:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const checkUserExists = async (userId: string) => {
    const { data, error } = await supabase
      .from('auth.users') // Correctly referencing the auth schema
      .select('id')
      .eq('id', userId);

    if (error) {
      console.error('Error checking user existence:', error.message);
      return false;
    }

    return data && data.length > 0;
  };

  const addNewOffer = async () => {
    if (!newOffer.ussd_code.trim()) {
      Alert.alert('Invalid Input', 'Please enter a valid USSD code.');
      return;
    }

    setLoading(true);
    console.log('User ID:', userId);

    const userExists = await checkUserExists(userId);
    if (!userExists) {
      Alert.alert('Error', 'User does not exist.');
      setLoading(false);
      return;
    }

    const offerData = {
      user_id: userId,
      ussd_code: newOffer.ussd_code,
      offer_type: newOffer.type,
      amount: newOffer.amount,
      data: newOffer.type === 'Data' ? newOffer.amount : null,
      sms: newOffer.type === 'SMS' ? newOffer.amount : null,
    };

    console.log('Offer Data:', offerData);

    const { error } = await supabase
      .from('offers')
      .insert([offerData]);

    setLoading(false);

    if (error) {
      Alert.alert('Error adding offer:', error.message);
    } else {
      fetchOffers();
      Alert.alert('Success', 'Offer added successfully.');
      setIsFormVisible(false);
      setNewOffer({ type: 'Data', amount: 20.00, ussd_code: '' });
      slideOut();
    }
  };

  const slideIn = () => {
    setIsFormVisible(true);
    Animated.timing(formAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(formAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsFormVisible(false));
  };

  const renderOfferItem = ({ item }: { item: Offer }) => (
    <View style={styles.offerItem}>
      <Text style={styles.offerType}>{item.offer_type}</Text>
      <Text style={styles.offerAmount}>Ksh {item.amount.toFixed(2)}</Text>
      <Text style={styles.offerDate}>{new Date(item.created_at).toLocaleString()}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#1e90ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Offers</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {offers.length === 0 ? (
        <Text style={styles.noOffers}>No offers found.</Text>
      ) : (
        <FlatList
          data={offers}
          renderItem={renderOfferItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={slideIn}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      {isFormVisible && (
        <Animated.View style={[styles.formContainer, { opacity: formAnimation, transform: [{ translateY: formAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 0],
          }) }] }]}>
          <Text style={styles.formTitle}>Add New Offer</Text>
          <TextInput
            placeholder="USSD Code (e.g., *180*5*2*Phone_No*3*1)"
            value={newOffer.ussd_code}
            onChangeText={(text) => setNewOffer((prev) => ({ ...prev, ussd_code: text }))}
            style={styles.input}
          />
          <TextInput
            placeholder="Amount (20.00)"
            keyboardType="numeric"
            value={newOffer.amount.toString()}
            onChangeText={(text) => setNewOffer((prev) => ({ ...prev, amount: parseFloat(text) || 0 }))}
            style={styles.input}
          />
          <TextInput
            placeholder="Offer Type (Data/SMS)"
            value={newOffer.type}
            onChangeText={(text) => setNewOffer((prev) => ({ ...prev, type: text }))}
            style={styles.input}
          />
          <Button title="Add Offer" onPress={addNewOffer} />
          <Button title="Cancel" onPress={slideOut} color="red" />
        </Animated.View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAll: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 16,
  },
  offerItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  offerType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  offerAmount: {
    fontSize: 16,
    color: '#666',
  },
  offerDate: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  noOffers: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#0DF69E',
    borderRadius: 50,
    padding: 16,
    elevation: 5,
  },
  formContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
});

export default Offers;
