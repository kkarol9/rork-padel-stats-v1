export const shotTypes = [
  { id: 'smash', label: 'Smash' },
  { id: 'volley', label: 'Volley' },
  { id: 'groundstroke', label: 'Groundstroke' },
  { id: 'lob', label: 'Lob' },
  { id: 'return', label: 'Return' },
  { id: 'bajada', label: 'Bajada' },
  { id: 'other', label: 'Other' },
];

export const shotSpecifications = {
  smash: [
    { id: 'vibora', label: 'Vibora' },
    { id: 'bandeja', label: 'Bandeja' },
    { id: 'rulo', label: 'Rulo' },
    { id: 'standard', label: 'Standard' },
    { id: 'other', label: 'Other' },
  ],
  volley: [
    { id: 'forehand', label: 'Forehand' },
    { id: 'backhand', label: 'Backhand' },
  ],
  groundstroke: [
    { id: 'forehand', label: 'Forehand' },
    { id: 'backhand', label: 'Backhand' },
  ],
  lob: [
    { id: 'forehand', label: 'Forehand' },
    { id: 'backhand', label: 'Backhand' },
  ],
  bajada: [
    { id: 'forehand', label: 'Forehand' },
    { id: 'backhand', label: 'Backhand' },
  ],
  return: [
    { id: 'forehand', label: 'Forehand' },
    { id: 'backhand', label: 'Backhand' },
  ],
  other: [
    { id: 'forehand', label: 'Forehand' },
    { id: 'backhand', label: 'Backhand' },
    { id: 'smash', label: 'Smash' },
  ],
  default: [
    { id: 'forehand', label: 'Forehand' },
    { id: 'backhand', label: 'Backhand' },
  ]
} as const;

export const eventTypes = [
  { id: 'unforced_error', label: 'Unforced Error', color: '#e74c3c' },
  { id: 'winner', label: 'Winner', color: '#2ecc71' },
  { id: 'forced_error', label: 'Forced Error', color: '#f39c12' },
];