import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './components/homeScreen';
import GameScreen from './components/gameScreen';
import CreateRoomScreen from './components/createRoomScreen';
import JoinRoomScreen from './components/joinRoomScreen';
import WaitingRoomScreen from './components/waitingRoomScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  CreateRoom: {screen: CreateRoomScreen},
  JoinRoom: {screen: JoinRoomScreen},
  WaitingRoom: {screen: WaitingRoomScreen},
  Game: {screen: GameScreen}
});

const App = createAppContainer(MainNavigator);

export default App;