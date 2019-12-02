// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// import AppContainer from './src/routes';
// import ContactView from './src/views/Contact/ContactView'

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <ContactView />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppContainer from './src/routes';

export default function App() {
  return (
    <View style={styles.screens}>
      <AppContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  screens: {
    flex: 1
  }
});