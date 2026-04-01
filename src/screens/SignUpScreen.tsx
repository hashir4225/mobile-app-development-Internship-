import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
  confirmPassword: Yup.string()
     .oneOf([Yup.ref('password')], 'Passwords must match')
     .required('Required'),
});

export const SignUpScreen = ({ navigation }: any) => {
  const { signup, isLoading } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.inner}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>
          </View>

          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={SignUpSchema}
            onSubmit={async (values) => {
              try {
                await signup(values.email, values.password, values.name);
              } catch (e) {
                console.error(e);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.form}>
                <Input
                  label="Full Name"
                  placeholder="Enter your name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  error={errors.name}
                  touched={touched.name}
                  autoCapitalize="words"
                />

                <Input
                  label="Email"
                  placeholder="Enter your email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Input
                  label="Password"
                  placeholder="Enter your password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={errors.password}
                  touched={touched.password}
                  secureTextEntry
                />

                <Input
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  secureTextEntry
                />

                <Button 
                  title="Sign Up" 
                  onPress={handleSubmit as any} 
                  isLoading={isLoading} 
                  style={styles.submitButton}
                />
                
                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Already have an account?</Text>
                  <Button 
                    title="Sign In" 
                    variant="ghost" 
                    onPress={() => navigation.navigate('Login')} 
                    style={{ paddingVertical: 0, paddingHorizontal: 8 }}
                  />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingBottom: 60 },
  header: { marginBottom: 40, alignItems: 'flex-start' },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  subtitle: { fontSize: 16, color: colors.textSecondary },
  form: { width: '100%' },
  submitButton: { marginTop: 32 },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32, alignItems: 'center' },
  loginText: { color: colors.textSecondary, fontSize: 14 },
});
