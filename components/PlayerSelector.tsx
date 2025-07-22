import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Player, Team } from '@/types';
import { colors } from '@/constants/colors';
import { ArrowLeft, Users } from 'lucide-react-native';

type PlayerSelectorProps = {
  teams: [Team, Team];
  onSelectPlayer: (playerId: string) => void;
  onBack: () => void;
  title: string;
};

export default function PlayerSelector({ teams, onSelectPlayer, onBack, title }: PlayerSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <ArrowLeft size={20} color={colors.primary} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.teamContainer}>
          <View style={styles.teamHeader}>
            <Users size={20} color={colors.primary} />
            <Text style={styles.teamLabel}>Team 1</Text>
          </View>
          <View style={styles.playerList}>
            {teams[0].players.map((player) => (
              <TouchableOpacity
                key={player.id}
                style={[styles.playerButton, styles.team1Button]}
                onPress={() => onSelectPlayer(player.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.playerName}>{player.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.teamContainer}>
          <View style={styles.teamHeader}>
            <Users size={20} color={colors.secondary} />
            <Text style={styles.teamLabel}>Team 2</Text>
          </View>
          <View style={styles.playerList}>
            {teams[1].players.map((player) => (
              <TouchableOpacity
                key={player.id}
                style={[styles.playerButton, styles.team2Button]}
                onPress={() => onSelectPlayer(player.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.playerName}>{player.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.background,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  teamContainer: {
    marginBottom: 24,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  teamLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  playerList: {
    gap: 12,
  },
  playerButton: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
  },
  team1Button: {
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary + '30',
  },
  team2Button: {
    backgroundColor: colors.secondary + '10',
    borderColor: colors.secondary + '30',
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
});