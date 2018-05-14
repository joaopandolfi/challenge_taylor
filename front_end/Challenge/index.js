import React from 'react';
import { AppRegistry } from 'react-native';

import Ctapp from './src/Ctapp';

const App = () => (
  <Ctapp />
);

export default App;

AppRegistry.registerComponent('Challenge', () => App);