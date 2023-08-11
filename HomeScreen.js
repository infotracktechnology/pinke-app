import React, { useReducer } from 'react';
import { Stack, ListItem, Avatar,Text } from '@react-native-material/core'; 
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const initialContacts = [
  {
    id: 1,
    name: 'John Doe',
    phone: '123-456-7890',
    photoUrl: 'https://mui.com/static/images/avatar/1.jpg', 
    adderss1:'123 Main St',
    address2: 'New York',
    city: 'New York',
    rating: 4,

  },
  {
    id: 2,
    name: 'Jane Smith',
    phone: '987-654-3210',
    photoUrl: 'https://mui.com/static/images/avatar/2.jpg', 
    adderss1:'123 Main St',
    address2: 'New York',
    city: 'New York',
    rating: 5,
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
   alert(phone);
  };

  const handleIcon = (n) => {
    alert(n);
   };

  return (
    <Stack spacing={4} mt={10}>
      {contacts.map((contact) => (
        <ListItem
          key={contact.id}
          leadingMode="avatar"
          leading={
            <Avatar image={{ uri: contact.photoUrl }} />
          }
          title={contact.phone}
          
          overline={contact.name+handleIcon(contact.rating)}
          secondaryText={contact.adderss1 + ', ' + contact.address2 + ', ' + contact.city} 
          meta={<MaterialCommunityIcons name="phone"  color='black' size={20} onPress={() => handleCall(contact.phone)}/>}
         
          onPress={() => {}}
        />
      ))}
    </Stack>
  );
}

export default HomeScreen;

