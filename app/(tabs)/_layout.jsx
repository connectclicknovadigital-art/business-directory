import { Tabs } from 'expo-router'
import { CarTaxiFront, Folders, Home, Search, User } from 'lucide-react-native'

const _layout = () => {
  return (
    <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen name='home' options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }} />
        <Tabs.Screen name='search' options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
        }} />
        <Tabs.Screen name='ride' options={{
            tabBarLabel: 'Cabs',
            tabBarIcon: ({ color, size }) => <CarTaxiFront color={color} size={size} />,
        }} />
        <Tabs.Screen name='bookings' options={{
            tabBarLabel: 'My Bookings',
            tabBarIcon: ({ color, size }) => <Folders color={color} size={size} />,
        }} />
        <Tabs.Screen name='profile' options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }} />
    </Tabs>
  )
}

export default _layout