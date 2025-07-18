export const shotTypes = [
  { id: 'smash', label: 'Smash' },
  { id: 'volley', label: 'Volley' },
  { id: 'groundstroke', label: 'Groundstroke' },
  { id: 'lob', label: 'Lob' },
  { id: 'return', label: 'Return' },
];

export const shotSpecifications = {
  smash: [
    { id: 'vibora', label: 'Vibora' },
    { id: 'smash', label: 'Smash' },
  ],
  default: [
    { id: 'forehand', label: 'Forehand' },
    { id: 'backhand', label: 'Backhand' },
  ]
};

export const eventTypes = [
  { id: 'unforced_error', label: 'Unforced Error', color: '#e74c3c' },
  { id: 'winner', label: 'Winner', color: '#2ecc71' },
  { id: 'forced_error', label: 'Forced Error', color: '#f39c12' },
];