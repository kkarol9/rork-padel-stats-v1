import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Player, Team } from '@/types';
import { colors } from '@/constants/colors';

type PlayerSelectorProps = {
  teams: [Team, Team];
  onSelectPlayer: (playerId: string) => void;
  onBack: () => void;
  title: string;
};

export default function PlayerSelector({ teams, onSelectPlayer, onBack, title }: PlayerSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.teamSection}>
        <Text style={styles.teamLabel}>Team 1</Text>
        <View style={styles.playerList}>
          {teams[0].players.map((player) => (
            <TouchableOpacity
              key={player.id}
              style={styles.playerButton}
              onPress={() => onSelectPlayer(player.id)}
            >
              <Text style={styles.playerName}>{player.name.split(' ')[0]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.teamSection}>
        <Text style={styles.teamLabel}>Team 2</Text>
        <View style={styles.playerList}>
          {teams[1].players.map((player) => (
            <TouchableOpacity
              key={player.id}
              style={styles.playerButton}
              onPress={() => onSelectPlayer(player.id)}
            >
              <Text style={styles.playerName}>{player.name.split(' ')[0]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  teamSection: {
    marginBottom: 24,
  },
  teamLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 12,
  },
  playerList: {
    gap: 12,
  },
  playerButton: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text,
  },
});