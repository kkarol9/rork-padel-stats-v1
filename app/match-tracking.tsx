import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, ScrollView, FlatList } from 'react-native';
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
import { X, Save, ChevronLeft, ChevronRight } from 'lucide-react-native';

export default function MatchTracking() {
  const router = useRouter();
  const { currentMatch, addEvent, completeMatch } = useMatchStore();
  
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
  
  const handleFinishMatch = () => {
    Alert.alert(
      'Finish Match',
      'Are you sure you want to finish this match?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Finish', 
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
  
  const scrollToNextPlayer = () => {
    if (currentPlayerIndex < allPlayers.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentPlayerIndex + 1, animated: true });
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    }
  };
  
  const scrollToPreviousPlayer = () => {
    if (currentPlayerIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentPlayerIndex - 1, animated: true });
      setCurrentPlayerIndex(currentPlayerIndex - 1);
    }
  };
  
  const renderPlayerStatsCard = ({ item }: { item: Player }) => (
    <PlayerStatsCard match={currentMatch} player={item} />
  );
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Match Tracking',
          headerRight: () => (
            <TouchableOpacity onPress={handleFinishMatch}>
              <Save size={24} color={colors.primary} />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScoreDisplay score={currentMatch.score} teams={currentMatch.teams} />
        
        <View style={styles.statsPreview}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Player Stats</Text>
            <View style={styles.playerNavigation}>
              <TouchableOpacity 
                style={[styles.navButton, currentPlayerIndex === 0 && styles.navButtonDisabled]}
                onPress={scrollToPreviousPlayer}
                disabled={currentPlayerIndex === 0}
              >
                <ChevronLeft size={20} color={currentPlayerIndex === 0 ? colors.textLight : colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, currentPlayerIndex === allPlayers.length - 1 && styles.navButtonDisabled]}
                onPress={scrollToNextPlayer}
                disabled={currentPlayerIndex === allPlayers.length - 1}
              >
                <ChevronRight size={20} color={currentPlayerIndex === allPlayers.length - 1 ? colors.textLight : colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <FlatList
            ref={flatListRef}
            data={allPlayers}
            renderItem={renderPlayerStatsCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / 316); // 300 width + 16 margin
              setCurrentPlayerIndex(index);
            }}
          />
        </View>
        
        <View style={styles.eventButtonsContainer}>
          <Text style={styles.eventButtonsTitle}>Record Event</Text>
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
  statsPreview: {
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
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  playerNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    padding: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  eventButtonsContainer: {
    padding: 16,
    flex: 1,
  },
  eventButtonsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  eventButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
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