import React, { useState } from 'react';
import { VStack, Text, TextInput, Button } from '@react-native-material/core';

function AddContact() {
  const [name, setName] = useState('');

  const handlename = (newName) => {
    const numericOnly = newName.replace(/\D/g, '');
    setName(numericOnly);
  };

  return (
    <VStack justify="center" spacing={20} p={4}>
      <TextInput label="Name" value={name} onChangeText={handlename} />
      <Button title="Save Contact" />
    </VStack>
  );
}

export default AddContact;


