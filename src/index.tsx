import React, {useState, useCallback} from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainScreen from './screens/main-screen'
import AboutScreen from './screens/about-screen'
import Sidebar from './components/sidebar'
import LoginScreen from './screens/login-screen'
import ChartsScreen from './screens/charts-screen'

const Drawer = createDrawerNavigator()

 

const App = () => {

  const [user, setUser] = useState(null);


  const setInitialRouteName = (): string => {
    if(user == null){
      return "Login"
    }
    return "Main"
  }

  return (
    <Drawer.Navigator
      initialRouteName={setInitialRouteName()}
      drawerContent={props => <Sidebar {...props} user={user} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000'
      }}
    >
      <Drawer.Screen name="Login">
        {props => <LoginScreen {...props} setUser={setUser} />}
      </Drawer.Screen>
      <Drawer.Screen name="Main">
        {props => <MainScreen {...props} user={user}/>}
      </Drawer.Screen>
      <Drawer.Screen name="Charts">
        {props => <ChartsScreen {...props} user={user}/>}
      </Drawer.Screen>
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  )
}

export default App
