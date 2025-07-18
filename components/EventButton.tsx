import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { EventType } from '@/types';
import { colors } from '@/constants/colors';

type EventButtonProps = {
  eventType: EventType;
  onPress: () => void;
};

export default function EventButton({ eventType, onPress }: EventButtonProps) {
  const getButtonStyle = () => {
    switch (eventType) {
      case 'unforced_error':
        return { backgroundColor: colors.unforcedError };
      case 'winner':
        return { backgroundColor: colors.winner };
      case 'forced_error':
        return { backgroundColor: colors.forcedError };
      default:
        return { backgroundColor: colors.primary };
    }
  };

  const getButtonText = () => {
    switch (eventType) {
      case 'unforced_error':
        return 'Unforced\nError';
      case 'winner':
        return 'Winner';
      case 'forced_error':
        return 'Forced\nError';
      default:
        return eventType;
    }
  };
  
  return (
    <TouchableOpacity 
      style={[styles.button, getButtonStyle()]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{getButtonText()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 70,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
  },
});