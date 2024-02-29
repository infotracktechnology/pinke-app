import { useState, useCallback, useEffect } from 'react';
import { Stack, ListItem, Avatar, TextInput,Text   } from '@react-native-material/core';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView, RefreshControl,Linking,TouchableOpacity,StyleSheet  } from 'react-native';
import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';


function HomeScreen({ navigation }) {
  const [contacts, setContacts] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [location, setLocation] = useState(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearchQuery('');
    setRatingFilter(0);
    fetchContacts();
    fetchlocation();
    setTimeout(() => {
    setRefreshing(false);
    }, 2000);
  }, []);

  const fetchContacts = () => {
    fetch('https://infotrackin.com/enterprise/ContactAppController/all')
      .then((response) => response.json())
      .then((json) => setContacts(json));
  };

  const  fetchlocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      fetchContacts();
      setSearchQuery('');
      setRatingFilter(0);
      fetchlocation();
    });
    //fetchlocation();
  }, []);

  const filteredContacts = contacts
  ? contacts.filter(
      (contact) =>
        (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)) &&
        (ratingFilter === 0 || contact.rating == ratingFilter)
    )
  : [];


  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <Stack spacing={4} mt={10} >
        <TextInput
          placeholder="Search contacts"
          variant="outlined"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ paddingHorizontal: 10 }}
          keyboardType="web-search"
          inlineImageLeft="search_icon"
        />
     

<Text style={styles.ratingFilterLabel}>Filter Rating : {ratingFilter}</Text>

<Text>{JSON.stringify(location)}</Text>

  <Slider
    style={styles.slider}
    value={ratingFilter}
    onValueChange={(value) => setRatingFilter(value)}
    minimumValue={0}
    maximumValue={5}
    step={1}
    minimumTrackTintColor="#307ecc"
    maximumTrackTintColor="#000000"
    thumbTintColor="#307ecc"

  />
 
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 60, paddingTop: 20,paddingBottom: 15   }}
          onPress={() => navigation.navigate('Add Contact')}
        >
          <MaterialCommunityIcons name="account-plus-outline" color='#dd127b' size={24} style={{ marginRight: 15 }} />
          <Text color='#dd127b'>Create New Contact</Text>
        </TouchableOpacity>

   


        {filteredContacts.map((contact) => (
          <ListItem
            key={contact.id}
            leadingMode="avatar"
            leading={<Avatar image={{ uri: contact.photo }} />}
            title={contact.phone}
            onPress={() => navigation.navigate('Edit Contact', { id: contact.id })}
            overline={contact.name}
            secondaryText={[
              ...Array(Number(contact.rating))].map((_, index) => (
              <MaterialCommunityIcons
                key={index}
                name="star"
                color="black"
                size={20}
              />
            ))}
            meta={
              <MaterialCommunityIcons
                name="phone"
                size={24}
                color="black"
                onPress={() => Linking.openURL(`tel:${contact.phone}`)}
              />
            }
          />
        ))}


    
      </Stack>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  ratingFilterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    paddingLeft: 20,
  },
  slider: {
    width: '100%',
    paddingBottom: 10,
    maxHeight: 400
  },
  ratingValueText: {
    fontSize: 14,
    color: '#888',
    paddingLeft: 20,
  },
 
});



export default HomeScreen;
