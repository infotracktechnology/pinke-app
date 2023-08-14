import { useState, useCallback, useEffect } from 'react';
import { Stack, ListItem, Avatar, TextInput   } from '@react-native-material/core';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView, RefreshControl,StyleSheet,TouchableOpacity  } from 'react-native';

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
    >
      <Stack spacing={4} mt={10}>
        <TextInput
          placeholder="Search contacts"
          variant="outlined"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ paddingHorizontal: 10 }}
          keyboardType="web-search"
          inlineImageLeft="search_icon"
        />

           

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
                name="account-edit-outline"
                size={24}
                color="black"
              />
            }
          />
        ))}

   <TouchableOpacity style={styles.fabContainer} onPress={() => navigation.navigate('Add Contact')}>
    <MaterialCommunityIcons name="plus" size={24} color="white" />
   </TouchableOpacity>
    
      </Stack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: -70,
    right: 15,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});

export default HomeScreen;
