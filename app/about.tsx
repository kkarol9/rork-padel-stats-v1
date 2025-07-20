import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { ArrowLeft, Info, Shield, Mail, Heart } from 'lucide-react-native';

export default function About() {
  const router = useRouter();
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'About',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Info size={48} color={colors.primary} />
          <Text style={styles.title}>Padel Stats</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.description}>
            Track your padel tennis matches with detailed statistics. Record winners, errors, and shot types to improve your game.
          </Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featureList}>
              <Text style={styles.feature}>• Real-time match scoring</Text>
              <Text style={styles.feature}>• Detailed shot statistics</Text>
              <Text style={styles.feature}>• Match history tracking</Text>
              <Text style={styles.feature}>• Player performance analytics</Text>
              <Text style={styles.feature}>• Offline functionality</Text>
            </View>
          </View>
          
          <View style={styles.buttonSection}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => router.push('/privacy-policy')}
            >
              <Shield size={20} color={colors.primary} />
              <Text style={styles.buttonText}>Privacy Policy</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.button}>
              <Mail size={20} color={colors.primary} />
              <Text style={styles.buttonText}>Contact Support</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.footer}>
            <Heart size={16} color={colors.error} />
            <Text style={styles.footerText}>Made with love by Karol Krawczyński</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.card,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
  },
  version: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 4,
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  featureList: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
  },
  feature: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },
  buttonSection: {
    marginBottom: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    fontSize: 14,
    color: colors.textLight,
    marginLeft: 8,
  },
});