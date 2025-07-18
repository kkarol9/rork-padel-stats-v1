import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Score, Team } from '@/types';
import { colors } from '@/constants/colors';

type ScoreDisplayProps = {
  score: Score;
  teams: [Team, Team];
};

export default function ScoreDisplay({ score, teams }: ScoreDisplayProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.teamsHeader}>Teams</Text>
        <Text style={styles.columnHeader}>Sets</Text>
        <Text style={styles.columnHeader}>Games</Text>
        <Text style={styles.columnHeader}>Points</Text>
      </View>
      
      <View style={styles.scoreRow}>
        <Text style={styles.teamName}>
          {teams[0].players.map(p => p.name.split(' ')[0]).join(' & ')}
        </Text>
        <Text style={styles.scoreValue}>{score.sets[0]}</Text>
        <Text style={styles.scoreValue}>{score.games[0]}</Text>
        <Text style={styles.scoreValue}>
          {score.tiebreak ? score.tiebreak.points[0] : score.points[0]}
        </Text>
      </View>
      
      <View style={styles.scoreRow}>
        <Text style={styles.teamName}>
          {teams[1].players.map(p => p.name.split(' ')[0]).join(' & ')}
        </Text>
        <Text style={styles.scoreValue}>{score.sets[1]}</Text>
        <Text style={styles.scoreValue}>{score.games[1]}</Text>
        <Text style={styles.scoreValue}>
          {score.tiebreak ? score.tiebreak.points[1] : score.points[1]}
        </Text>
      </View>
      
      {score.tiebreak && (
        <View style={styles.tiebreakIndicator}>
          <Text style={styles.tiebreakText}>
            {score.tiebreak.isFinalTiebreak ? 'Final Tiebreak (to 10)' : 'Tiebreak (to 7)'}
          </Text>
        </View>
      )}
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
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  teamsHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.textLight,
  },
  columnHeader: {
    width: 60,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: colors.textLight,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  teamName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  scoreValue: {
    width: 60,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  tiebreakIndicator: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    alignItems: 'center',
  },
  tiebreakText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});