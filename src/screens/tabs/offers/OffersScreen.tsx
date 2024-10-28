import { useUserStore } from '@/store/useUserStore'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Offers from '@/src/components/Offers';

const OffersScreen = () => {
  const { session } = useUserStore();
  const [activeTab, setActiveTab] = useState<'All' | 'Data' | 'SMS'>('All'); // Default to 'All'
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabPress = (tab: 'All' | 'Data' | 'SMS') => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Offers</Text>
      </View>

      {/* Tabs for All, Data, SMS */}
      <View style={styles.tabsContainer}>
        {['All', 'Data', 'SMS'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabPress(tab as 'All' | 'Data' | 'SMS')}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transaction History */}
      <View style={styles.historyContainer}>
        <Offers userId={session?.user.id || ''} filter={activeTab} searchQuery={searchQuery} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeTab: {
    backgroundColor: '#0DF69E',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: 'white',
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20, // Add padding to the bottom if needed
  },
});

export default OffersScreen;
