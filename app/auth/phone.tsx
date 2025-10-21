import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export default function PhoneScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = `+91${phoneNumber}`;
      
      // For demo purposes, we'll simulate the OTP flow
      // In a real app, you would integrate with Firebase Auth
      
      setTimeout(() => {
        setLoading(false);
        router.push({
          pathname: '/auth/otp' as any,
          params: {
            phoneNumber: formattedPhone,
            verificationId: 'demo-verification-id',
          },
        });
      }, 1000);
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9ff" />
        
        <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>💬</Text>
            </View>
            <Text style={styles.appName}>Travel</Text>
          </View>
        </View>

        {/* Welcome text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Hi! welcome to Tolki</Text>
          <Text style={styles.welcomeSubtitle}>Create your account</Text>
        </View>

        {/* Phone input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter your phone number</Text>
          
          <View style={styles.phoneInputWrapper}>
            <View style={styles.countryCode}>
              <View style={styles.flag}>
                <Text style={styles.flagText}>🇮🇳</Text>
              </View>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            
            <TextInput
              style={styles.phoneInput}
              placeholder="8234792323"
              placeholderTextColor="#9ca3af"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={true}
            />
          </View>

          <Text style={styles.privacyText}>
            Securing your personal information is our priority
          </Text>
        </View>

        {/* Next Button */}
        <TouchableOpacity 
          style={[styles.nextButton, loading && styles.nextButtonDisabled]} 
          onPress={handleNext}
          disabled={loading}
        >
          <Text style={styles.nextButtonText}>
            {loading ? 'Sending...' : 'Next'}
          </Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 28,
    height: 28,
    backgroundColor: '#6366f1',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 16,
    color: 'white',
  },
  appName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 60,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: '#6b7280',
  },
  inputContainer: {
    flex: 1,
    marginTop: 40,
  },
  inputLabel: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 16,
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 12,
    marginBottom: 16,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  flag: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagText: {
    fontSize: 16,
  },
  countryCodeText: {
    fontSize: 18,
    color: '#1f2937',
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    fontSize: 18,
    color: '#1f2937',
    paddingVertical: 8,
  },
  privacyText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
  },
  nextButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 40,
  },
  nextButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});