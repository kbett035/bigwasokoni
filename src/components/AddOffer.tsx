// Import dependencies for the component
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

// AddOffer component to add new offers by agents
const AddOffer = () => {
  // Modal visibility state to show or hide the add offer modal
  const [modalVisible, setModalVisible] = useState(false);
  
  // Form states: USSD code, amount, offer type, loading indicator, and user ID
  const [ussdCode, setUssdCode] = useState('');
  const [amount, setAmount] = useState<number | null>(null);
  const [offersType, setOffersType] = useState('Data');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch user ID on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log('Error fetching user:', error.message);  // Log any errors fetching user data
      } else if (data?.user) {
        setUserId(data.user.id);  // Store user ID if available
      }
    };
    fetchUser();
  }, []);

  // Add offer function: Validates inputs and inserts data into 'offers' table
  const addOffer = async () => {
    if (!ussdCode || amount === null || !offersType) {
      Alert.alert('Please fill in all fields');  // Alert if any field is missing
      return;
    }

    if (!userId) {
      Alert.alert('User not logged in');  // Alert if user ID is not available
      return;
    }

    setLoading(true);  // Set loading to true while request is being processed

    try {
      // Insert offer details into the database
      const { error } = await supabase
        .from('offers')
        .insert([{ ussd_code: ussdCode, amount, offers_type: offersType, user_id: userId }]);

      if (error) throw error;

      Alert.alert('Success', 'Offer added successfully');  // Success alert
      resetForm();  // Clear the form
      setModalVisible(false);  // Close modal on successful submission
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error adding offer:', error.message);  // Show error if any issue occurs
      }
    } finally {
      setLoading(false);  // Reset loading state after request completes
    }
  };

  // Reset form fields to initial state
  const resetForm = () => {
    setUssdCode('');
    setAmount(null);
    setOffersType('Data');
  };

  // Handle closing modal and resetting form
  const handleModalClose = () => {
    resetForm();
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Floating Action Button to open the Add Offer modal */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={56} color="#0DF69E" />
      </TouchableOpacity>

      {/* Modal for adding a new offer */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Offer</Text>

            {/* Input for USSD code */}
            <Text style={styles.label}>USSD Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter USSD code"
              placeholderTextColor="gray"
              value={ussdCode}
              onChangeText={setUssdCode}
            />

            {/* Input for Amount in Ksh */}
            <Text style={styles.label}>Amount (Ksh)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="gray"
              value={amount !== null ? amount.toString() : ''}
              onChangeText={(text) => setAmount(isNaN(parseFloat(text)) ? null : parseFloat(text))}
              keyboardType="numeric"
            />

            {/* Picker for selecting Offer Type */}
            <Text style={styles.label}>Offer Type</Text>
            <Picker
              selectedValue={offersType}
              style={styles.picker}
              onValueChange={(itemValue) => setOffersType(itemValue)}
            >
              <Picker.Item label="Data" value="Data" />
              <Picker.Item label="SMS" value="SMS" />
            </Picker>

            {/* Add Offer Button */}
            <Button
              title={loading ? 'Adding...' : 'Add Offer'}
              onPress={addOffer}
              disabled={loading}
              color="#0DF69E"
            />
            <Button title="Cancel" onPress={handleModalClose} color="gray" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#262626',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#262626',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#262626',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    color: '#262626',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    color: '#262626',
  },
});

export default AddOffer;
