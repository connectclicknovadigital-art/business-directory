import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useRouter } from 'expo-router';
import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { auth, signInWithPhoneNumber } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export default function PhoneLoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaVerifier = useRef(null);
  const router = useRouter();
  const { setConfirmationResult } = useAuth();

  const sendVerification = async () => {
    try {
      setLoading(true);
      
      if (!phoneNumber.trim()) {
        Alert.alert("Error", "Please enter a valid phone number");
        return;
      }

      const phoneNumberFormatted = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber.replace(/\s/g, '')}`;

      const confirmation = await signInWithPhoneNumber(auth, phoneNumberFormatted, recaptchaVerifier.current);

      // Store confirmation result in context
      setConfirmationResult(confirmation);

      Alert.alert("OTP Sent!", "Check your SMS inbox.");
      
      // Navigate to OTP screen
      router.push({
        pathname: '/auth/otp',
        params: { 
          phoneNumber: phoneNumberFormatted,
        }
      });
      
    } catch (error) {
      console.log("Error sending OTP:", error);
      Alert.alert("Error sending OTP", error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (text) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);
    
    // Format as XXX XXX XXXX
    if (limited.length >= 6) {
      return `${limited.slice(0, 3)} ${limited.slice(3, 6)} ${limited.slice(6)}`;
    } else if (limited.length >= 3) {
      return `${limited.slice(0, 3)} ${limited.slice(3)}`;
    }
    return limited;
  };

  const handlePhoneNumberChange = (text) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={auth.app.options}
            attemptInvisibleVerification={true}
          />

          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Enter Phone Number</Text>
              <Text style={styles.subtitle}>
                We'll send you a verification code via SMS
              </Text>
            </View>

            {/* Phone Number Input */}
            <View style={styles.inputContainer}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>🇮🇳 +91</Text>
              </View>
              <TextInput
                placeholder="000 000 0000"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="phone-pad"
                style={styles.phoneInput}
                maxLength={12} // Formatted length
                placeholderTextColor="#999"
              />
            </View>

            {/* Get OTP Button */}
            <TouchableOpacity 
              style={[
                styles.otpButton,
                (!phoneNumber.trim() || loading) && styles.buttonDisabled
              ]} 
              onPress={sendVerification}
              disabled={!phoneNumber.trim() || loading}
            >
              <Text style={styles.otpButtonText}>
                {loading ? 'Sending OTP...' : 'Get OTP'}
              </Text>
            </TouchableOpacity>

            {/* Terms */}
            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    minHeight: 400,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#e1e5e9',
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
  },
  countryCode: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e1e5e9',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 18,
    fontSize: 18,
    fontWeight: '500',
    color: '#1a1a1a',
    backgroundColor: '#fff',
  },
  otpButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});
