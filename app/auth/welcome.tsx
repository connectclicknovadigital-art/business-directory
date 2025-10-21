import { router } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/auth/phone' as any);
  };

  return (
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

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.phoneContainer}>
            {/* Phone illustration with chat bubbles */}
            <View style={styles.phone}>
              <View style={styles.phoneScreen}>
                {/* Chat avatars and bubbles */}
                <View style={styles.chatContainer}>
                  <View style={[styles.avatar, { backgroundColor: '#ff6b6b' }]} />
                  <View style={[styles.avatar, { backgroundColor: '#4ecdc4' }]} />
                  <View style={[styles.avatar, { backgroundColor: '#45b7d1' }]} />
                  <View style={styles.chatBubble}>
                    <Text style={styles.chatText}>...</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          
          {/* Floating emojis */}
          <View style={[styles.floatingEmoji, { top: 50, left: 30 }]}>
            <Text style={styles.emojiText}>😄</Text>
          </View>
          <View style={[styles.floatingEmoji, { top: 80, right: 40 }]}>
            <Text style={styles.emojiText}>😊</Text>
          </View>
          <View style={[styles.floatingEmoji, { top: 150, left: 20 }]}>
            <Text style={styles.emojiText}>😍</Text>
          </View>
          <View style={[styles.floatingEmoji, { bottom: 150, right: 30 }]}>
            <Text style={styles.emojiText}>🤗</Text>
          </View>
          <View style={[styles.floatingEmoji, { bottom: 100, left: 40 }]}>
            <Text style={styles.emojiText}>😎</Text>
          </View>
          <View style={[styles.floatingEmoji, { bottom: 200, right: 60 }]}>
            <Text style={styles.emojiText}>😘</Text>
          </View>
        </View>

        {/* Welcome text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Let's start the chat!</Text>
          <Text style={styles.subtitle}>
            Connect with friends and family securely{'\n'}and find private, enjoy!
          </Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
          <Text style={styles.getStartedText}>Get started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 40,
  },
  phoneContainer: {
    alignItems: 'center',
  },
  phone: {
    width: 180,
    height: 320,
    backgroundColor: '#1f2937',
    borderRadius: 25,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#6366f1',
    borderRadius: 20,
    padding: 16,
    justifyContent: 'center',
  },
  chatContainer: {
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginVertical: 4,
  },
  chatBubble: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 8,
  },
  chatText: {
    fontSize: 18,
    color: '#1f2937',
  },
  floatingEmoji: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emojiText: {
    fontSize: 16,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  getStartedButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 40,
  },
  getStartedText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});