import { Redirect, Tabs } from 'expo-router';
import { CarTaxiFront, Folders, Home, Search, User } from 'lucide-react-native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const TabsLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth/welcome" />;
  }

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#6366f1',
      tabBarInactiveTintColor: '#6b7280',
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopColor: '#e5e7eb',
        borderTopWidth: 1,
        paddingTop: 4,
        paddingBottom: 4,
      }
    }}>
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
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9ff',
  },
});

export default TabsLayout;