import React, { useState,useCallback } from 'react';
import { VStack, TextInput, Button, Text } from '@react-native-material/core';
import { Image, TouchableOpacity, View, ScrollView,RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';

function AddContact() {
  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [rating, setRating] = useState(0);
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigation = useNavigation();

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

  const resetAllFields = () => {
    setName('');
    setSelectedFile(null);
    setRating(0);
    setPhone('');
    setAddressLine1('');
    setAddressLine2('');
    setCity('');
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    resetAllFields();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSumit = async () => {
    if(name == '' || phone == '' || rating ==0 || selectedFile == null){
      alert('Please enter mandatory the fields')
    }
    else{
    setIsButtonDisabled(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('photo', {
      uri: selectedFile.uri,
      name: selectedFile.name,
      type: 'image/jpeg',
    });
    formData.append('addressLine1', addressLine1);
    formData.append('addressLine2', addressLine2);
    formData.append('city', city);
    formData.append('rating', rating);
    try {
      const response = await fetch('https://infotrackin.com/enterprise/ContactAppController/add_contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      if (response.ok) {
        const responseData = await response.json();
        alert('Contact added successfully');
       console.log(responseData);
      }
  }
  catch (error) {
     alert(error)
    }
    finally {
      setIsButtonDisabled(false); 
      resetAllFields();
      navigation.navigate('Home');
    }
  }
}

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <VStack direction="row" justify="center" spacing={10} mt={10} p={4}>
        <Image
          alignSelf="center"
          source={{
            uri: selectedFile
              ? selectedFile.uri
              : 'https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg',
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
          title="Add Contact"
          style={{ width: '100%' }}
          onPress={handleSumit}
          disabled={isButtonDisabled}
        />
      </VStack>
    </ScrollView>
  );
}

export default AddContact;
