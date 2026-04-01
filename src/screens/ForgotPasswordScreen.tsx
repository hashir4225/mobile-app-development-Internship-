import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { colors } from '../theme/colors';

const ForgotSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});

export const ForgotPasswordScreen = ({ navigation }: any) => {
  const [success, setSuccess] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.inner}
      >
        <Button 
          title="← Back" 
          variant="ghost" 
          onPress={() => navigation.goBack()} 
          style={styles.backButton} 
        />
        
        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter the email associated with your account and we'll send an email with instructions to reset your password.
          </Text>
        </View>

        {success ? (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>Password reset link sent!</Text>
            <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
          </View>
        ) : (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={ForgotSchema}
            onSubmit={async (values, { setSubmitting }) => {
               // Mock reset
               setSubmitting(true);
               await new Promise(r => setTimeout(r, 1500));
               setSubmitting(false);
               setSuccess(true);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
              <View style={styles.form}>
                <Input
                  label="Email"
                  placeholder="Enter your registered email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Button 
                  title="Send Reset Link" 
                  onPress={handleSubmit as any} 
                  isLoading={isSubmitting} 
                  style={styles.submitButton}
                />
              </View>
            )}
          </Formik>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { flex: 1, justifyContent: 'center', padding: 24 },
  backButton: { alignSelf: 'flex-start', paddingHorizontal: 0, marginBottom: 20 },
  header: { marginBottom: 32, alignItems: 'flex-start' },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.text, marginBottom: 12 },
  subtitle: { fontSize: 16, color: colors.textSecondary, lineHeight: 24 },
  form: { width: '100%' },
  submitButton: { marginTop: 24 },
  successContainer: { alignItems: 'center', paddingVertical: 24 },
  successText: { fontSize: 18, color: colors.secondary, marginBottom: 24, fontWeight: 'bold' }
});
