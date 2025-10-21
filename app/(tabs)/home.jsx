import {
    Building2,
    Hotel,
    MapPin,
    Phone,
    Plus,
    Search,
    Shield,
    Star,
    UtensilsCrossed
} from 'lucide-react-native';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const categories = [
    {
      id: 1,
      title: 'Hotels',
      icon: Hotel,
      color: '#6366f1',
      count: '125+',
      description: 'Find & Book Hotels'
    },
    {
      id: 2,
      title: 'Restaurants',
      icon: UtensilsCrossed,
      color: '#10b981',
      count: '200+',
      description: 'Reserve Tables'
    },
    {
      id: 3,
      title: 'Pharmacy',
      icon: Plus,
      color: '#f59e0b',
      count: '85+',
      description: 'Medical Stores'
    },
    {
      id: 4,
      title: 'Hospitals',
      icon: Building2,
      color: '#ef4444',
      count: '45+',
      description: 'Clinics & Hospitals'
    },
    {
      id: 5,
      title: 'Police Stations',
      icon: Shield,
      color: '#8b5cf6',
      count: '25+',
      description: 'Emergency Services'
    }
  ];

  const featuredPlaces = [
    {
      id: 1,
      name: 'Dal Lake Resort',
      type: 'Hotel',
      rating: 4.8,
      price: '₹3,500',
      image: '🏨',
      location: 'Dal Lake, Srinagar'
    },
    {
      id: 2,
      name: 'Kashmiri Wazwan',
      type: 'Restaurant',
      rating: 4.6,
      price: '₹800',
      image: '🍽️',
      location: 'Lal Chowk, Srinagar'
    },
    {
      id: 3,
      name: 'Gulmarg Heights',
      type: 'Hotel',
      rating: 4.9,
      price: '₹5,200',
      image: '🏔️',
      location: 'Gulmarg Valley'
    }
  ];

  const CategoryCard = ({ category }) => {
    const IconComponent = category.icon;
    return (
      <TouchableOpacity style={styles.categoryCard}>
        <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
          <IconComponent color="white" size={28} />
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          <Text style={styles.categoryCount}>{category.count}</Text>
          <Text style={styles.categoryDescription}>{category.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const FeaturedCard = ({ place }) => (
    <TouchableOpacity style={styles.featuredCard}>
      <View style={styles.featuredImageContainer}>
        <Text style={styles.featuredEmoji}>{place.image}</Text>
        <View style={styles.ratingBadge}>
          <Star size={12} color="#fbbf24" fill="#fbbf24" />
          <Text style={styles.ratingText}>{place.rating}</Text>
        </View>
      </View>
      <View style={styles.featuredInfo}>
        <Text style={styles.featuredName}>{place.name}</Text>
        <Text style={styles.featuredType}>{place.type}</Text>
        <View style={styles.featuredDetails}>
          <MapPin size={12} color="#6b7280" />
          <Text style={styles.featuredLocation}>{place.location}</Text>
        </View>
        <Text style={styles.featuredPrice}>{place.price}/night</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9ff" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>Welcome to Kashmir! 🏔️</Text>
              <Text style={styles.userName}>Hello, {user?.email?.split('@')[0] || 'Traveler'}</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileIcon}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search hotels, restaurants..."
              placeholderTextColor="#9ca3af"
            />
          </View>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#6366f1" />
            <Text style={styles.locationText}>Srinagar, Kashmir</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Listed Places</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.8⭐</Text>
            <Text style={styles.statLabel}>Average Rating</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>Support</Text>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </View>
        </View>

        {/* Featured Places */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Places</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
            {featuredPlaces.map((place) => (
              <FeaturedCard key={place.id} place={place} />
            ))}
          </ScrollView>
        </View>

        {/* Emergency Contact */}
        <View style={styles.emergencyContainer}>
          <View style={styles.emergencyHeader}>
            <Shield size={24} color="#ef4444" />
            <Text style={styles.emergencyTitle}>Emergency Contacts</Text>
          </View>
          <View style={styles.emergencyButtons}>
            <TouchableOpacity style={styles.emergencyButton}>
              <Phone size={18} color="white" />
              <Text style={styles.emergencyButtonText}>Police: 100</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyButton}>
              <Plus size={18} color="white" />
              <Text style={styles.emergencyButtonText}>Medical: 108</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  profileButton: {
    width: 44,
    height: 44,
    backgroundColor: '#6366f1',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
    color: 'white',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  categoriesGrid: {
    gap: 12,
  },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  featuredScroll: {
    paddingLeft: 0,
  },
  featuredCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginRight: 16,
    width: 260,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  featuredImageContainer: {
    height: 120,
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  featuredEmoji: {
    fontSize: 48,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
  },
  featuredInfo: {
    padding: 16,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  featuredType: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
    marginBottom: 8,
  },
  featuredDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredLocation: {
    fontSize: 13,
    color: '#6b7280',
    marginLeft: 4,
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10b981',
  },
  emergencyContainer: {
    marginHorizontal: 20,
    backgroundColor: '#fef2f2',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8,
  },
  emergencyButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  emergencyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
});

export default Home;