import React, { useState, useEffect } from 'react';
import { VStack, TextInput, Button, Text } from '@react-native-material/core';
import { Image, TouchableOpacity, View, ScrollView,RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

function EditContact({ route, navigation }) {
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [rating, setRating] = useState(0);
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [ContactId, setContactId] = useState(0);
 

  useEffect(() => {
    navigation.addListener('focus', () => {
      fetchContacts(route.params.id);
    });
  }, []);

  const fetchContacts = (id) => {
    fetch("https://infotrackin.com/enterprise/ContactAppController/findbyid/"+id)
      .then((response) => response.json())
      .then((json) => {
        setName(json.name.trim());
        setPhone(json.phone.trim());
        setSelectedFile({ uri: json.photo });
        setAddressLine1(json.addressLine1.trim());
        setAddressLine2(json.addressLine2.trim());
        setCity(json.city.trim());
        setRating(json.rating);
        setContactId(json.id);
      });
  }

  const pickImageFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });
      if(result.assets[0].size > 1000000){
        alert('Please select image less than 1MB');
        setSelectedFile(null);
      }
      else{
        setSelectedFile(result.assets[0]);
        console.log(result.assets[0]);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSumit = async () => {
    if(name == '' || phone == '' || rating ==0){
      alert('Please enter mandatory the fields')
    }
    else{
    setIsButtonDisabled(true);
    const formData = new FormData();
    formData.append('id', ContactId);
    formData.append('name', name);
    formData.append('phone', phone);
    if(selectedFile.hasOwnProperty('name')){
      formData.append('photo', {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: 'image/jpeg',
      });
    }
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    formData.append('city', city);
    formData.append('rating', rating);
    try {
      const response = await fetch('https://infotrackin.com/enterprise/ContactAppController/Edit_contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      if (response.ok) {
        const responseData = await response.json();
        alert('Contact updated successfully');
       console.log(responseData);
      }
  }
  catch (error) {
     alert(error)
    }
    finally {
      setIsButtonDisabled(false); 
      navigation.navigate('Home');
    }
  }
}

const handleDelete = async () => {
  try {
    fetch("https://infotrackin.com/enterprise/ContactAppController/Delete_contact/"+ContactId)
    .then((response) => {
     if(response.ok){
      alert('Contact deleted successfully');
      navigation.navigate('Home');
     }
    })
  } catch (error) {
    alert(error);
  }
}


  return (
    <ScrollView>
      <VStack direction="column" spacing={10} mt={10} p={4}>
      <Image
          alignSelf="center"
          source={{
            uri: selectedFile
              ? selectedFile.uri
              : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          }}
          style={{ width: 130, height: 130, borderRadius: 100 }}
        />

        <Button title="Choose a Photo" onPress={pickImageFile} />
        <TextInput
          label="Name*"
          value={name}
          onChangeText={setName}
          variant="outlined"
        />
        <TextInput 
          label="Phone*"
          value={phone}
          onChangeText={setPhone}
          variant="outlined"
          keyboardType="decimal-pad"
        />
        <TextInput
          label="Address Line 1"  
          value={addressLine1}
          onChangeText={setAddressLine1}
          variant="outlined"
        />
        <TextInput
          label="Address Line 2"
          value={addressLine2}
          onChangeText={setAddressLine2}
          variant="outlined"
        />
        <TextInput
          label="City"
          value={city}
          onChangeText={setCity}
          variant="outlined"
        />
        <Text alignSelf="center" variant="h6">
          Rating*:
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity
              style={{ marginHorizontal: 10 }}
              key={index}
              onPress={() => handleStarPress(index + 1)}
            >
              <MaterialIcons
                name={rating >= index + 1 ? 'star-rate' : 'star-border'}
                size={30}
                color={rating >= index + 1 ? 'gold' : 'gray'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Button
          title="Update Contact"
          onPress={handleSumit}
          disabled={isButtonDisabled}
        />
        <Button
        color="error"
        title="Delete Contact"
        onPress={handleDelete}
        />

      </VStack>
    </ScrollView>
  );
}

export default EditContact;