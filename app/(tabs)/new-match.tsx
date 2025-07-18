import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useMatchStore } from '@/stores/matchStore';
import { colors } from '@/constants/colors';
import { Player, Team } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserRound, Users, MapPin, Trophy, AlertCircle } from 'lucide-react-native';

export default function NewMatch() {
  const router = useRouter();
  const { createMatch, currentMatch } = useMatchStore();
  
  const [team1Player1, setTeam1Player1] = useState('');
  const [team1Player2, setTeam1Player2] = useState('');
  const [team2Player1, setTeam2Player1] = useState('');
  const [team2Player2, setTeam2Player2] = useState('');
  const [location, setLocation] = useState('');
  const [round, setRound] = useState('');
  
  // Check if there's an unfinished match
  const hasUnfinishedMatch = currentMatch && !currentMatch.isCompleted;
  
  const handleStartMatch = () => {
    if (hasUnfinishedMatch) {
      Alert.alert(
        'Unfinished Match',
        'You have an unfinished match. Please complete it first before starting a new one.',
        [
          { text: 'OK' },
          { 
            text: 'Go to Match', 
            onPress: () => router.push('/match-tracking')
          }
        ]
      );
      return;
    }
    
    // Validate all players are entered
    if (!team1Player1 || !team1Player2 || !team2Player1 || !team2Player2) {
      Alert.alert('Missing Information', 'Please enter names for all players');
      return;
    }
    
    // Check for duplicate names
    const names = [team1Player1, team1Player2, team2Player1, team2Player2];
    const uniqueNames = new Set(names);
    if (uniqueNames.size !== 4) {
      Alert.alert('Duplicate Names', 'Please use unique names for all players');
      return;
    }
    
    // Create player objects
    const players: Player[] = [
      { id: 'p1', name: team1Player1 },
      { id: 'p2', name: team1Player2 },
      { id: 'p3', name: team2Player1 },
      { id: 'p4', name: team2Player2 },
    ];
    
    // Create team objects
    const teams: [Team, Team] = [
      { id: 't1', players: [players[0], players[1]] },
      { id: 't2', players: [players[2], players[3]] },
    ];
    
    // Create the match
    createMatch(teams, location || 'Unknown Location', round || 'Friendly Match');
    
    // Navigate to match tracking
    router.push('/match-tracking');
  };
  
  if (hasUnfinishedMatch) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.unfinishedMatchContainer}>
          <AlertCircle size={64} color={colors.warning} />
          <Text style={styles.unfinishedTitle}>Unfinished Match</Text>
          <Text style={styles.unfinishedMessage}>
            You have an unfinished match in progress. Please complete it before starting a new one.
          </Text>
          
          <View style={styles.matchInfo}>
            <Text style={styles.matchTeams}>
              {currentMatch.teams[0].players.map(p => p.name.split(' ')[0]).join('/')} vs {currentMatch.teams[1].players.map(p => p.name.split(' ')[0]).join('/')}
            </Text>
            <Text style={styles.matchDetails}>
              {currentMatch.location} • {currentMatch.round}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => router.push('/match-tracking')}
          >
            <Text style={styles.continueButtonText}>Continue Match</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>New Match</Text>
          <Text style={styles.subtitle}>Enter match details to start tracking</Text>
        </View>
        
        <View style={styles.matchDetailsSection}>
          <Text style={styles.sectionTitle}>Match Details</Text>
          
          <View style={styles.inputContainer}>
            <MapPin size={20} color={colors.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Location (e.g. Club Name)"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor={colors.textLight}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Trophy size={20} color={colors.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Round (e.g. Finals, Semifinals)"
              value={round}
              onChangeText={setRound}
              placeholderTextColor={colors.textLight}
            />
          </View>
        </View>
        
        <View style={styles.teamSection}>
          <View style={styles.teamHeader}>
            <Users size={20} color={colors.primary} />
            <Text style={styles.teamTitle}>Team 1</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <UserRound size={20} color={colors.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Player 1 Name"
              value={team1Player1}
              onChangeText={setTeam1Player1}
              placeholderTextColor={colors.textLight}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <UserRound size={20} color={colors.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Player 2 Name"
              value={team1Player2}
              onChangeText={setTeam1Player2}
              placeholderTextColor={colors.textLight}
            />
          </View>
        </View>
        
        <View style={styles.teamSection}>
          <View style={styles.teamHeader}>
            <Users size={20} color={colors.secondary} />
            <Text style={styles.teamTitle}>Team 2</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <UserRound size={20} color={colors.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Player 1 Name"
              value={team2Player1}
              onChangeText={setTeam2Player1}
              placeholderTextColor={colors.textLight}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <UserRound size={20} color={colors.textLight} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Player 2 Name"
              value={team2Player2}
              onChangeText={setTeam2Player2}
              placeholderTextColor={colors.textLight}
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.startButton}
          onPress={handleStartMatch}
        >
          <Text style={styles.startButtonText}>Start Match</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    marginTop: 4,
  },
  unfinishedMatchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  unfinishedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  unfinishedMessage: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  matchInfo: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  matchTeams: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  matchDetails: {
    fontSize: 14,
    color: colors.textLight,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    paddingHorizontal: 32,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchDetailsSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  teamSection: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    color: colors.text,
    fontSize: 16,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});