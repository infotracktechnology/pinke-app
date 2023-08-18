import { useState, useCallback, useEffect } from 'react';
import { Stack, ListItem, Avatar, TextInput,Text   } from '@react-native-material/core';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView, RefreshControl,Linking,TouchableOpacity  } from 'react-native';

function HomeScreen({ navigation }) {
  const [contacts, setContacts] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearchQuery('');
    fetchContacts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchContacts = () => {
    fetch('https://infotrackin.com/enterprise/ContactAppController/all')
      .then((response) => response.json())
      .then((json) => setContacts(json));
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      fetchContacts();
    });
  }, []);

  const filteredContacts = contacts
    ? contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.includes(searchQuery)
      )
    : [];

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 80 }} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={{ flex: 1,backgroundColor: 'white' }}
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

        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 60, paddingTop: 15,paddingBottom: 15   }}
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



export default HomeScreen;
