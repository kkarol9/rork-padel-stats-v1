import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ShotType, ShotSpecification } from '@/types';
import { shotTypes, shotSpecifications } from '@/constants/shotTypes';
import { colors } from '@/constants/colors';
import { ArrowLeft, Target } from 'lucide-react-native';

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
          <View style={styles.sectionHeader}>
            <Target size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Select Shot Type</Text>
          </View>
          
          <View style={styles.shotTypeGrid}>
            {shotTypes.map((shot, index) => (
              <TouchableOpacity
                key={shot.id}
                style={[
                  styles.shotTypeButton,
                  { backgroundColor: getShotTypeColor(shot.id as ShotType) }
                ]}
                onPress={() => handleShotTypeSelect(shot.id as ShotType)}
                activeOpacity={0.8}
              >
                <Text style={styles.shotTypeName}>{shot.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
  
  // If shot type is selected, show the specification selection
  const specifications = selectedShotType === 'smash' 
    ? shotSpecifications.smash 
    : selectedShotType === 'other'
    ? shotSpecifications.other
    : shotSpecifications.default;
  
  const getSpecificationTitle = () => {
    if (selectedShotType === 'smash') {
      return 'What type of smash?';
    } else if (selectedShotType === 'other') {
      return 'What type of shot?';
    } else {
      return 'Forehand or Backhand?';
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setSelectedShotType(null)}
        >
          <ArrowLeft size={20} color={colors.primary} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>{getSpecificationTitle()}</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.selectedShotType}>
          <Text style={styles.selectedShotTypeLabel}>Selected:</Text>
          <View style={[
            styles.selectedShotTypeBadge,
            { backgroundColor: getShotTypeColor(selectedShotType) }
          ]}>
            <Text style={styles.selectedShotTypeText}>
              {shotTypes.find(s => s.id === selectedShotType)?.label}
            </Text>
          </View>
        </View>
        
        <View style={styles.specificationGrid}>
          {specifications.map((spec) => (
            <TouchableOpacity
              key={spec.id}
              style={styles.specificationButton}
              onPress={() => handleSpecificationSelect(spec.id as ShotSpecification)}
              activeOpacity={0.7}
            >
              <Text style={styles.specificationName}>{spec.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function getShotTypeColor(shotType: ShotType): string {
  const colors_map = {
    smash: '#e74c3c',
    volley: '#3498db',
    groundstroke: '#2ecc71',
    lob: '#f39c12',
    return: '#9b59b6',
    bajada: '#1abc9c',
    other: '#95a5a6',
  };
  return colors_map[shotType] || colors.primary;
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 8,
  },
  shotTypeGrid: {
    gap: 12,
  },
  shotTypeButton: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  shotTypeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  selectedShotType: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: colors.background,
    borderRadius: 12,
  },
  selectedShotTypeLabel: {
    fontSize: 16,
    color: colors.textLight,
    marginRight: 12,
  },
  selectedShotTypeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  selectedShotTypeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  specificationGrid: {
    gap: 12,
  },
  specificationButton: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 2,
    borderColor: colors.primary + '20',
  },
  specificationName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
});