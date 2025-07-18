import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, FlatList, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useMatchStore } from '@/stores/matchStore';
import { colors } from '@/constants/colors';
import { EventType, ShotType, ShotSpecification, Player } from '@/types';
import ScoreDisplay from '@/components/ScoreDisplay';
import EventButton from '@/components/EventButton';
import PlayerSelector from '@/components/PlayerSelector';
import ShotTypeSelector from '@/components/ShotTypeSelector';
import PlayerStatsCard from '@/components/PlayerStatsCard';
import { X, BarChart3, RotateCcw } from 'lucide-react-native';

export default function MatchTracking() {
  const router = useRouter();
  const { currentMatch, addEvent, undoLastEvent, completeMatch } = useMatchStore();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  
  // For player stats carousel
  const flatListRef = useRef<FlatList>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  
  // Handle navigation when no current match
  useEffect(() => {
    if (!currentMatch) {
      router.replace('/');
    }
  }, [currentMatch, router]);
  
  // Early return without navigation call
  if (!currentMatch) {
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
    router.push('/match-statistics');
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
      
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <ScoreDisplay score={currentMatch.score} teams={currentMatch.teams} />
        
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
          style={styles.statsCarousel}
        />
        
        <View style={styles.actionsContainer}>
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
            style={styles.actionButton}
            onPress={handleUndo}
          >
            <RotateCcw size={20} color="white" />
            <Text style={styles.actionButtonText}>Undo Last Point</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleViewStatistics}
          >
            <BarChart3 size={20} color="white" />
            <Text style={styles.actionButtonText}>View Statistics</Text>
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
                <X size={24} color={colors.textLight} />
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
    paddingBottom: 20,
  },
  statsCarousel: {
    flexGrow: 0,
  },
  actionsContainer: {
    padding: 16,
  },
  eventButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: colors.blueButton,
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginBottom: 8,
    marginTop: -8,
    marginRight: -8,
  },
});