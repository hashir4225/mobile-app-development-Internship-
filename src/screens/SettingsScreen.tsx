import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';

export const SettingsScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: logout }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Settings</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user?.email}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.label}>User ID</Text>
              <Text style={styles.value}>{user?.id}</Text>
            </View>
          </View>
        </View>

        <Button 
          title="Sign Out" 
          variant="danger" 
          onPress={handleLogout} 
          style={styles.logoutBtn}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.text, marginBottom: 32 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.textSecondary, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 },
  card: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  label: { color: colors.text, fontSize: 16, fontWeight: '500' },
  value: { color: colors.textSecondary, fontSize: 16 },
  divider: { height: 1, backgroundColor: colors.border, marginLeft: 16 },
  logoutBtn: { marginTop: 'auto' }
});
