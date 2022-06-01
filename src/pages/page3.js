import React from 'react';
import {Button, View, Text} from 'react-native';

// Screen Page3
const Page3 = ({navigation}) => {
  console.log(navigation);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Page3 Screen</Text>
    </View>
  );
};

export default Page3;
