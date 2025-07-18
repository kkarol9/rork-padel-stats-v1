import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Match, Player } from '@/types';
import { colors } from '@/constants/colors';

type PlayerStatsCardProps = {
  match: Match;
  player: Player;
};

export default function PlayerStatsCard({ match, player }: PlayerStatsCardProps) {
  // Filter events for this player
  const playerEvents = match.events.filter(event => event.playerId === player.id);
  
  // Group events by type
  const winnerEvents = playerEvents.filter(event => event.eventType === 'winner');
  const unforcedErrorEvents = playerEvents.filter(event => event.eventType === 'unforced_error');
  const forcedErrorEvents = playerEvents.filter(event => event.eventType === 'forced_error');
  
  // Count event types
  const winners = winnerEvents.length;
  const unforcedErrors = unforcedErrorEvents.length;
  const forcedErrors = forcedErrorEvents.length;
  
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Match Stats</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{winners}</Text>
          <Text style={styles.statLabel}>Winners</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{unforcedErrors}</Text>
          <Text style={styles.statLabel}>Unforced{'\n'}Errors</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{forcedErrors}</Text>
          <Text style={styles.statLabel}>Forced{'\n'}Errors</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    width: 300,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 90,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
  },
});