import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

export const HomeScreen = () => {
  const { user } = useAuth();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.greeting}>Hello, {user?.name || 'User'} 👋</Text>
        <View style={styles.card}>
           <Text style={styles.cardTitle}>Welcome to PremiumAuth</Text>
           <Text style={styles.cardText}>
             Your account is successfully registered and authenticated via Mock Services. You can navigate out and change your profile settings in the profile tab.
           </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24 },
  greeting: { fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 32 },
  card: { backgroundColor: colors.surface, padding: 24, borderRadius: 16, borderColor: colors.border, borderWidth: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: colors.primary, marginBottom: 12 },
  cardText: { fontSize: 15, color: colors.textSecondary, lineHeight: 22 }
});
