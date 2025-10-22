import { router } from 'expo-router';
import {
  Calendar,
  Car,
  ChevronRight,
  CreditCard,
  Edit,
  HelpCircle,
  LogOut,
  MapPin,
  Phone,
  Settings,
  Shield,
  ShoppingBag,
  Star,
  User
} from 'lucide-react-native';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  // Extract user info (demo data for now)
  const userInfo = {
    name: user?.email?.split('@')[0]?.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Kashmir Traveler',
    email: user?.email || 'Not available',
    phone: '+91 98765 43210', // This would come from user data
    joinDate: 'October 2024',
    totalBookings: 12,
    totalOrders: 8,
    totalRides: 5,
    loyaltyPoints: 250,
    membershipLevel: 'Gold Member'
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/auth/welcome');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const ProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <User size={40} color="white" />
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Edit size={16} color="#6366f1" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerInfo}>
        <Text style={styles.userName}>{userInfo.name}</Text>
        <View style={styles.membershipBadge}>
          <Star size={14} color="#fbbf24" fill="#fbbf24" />
          <Text style={styles.membershipText}>{userInfo.membershipLevel}</Text>
        </View>
        <Text style={styles.joinDate}>Member since {userInfo.joinDate}</Text>
      </View>
    </View>
  );

  const ContactInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Contact Information</Text>
      <View style={styles.contactCard}>
        <View style={styles.contactItem}>
          <View style={styles.contactIcon}>
            <User size={18} color="#6366f1" />
          </View>
          <View style={styles.contactDetails}>
            <Text style={styles.contactLabel}>Full Name</Text>
            <Text style={styles.contactValue}>{userInfo.name}</Text>
          </View>
          <TouchableOpacity>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.contactItem}>
          <View style={styles.contactIcon}>
            <Phone size={18} color="#6366f1" />
          </View>
          <View style={styles.contactDetails}>
            <Text style={styles.contactLabel}>Mobile Number</Text>
            <Text style={styles.contactValue}>{userInfo.phone}</Text>
          </View>
          <TouchableOpacity>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.contactItem}>
          <View style={styles.contactIcon}>
            <User size={18} color="#6366f1" />
          </View>
          <View style={styles.contactDetails}>
            <Text style={styles.contactLabel}>Email Address</Text>
            <Text style={styles.contactValue}>{userInfo.email}</Text>
          </View>
          <TouchableOpacity>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const ActivityStats = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Activity Overview</Text>
      <View style={styles.statsGrid}>
        <TouchableOpacity style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#10b981' }]}>
            <Calendar size={24} color="white" />
          </View>
          <Text style={styles.statNumber}>{userInfo.totalBookings}</Text>
          <Text style={styles.statLabel}>Bookings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#f59e0b' }]}>
            <ShoppingBag size={24} color="white" />
          </View>
          <Text style={styles.statNumber}>{userInfo.totalOrders}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: '#8b5cf6' }]}>
            <Car size={24} color="white" />
          </View>
          <Text style={styles.statNumber}>{userInfo.totalRides}</Text>
          <Text style={styles.statLabel}>Rides</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const LoyaltySection = () => (
    <View style={styles.section}>
      <View style={styles.loyaltyCard}>
        <View style={styles.loyaltyHeader}>
          <View style={styles.loyaltyIcon}>
            <Star size={24} color="#fbbf24" fill="#fbbf24" />
          </View>
          <View style={styles.loyaltyInfo}>
            <Text style={styles.loyaltyTitle}>Loyalty Points</Text>
            <Text style={styles.loyaltyPoints}>{userInfo.loyaltyPoints} Points</Text>
          </View>
          <TouchableOpacity style={styles.redeemButton}>
            <Text style={styles.redeemButtonText}>Redeem</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loyaltyProgress}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '65%' }]} />
          </View>
          <Text style={styles.progressText}>350 points for next reward</Text>
        </View>
      </View>
    </View>
  );

  const MenuOptions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account Options</Text>
      <View style={styles.menuCard}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <CreditCard size={20} color="#6366f1" />
          </View>
          <Text style={styles.menuText}>Payment Methods</Text>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <MapPin size={20} color="#6366f1" />
          </View>
          <Text style={styles.menuText}>Saved Addresses</Text>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <Settings size={20} color="#6366f1" />
          </View>
          <Text style={styles.menuText}>App Settings</Text>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <HelpCircle size={20} color="#6366f1" />
          </View>
          <Text style={styles.menuText}>Help & Support</Text>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>
        
        <View style={styles.divider} />
        
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIcon}>
            <Shield size={20} color="#6366f1" />
          </View>
          <Text style={styles.menuText}>Privacy & Security</Text>
          <ChevronRight size={20} color="#9ca3af" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9ff" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <ContactInfo />
        <ActivityStats />
        <LoyaltySection />
        <MenuOptions />
        
        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOut size={20} color="white" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
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
  profileHeader: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  editButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f8f9ff',
  },
  headerInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 6,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  membershipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#d97706',
    marginLeft: 4,
  },
  joinDate: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactDetails: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginHorizontal: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  loyaltyCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  loyaltyIcon: {
    marginRight: 12,
  },
  loyaltyInfo: {
    flex: 1,
  },
  loyaltyTitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 2,
  },
  loyaltyPoints: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  redeemButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  redeemButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  loyaltyProgress: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fbbf24',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  menuCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 100,
  },
});

export default Profile;