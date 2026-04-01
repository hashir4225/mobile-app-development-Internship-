import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
});

export const LoginScreen = ({ navigation }: any) => {
  const { login, isLoading } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.inner}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            try {
              await login(values.email, values.password);
            } catch (e) {
              console.error(e);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
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

              <View style={styles.forgotPasswordContainer}>
                 <Button 
                   title="Forgot Password?" 
                   variant="ghost" 
                   onPress={() => navigation.navigate('ForgotPassword')}
                   style={styles.linkButton} 
                 />
              </View>

              <Button 
                title="Sign In" 
                onPress={handleSubmit as any} 
                isLoading={isLoading} 
                style={styles.submitButton}
              />
              
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <Button 
                  title="Sign Up" 
                  variant="ghost" 
                  onPress={() => navigation.navigate('SignUp')} 
                  style={{ paddingVertical: 0, paddingHorizontal: 8 }}
                />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { flex: 1, justifyContent: 'center', padding: 24 },
  header: { marginBottom: 40, alignItems: 'flex-start' },
  title: { fontSize: 32, fontWeight: 'bold', color: colors.text, marginBottom: 8 },
  subtitle: { fontSize: 16, color: colors.textSecondary },
  form: { width: '100%' },
  forgotPasswordContainer: { alignItems: 'flex-end', marginBottom: 24, paddingRight: 4 },
  linkButton: { paddingVertical: 8, paddingHorizontal: 0, shadowOpacity: 0 },
  submitButton: { marginTop: 16 },
  signupContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32, alignItems: 'center' },
  signupText: { color: colors.textSecondary, fontSize: 14 },
});
