import { router, useLocalSearchParams } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
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
    View
} from 'react-native';
import { auth } from '../../config/firebase';

export default function OTPScreen() {
  const { phoneNumber, verificationId } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }

    setLoading(true);
    try {
      // For demo purposes, we'll simulate successful authentication
      // In a real app, you would verify the OTP with Firebase
      
      if (otpCode === '123456' || otpCode === '000000') {
        // Create a demo user account
        const email = `user_${typeof phoneNumber === 'string' ? phoneNumber.replace('+', '') : '91234567890'}@demo.com`;
        const password = 'demopassword123';
        
        try {
          // Try to create new user
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (createError: any) {
          // If user already exists, sign in
          if (createError.code === 'auth/email-already-in-use') {
            await signInWithEmailAndPassword(auth, email, password);
          } else {
            throw createError;
          }
        }
        
        // Navigation will be handled by AuthContext
        router.replace('/(tabs)/home' as any);
      } else {
        Alert.alert('Error', 'Invalid OTP. Please use 123456 or 000000 for demo.');
      }
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    // Implement resend logic here
    Alert.alert('OTP Sent', 'A new OTP has been sent to your phone');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Verify Phone</Text>
          <Text style={styles.headerSubtitle}>
            Code has been sent to {phoneNumber}
          </Text>
        </View>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                digit && styles.otpInputFilled,
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              keyboardType="numeric"
              maxLength={1}
              selectTextOnFocus
              returnKeyType={index === 5 ? 'done' : 'next'}
              onSubmitEditing={() => {
                if (index === 5) {
                  Keyboard.dismiss();
                } else {
                  inputRefs.current[index + 1]?.focus();
                }
              }}
              blurOnSubmit={index === 5}
            />
          ))}
        </View>

        {/* Resend Section */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't get OTP Code ?</Text>
          <TouchableOpacity 
            onPress={handleResend} 
            disabled={timeLeft > 0}
            style={styles.resendButton}
          >
            <Text style={[
              styles.resendButtonText,
              timeLeft > 0 && styles.resendButtonTextDisabled
            ]}>
              {timeLeft > 0 ? `Resend Code (${timeLeft}s)` : 'Resend Code'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Verify Button */}
        <TouchableOpacity 
          style={[styles.verifyButton, loading && styles.verifyButtonDisabled]} 
          onPress={handleVerify}
          disabled={loading}
        >
          <Text style={styles.verifyButtonText}>
            {loading ? 'Verifying...' : 'Verify'}
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
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
  },
  otpInputFilled: {
    backgroundColor: '#6366f1',
    color: 'white',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resendText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  resendButton: {
    paddingVertical: 4,
  },
  resendButtonText: {
    fontSize: 16,
    color: '#6366f1',
    fontWeight: '500',
  },
  resendButtonTextDisabled: {
    color: '#9ca3af',
  },
  verifyButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  verifyButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  fromMessages: {
    textAlign: 'center',
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 4,
  },
  messageCode: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
  },
});