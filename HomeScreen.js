import { useReducer, useState,useCallback,useEffect } from 'react';
import { Stack, ListItem, Avatar,TextInput } from '@react-native-material/core'; 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView,RefreshControl } from 'react-native';




function HomeScreen() {
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
    fetchContacts();
  }, []);
  

  const handleCall = (phone) => {
   alert(phone);
  };

  const filteredContacts = contacts
  ? contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
    )
  : [];

 

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    <Stack spacing={4} mt={10}>

       <TextInput
        placeholder="Search contacts"
        variant='outlined'
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={{ paddingHorizontal: 10, }}
        keyboardType="web-search"
        inlineImageLeft='search_icon'
      />

      {filteredContacts.map((contact) => (
        <ListItem
          key={contact.id}
          leadingMode="avatar"
          leading={
            <Avatar image={{ uri: contact.photo }} />
          }
          title={contact.phone}
          
          overline={contact.name}
          secondaryText={[...Array(contact.rating)].map((_, index) => (
            <MaterialCommunityIcons key={index} name="star"  color='black' size={20} onPress={() => handleStarPress(index + 1)} />
          ))} 
          meta={ <MaterialCommunityIcons name="account-edit-outline" size={24} color="black" /> }
         
          onPress={() => {}}
        />
      ))}
    </Stack>
    </ScrollView>
  );
}

export default HomeScreen;

