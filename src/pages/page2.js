import React from 'react';
import {Button, View, Text} from 'react-native';

// Screen Home
const Page2 = ({navigation}) => {
  console.log(navigation);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Page2 Screen</Text>
    </View>
  );
};

export default Page2;
