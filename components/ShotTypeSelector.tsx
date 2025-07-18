import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShotType, ShotSpecification } from '@/types';
import { shotTypes, shotSpecifications } from '@/constants/shotTypes';
import { colors } from '@/constants/colors';
import { ArrowLeft } from 'lucide-react-native';

type ShotTypeSelectorProps = {
  onSelectComplete: (shotType: ShotType, shotSpecification: ShotSpecification) => void;
  onBack: () => void;
  title: string;
};

export default function ShotTypeSelector({ onSelectComplete, onBack, title }: ShotTypeSelectorProps) {
  const [selectedShotType, setSelectedShotType] = useState<ShotType | null>(null);
  
  const handleShotTypeSelect = (shotType: ShotType) => {
    setSelectedShotType(shotType);
  };
  
  const handleSpecificationSelect = (specification: ShotSpecification) => {
    if (selectedShotType) {
      onSelectComplete(selectedShotType, specification);
    }
  };
  
  // If no shot type is selected yet, show the shot type selection
  if (!selectedShotType) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.shotTypeList}>
          {shotTypes.map((shot) => (
            <TouchableOpacity
              key={shot.id}
              style={styles.shotTypeButton}
              onPress={() => handleShotTypeSelect(shot.id as ShotType)}
            >
              <Text style={styles.shotTypeName}>{shot.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <ArrowLeft size={16} color={colors.primary} />
          <Text style={styles.backButtonText}>Back to player selection</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // If shot type is selected, show the specification selection
  const specifications = selectedShotType === 'smash' 
    ? shotSpecifications.smash 
    : shotSpecifications.default;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedShotType === 'smash' ? 'What type of smash?' : 'Forehand or Backhand?'}
      </Text>
      
      <View style={styles.shotTypeList}>
        {specifications.map((spec) => (
          <TouchableOpacity
            key={spec.id}
            style={styles.shotTypeButton}
            onPress={() => handleSpecificationSelect(spec.id as ShotSpecification)}
          >
            <Text style={styles.shotTypeName}>{spec.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => setSelectedShotType(null)}
      >
        <ArrowLeft size={16} color={colors.primary} />
        <Text style={styles.backButtonText}>Back to shot types</Text>
      </TouchableOpacity>
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
  shotTypeList: {
    gap: 16,
    marginBottom: 32,
  },
  shotTypeButton: {
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
  shotTypeName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});