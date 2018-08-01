import { createSwitchNavigator } from 'react-navigation';
import GameScreen from './components/GameScreen'
import LoseScreen from './components/LoseScreen'
import WinScreen from './components/WinScreen'

const App = createSwitchNavigator({
  GameScreen: { screen: GameScreen },
  LoseScreen: { screen: LoseScreen },
  WinScreen: { screen: WinScreen },  
}, {initialRouteName: 'GameScreen'});

export default App;