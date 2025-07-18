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
    padding: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  teamSection: {
    marginBottom: 32,
  },
  teamLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  playerList: {
    gap: 16,
  },
  playerButton: {
    backgroundColor: colors.lightGray,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
});