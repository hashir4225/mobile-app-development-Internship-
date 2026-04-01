import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  bio: Yup.string().max(160, 'Bio is too long'),
});

export const ProfileScreen = () => {
  const { user, updateProfile } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(user?.profilePicture || null);

  const handleSelectImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    
    if (result.assets && result.assets.length > 0) {
      setProfilePic(result.assets[0].uri || null);
    } else if (result.errorMessage) {
      Alert.alert('Error', result.errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleSelectImage} style={styles.imageWrapper}>
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={styles.image} />
            ) : (
              <View style={[styles.image, styles.placeholderImage]}>
                 <Text style={styles.placeholderText}>{user?.name?.charAt(0) || 'U'}</Text>
              </View>
            )}
            <View style={styles.editIconBadge}>
              <Text style={styles.editIconText}>✏️</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Formik
          initialValues={{ name: user?.name || '', bio: user?.bio || '' }}
          validationSchema={ProfileSchema}
          onSubmit={async (values) => {
            setIsUpdating(true);
            try {
              await updateProfile({ ...values, profilePicture: profilePic || undefined });
              Alert.alert('Success', 'Profile updated successfully!');
            } catch (e) {
              Alert.alert('Error', 'Failed to update profile');
            }
            setIsUpdating(false);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              <Input
                label="Full Name"
                placeholder="Enter your name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                error={errors.name}
                touched={touched.name}
              />
              <Input
                label="Bio"
                placeholder="Write a little about yourself..."
                onChangeText={handleChange('bio')}
                onBlur={handleBlur('bio')}
                value={values.bio}
                error={errors.bio}
                touched={touched.bio}
                multiline
                numberOfLines={3}
                style={[styles.inputMulti]}
              />
              
              <Button 
                title="Save Changes" 
                onPress={handleSubmit as any} 
                isLoading={isUpdating} 
                style={styles.saveBtn}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, paddingBottom: 60 },
  header: { marginBottom: 32 },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.text },
  imageContainer: { alignItems: 'center', marginBottom: 32 },
  imageWrapper: { position: 'relative' },
  image: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: colors.primary },
  placeholderImage: { backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { fontSize: 40, color: colors.textSecondary, fontWeight: 'bold' },
  editIconBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.primary, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.background },
  editIconText: { fontSize: 16 },
  formContainer: {},
  inputMulti: { height: 100, textAlignVertical: 'top' },
  saveBtn: { marginTop: 24 }
});
