import { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet,Button,Alert } from 'react-native';
import VenueCard from '@/components/VenueCard';


export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [venue,setvenue] = useState([]);
  const filtered = venue.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );


  const fetchVenue = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/venues');

      const data = await res.json();
      setvenue(data);
      console.log(venue);
      Alert.alert('✅ Venue created!');
    } catch (err) {
      console.error('Error posting venue:', err);
      Alert.alert('❌ Failed to create venue');
    }
  };
  
  useEffect(()=>{
    fetchVenue();
  },[]);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search venues..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchBox}
      />
      <Button title="➕ Post Venue" onPress={fetchVenue} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id || item._id}
        renderItem={({ item }) => (
          <VenueCard
            id={item.id || item._id}
            name={item.name}
            place={item.place}
            price={item.price}
            image={typeof item.image === 'string' ? { uri: item.image } : item.image}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
});
