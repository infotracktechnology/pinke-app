import React, { useReducer } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, ListItem, Avatar } from '@react-native-material/core'; // Corrected import
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const initialContacts = [
  {
    id: 1,
    name: 'John Doe',
    phone: '123-456-7890',
    photoUrl: 'https://mui.com/static/images/avatar/1.jpg', 
  },
  {
    id: 2,
    name: 'Jane Smith',
    phone: '987-654-3210',
    photoUrl: 'https://mui.com/static/images/avatar/1.jpg', 
  },
];

const reducer = (state, action) => {
  switch (action.type) {
  
    default:
      return state;
  }
};

function HomeScreen() {
  const [contacts, dispatch] = useReducer(reducer, initialContacts);

  const handleCall = (phone) => {

  };

  return (
    <Stack spacing={4} mt={10}>

      {contacts.map((contact) => (
        <ListItem
          key={contact.id}
          title={contact.name}
          overline={contact.phone}
          meta={<MaterialCommunityIcons name="phone"  color='black' size={20}/>}
          onPress={() => {}}
        />
      ))}
    </Stack>
  );
}

export default HomeScreen;

