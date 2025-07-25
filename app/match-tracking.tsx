import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useMatchStore } from '@/stores/matchStore';
import { colors } from '@/constants/colors';
import { EventType, ShotType, ShotSpecification, Player } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScoreDisplay from '@/components/ScoreDisplay';
import EventButton from '@/components/EventButton';
import PlayerSelector from '@/components/PlayerSelector';
import ShotTypeSelector from '@/components/ShotTypeSelector';
import PlayerStatsCard from '@/components/PlayerStatsCard';
import { X, BarChart3, RotateCcw, Flag } from 'lucide-react-native';

export default function MatchTracking() {
  const router = useRouter();
  const { currentMatch, addEvent, undoLastEvent, completeMatch } = useMatchStore();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  
  // For player stats carousel
  const flatListRef = useRef<FlatList>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  
  if (!currentMatch) {
    router.replace('/');
    return null;
  }
  
  // Get all players from both teams
  const allPlayers = [...currentMatch.teams[0].players, ...currentMatch.teams[1].players];
  
  const handleEventButtonPress = (eventType: EventType) => {
    setSelectedEventType(eventType);
    setModalVisible(true);
  };
  
  const handlePlayerSelect = (playerId: string) => {
    setSelectedPlayerId(playerId);
  };
  
  const handleShotComplete = (shotType: ShotType, shotSpecification: ShotSpecification) => {
    if (selectedEventType && selectedPlayerId) {
      addEvent(selectedPlayerId, selectedEventType, shotType, shotSpecification);
      setModalVisible(false);
      setSelectedEventType(null);
      setSelectedPlayerId(null);
    }
  };

  const handleUndo = () => {
    if (currentMatch.events.length === 0) {
      Alert.alert('No Events', 'There are no events to undo.');
      return;
    }

    Alert.alert(
      'Undo Last Point',
      'Are you sure you want to undo the last point?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Undo', 
          onPress: () => undoLastEvent(),
          style: 'destructive'
        },
      ]
    );
  };

  const handleViewStatistics = () => {
    router.push({
      pathname: '/match-statistics',
      params: { matchId: currentMatch.id }
    });
  };
  
  const handleEndMatch = () => {
    Alert.alert(
      'End Match',
      'Are you sure you want to end this match?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'End Match', 
          onPress: () => {
            completeMatch();
            router.replace({
              pathname: '/match-statistics',
              params: { matchId: currentMatch.id }
            });
          } 
        },
      ]
    );
  };
  
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEventType(null);
    setSelectedPlayerId(null);
  };
  
  const renderPlayerStatsCard = ({ item }: { item: Player }) => (
    <PlayerStatsCard match={currentMatch} player={item} />
  );
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Match Tracking',
        }} 
      />
      
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScoreDisplay score={currentMatch.score} teams={currentMatch.teams} />
        
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Match Stats</Text>
          
          <FlatList
            ref={flatListRef}
            data={allPlayers}
            renderItem={renderPlayerStatsCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / 316);
              setCurrentPlayerIndex(index);
            }}
          />
        </View>
        
        <View style={styles.eventButtonsContainer}>
          <View style={styles.eventButtons}>
            <EventButton 
              eventType="unforced_error" 
              onPress={() => handleEventButtonPress('unforced_error')} 
            />
            <EventButton 
              eventType="winner" 
              onPress={() => handleEventButtonPress('winner')} 
            />
            <EventButton 
              eventType="forced_error" 
              onPress={() => handleEventButtonPress('forced_error')} 
            />
          </View>

          <TouchableOpacity 
            style={styles.undoButton}
            onPress={handleUndo}
          >
            <RotateCcw size={20} color="white" />
            <Text style={styles.undoButtonText}>Undo Last Point</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.viewStatsButton}
            onPress={handleViewStatistics}
          >
            <BarChart3 size={20} color="white" />
            <Text style={styles.viewStatsButtonText}>View Statistics</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.endMatchButton}
            onPress={handleEndMatch}
          >
            <Flag size={20} color={colors.text} />
            <Text style={styles.endMatchButtonText}>End Match</Text>
          </TouchableOpacity>
        </View>
        
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <X size={24} color={colors.text} />
              </TouchableOpacity>
              
              {!selectedPlayerId ? (
                <PlayerSelector 
                  teams={currentMatch.teams}
                  onSelectPlayer={handlePlayerSelect}
                  onBack={handleCloseModal}
                  title={`Who made the ${selectedEventType?.replace('_', ' ')}?`}
                />
              ) : (
                <ShotTypeSelector 
                  onSelectComplete={handleShotComplete}
                  onBack={() => setSelectedPlayerId(null)}
                  title="What type of shot was it?"
                />
              )}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statsSection: {
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
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  eventButtonsContainer: {
    padding: 16,
    flex: 1,
  },
  eventButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  undoButton: {
    backgroundColor: '#5865F2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  undoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  viewStatsButton: {
    backgroundColor: '#5865F2',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  viewStatsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  endMatchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  endMatchButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 8,
  },
});