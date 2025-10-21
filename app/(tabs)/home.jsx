import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Business Directory!</Text>
        <Text style={styles.subtitle}>You are successfully logged in</Text>
        
        <View style={styles.userCard}>
          <Text style={styles.cardTitle}>User Information</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Text style={styles.userId}>User ID: {user?.uid}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  userCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  userEmail: {
    fontSize: 16,
    color: '#6366f1',
    marginBottom: 8,
  },
  userId: {
    fontSize: 14,
    color: '#9ca3af',
  },
});

export default Home;