// ============================================
// SPACE PSYCHOLOGY™ DATA & SCORING
// VDS × VERA
// ============================================

export type NervousSystemType = 'Calm Seeker' | 'Energy Craver' | 'Balance Finder'

export type AnswerType = 'single' | 'scale' | 'multi' | 'rank'

export interface Question {
  id: string
  text: string
  subtext?: string
  type: AnswerType
  options: {
    value: string
    label: string
    scores: {
      calmSeeker: number
      energyCraver: number
      balanceFinder: number
    }
  }[]
}

export interface Assessment {
  id: number
  name: string
  description: string
  icon: string
  questions: Question[]
}

export interface UserAnswers {
  [questionId: string]: string | string[]
}

export interface Scores {
  calmSeeker: number
  energyCraver: number
  balanceFinder: number
}

// ============================================
// ASSESSMENT 1: NERVOUS SYSTEM MAPPING
// ============================================

const nervousSystemQuestions: Question[] = [
  {
    id: 'ns-1',
    text: 'When you enter a new space, what do you notice first?',
    type: 'single',
    options: [
      { value: 'light', label: 'The light quality', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 1 } },
      { value: 'sounds', label: 'The sounds and acoustics', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'colors', label: 'The colors and textures', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 1 } },
      { value: 'temperature', label: 'The temperature and air', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
      { value: 'energy', label: 'The overall energy', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
    ],
  },
  {
    id: 'ns-2',
    text: 'How do you feel in rooms with high ceilings?',
    subtext: '1 = Anxious/Exposed, 5 = Expansive/Free',
    type: 'scale',
    options: [
      { value: '1', label: '1', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: '2', label: '2', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
      { value: '3', label: '3', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: '4', label: '4', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
      { value: '5', label: '5', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
    ],
  },
  {
    id: 'ns-3',
    text: 'Bright, direct sunlight makes you feel...',
    type: 'single',
    options: [
      { value: 'energized', label: 'Energized and alive', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'comfortable', label: 'Comfortable and warm', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: 'overwhelmed', label: 'Overwhelmed or exposed', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'depends', label: 'Depends on my mood', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
    ],
  },
  {
    id: 'ns-4',
    text: 'When stressed, what environment helps you recover?',
    type: 'single',
    options: [
      { value: 'dark-quiet', label: 'Dark, quiet, enclosed space', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'nature', label: 'Outside in nature', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'busy', label: 'A busy café or public space', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'movement', label: 'Somewhere I can move around', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'cozy', label: 'A cozy, softly lit room', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
    ],
  },
  {
    id: 'ns-5',
    text: 'How do you respond to open floor plans?',
    subtext: '1 = Overwhelmed, 5 = Energized',
    type: 'scale',
    options: [
      { value: '1', label: '1', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: '2', label: '2', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
      { value: '3', label: '3', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: '4', label: '4', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
      { value: '5', label: '5', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
    ],
  },
  {
    id: 'ns-6',
    text: 'Background noise (music, TV, chatter) while working...',
    type: 'single',
    options: [
      { value: 'helps', label: 'Helps me focus', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'distracts', label: 'Distracts me completely', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'depends', label: 'Depends on the type', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: 'dont-notice', label: "I don't really notice it", scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
    ],
  },
  {
    id: 'ns-7',
    text: 'How sensitive are you to flickering or harsh lighting?',
    subtext: '1 = Not at all, 5 = Extremely',
    type: 'scale',
    options: [
      { value: '1', label: '1', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
      { value: '2', label: '2', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: '3', label: '3', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
      { value: '4', label: '4', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: '5', label: '5', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
    ],
  },
  {
    id: 'ns-8',
    text: 'Clutter in your environment makes you feel...',
    type: 'single',
    options: [
      { value: 'anxious', label: 'Anxious and overwhelmed', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'creative', label: 'Creative and inspired', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'unbothered', label: 'Mostly unbothered', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'depends', label: 'Depends on the type of clutter', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
    ],
  },
  {
    id: 'ns-9',
    text: 'How do you feel in all-white, minimal spaces?',
    subtext: '1 = Cold/Sterile, 5 = Calm/Peaceful',
    type: 'scale',
    options: [
      { value: '1', label: '1', scores: { calmSeeker: 1, energyCraver: 3, balanceFinder: 1 } },
      { value: '2', label: '2', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: '3', label: '3', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 3 } },
      { value: '4', label: '4', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
      { value: '5', label: '5', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
    ],
  },
  {
    id: 'ns-10',
    text: 'When choosing a restaurant, you prefer...',
    type: 'single',
    options: [
      { value: 'quiet', label: 'Quiet, intimate atmosphere', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'buzzing', label: 'Buzzing, energetic vibe', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'outdoor', label: 'Outdoor seating', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'depends', label: 'Depends on who I\'m with', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
    ],
  },
  {
    id: 'ns-11',
    text: 'How quickly do you notice temperature changes in a room?',
    subtext: '1 = Rarely notice, 5 = Immediately',
    type: 'scale',
    options: [
      { value: '1', label: '1', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
      { value: '2', label: '2', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: '3', label: '3', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
      { value: '4', label: '4', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
      { value: '5', label: '5', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
    ],
  },
  {
    id: 'ns-12',
    text: 'Your ideal space feels like...',
    type: 'single',
    options: [
      { value: 'cocoon', label: 'A protective cocoon', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'stage', label: 'An inspiring stage', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'sanctuary', label: 'A flexible sanctuary', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: 'gallery', label: 'A living gallery', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'nest', label: 'A warm nest', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
    ],
  },
]

// ============================================
// ASSESSMENT 2: LIFESTYLE DECODING
// ============================================

const lifestyleQuestions: Question[] = [
  {
    id: 'ls-1',
    text: "What's the first thing you do when you wake up?",
    type: 'single',
    options: [
      { value: 'phone', label: 'Check my phone', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
      { value: 'quiet', label: 'Enjoy quiet time before anything', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'move', label: 'Get up and move immediately', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'coffee', label: 'Head to the kitchen for coffee/tea', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: 'linger', label: 'Linger in bed as long as possible', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
    ],
  },
  {
    id: 'ls-2',
    text: 'How many hours do you spend at home on a typical day?',
    type: 'single',
    options: [
      { value: 'less-4', label: 'Less than 4 hours (awake)', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: '4-8', label: '4-8 hours', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: '8-12', label: '8-12 hours', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
      { value: '12-16', label: '12-16 hours', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
      { value: 'most', label: 'Most of my day', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
    ],
  },
  {
    id: 'ls-3',
    text: 'Do you work from home?',
    type: 'single',
    options: [
      { value: 'full', label: 'Yes, full-time', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
      { value: 'hybrid', label: 'Yes, hybrid/part-time', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 3 } },
      { value: 'no', label: 'No, I work elsewhere', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'varies', label: 'It varies a lot', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 3 } },
    ],
  },
  {
    id: 'ls-4',
    text: 'How often do you host guests at home?',
    type: 'single',
    options: [
      { value: 'weekly', label: 'Weekly or more', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'monthly', label: 'A few times a month', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 3 } },
      { value: 'occasionally', label: 'Occasionally', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
      { value: 'rarely', label: 'Rarely', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'never', label: 'Almost never', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
    ],
  },
  {
    id: 'ls-5',
    text: 'Your evening wind-down ritual is...',
    type: 'single',
    options: [
      { value: 'screens', label: 'Screens until I sleep', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
      { value: 'reading', label: 'Reading or quiet activities', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'social', label: 'Social time with family/partner', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'bath', label: 'Bath, skincare, self-care', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
      { value: 'none', label: "I don't really have one", scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
    ],
  },
  {
    id: 'ls-6',
    text: 'Where do you eat most of your meals at home?',
    type: 'single',
    options: [
      { value: 'dining', label: 'Dining table', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
      { value: 'counter', label: 'Kitchen counter/island', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'couch', label: 'Couch/living area', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'desk', label: 'At my desk', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'varies', label: 'It varies', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
    ],
  },
  {
    id: 'ls-7',
    text: 'How much alone time do you need daily?',
    subtext: '1 = Minimal, 5 = Extensive',
    type: 'scale',
    options: [
      { value: '1', label: '1', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: '2', label: '2', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
      { value: '3', label: '3', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: '4', label: '4', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
      { value: '5', label: '5', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
    ],
  },
  {
    id: 'ls-8',
    text: 'Your home should primarily support...',
    type: 'single',
    options: [
      { value: 'rest', label: 'Rest and recovery', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'creativity', label: 'Creativity and projects', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'connection', label: 'Connection with others', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
      { value: 'productivity', label: 'Productivity and focus', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'balance', label: 'A balance of everything', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
    ],
  },
  {
    id: 'ls-9',
    text: 'The most important room in your home is...',
    type: 'single',
    options: [
      { value: 'bedroom', label: 'Bedroom', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'kitchen', label: 'Kitchen', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'living', label: 'Living room', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'office', label: 'Home office/workspace', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'bathroom', label: 'Bathroom/spa area', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
      { value: 'outdoor', label: 'Outdoor space', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
    ],
  },
  {
    id: 'ls-10',
    text: 'When you have free time at home, you typically...',
    type: 'single',
    options: [
      { value: 'rest', label: 'Rest and recharge alone', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'projects', label: 'Work on projects or hobbies', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'socialize', label: 'Invite people over', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'varies', label: 'It depends on my energy', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
    ],
  },
]

// ============================================
// ASSESSMENT 3: SENSORY PROFILE
// ============================================

const sensoryQuestions: Question[] = [
  {
    id: 'sp-1',
    text: 'Which textures feel most comforting to you?',
    subtext: 'Select all that apply',
    type: 'multi',
    options: [
      { value: 'velvet', label: 'Velvet & soft fabrics', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 1 } },
      { value: 'linen', label: 'Linen & natural fibers', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 2 } },
      { value: 'leather', label: 'Leather & smooth surfaces', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 1 } },
      { value: 'wood', label: 'Wood grain & organic', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 2 } },
      { value: 'metal', label: 'Metal & cool surfaces', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 1 } },
      { value: 'stone', label: 'Stone & marble', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 1 } },
      { value: 'wool', label: 'Wool & chunky knits', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 1 } },
      { value: 'silk', label: 'Silk & satin', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 1 } },
    ],
  },
  {
    id: 'sp-2',
    text: 'Your ideal room temperature is...',
    type: 'single',
    options: [
      { value: 'cool', label: 'Cool (65-68°F / 18-20°C)', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 1 } },
      { value: 'moderate', label: 'Moderate (68-72°F / 20-22°C)', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: 'warm', label: 'Warm (72-76°F / 22-24°C)', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 1 } },
      { value: 'very-warm', label: 'Very warm (76°F+ / 24°C+)', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 1 } },
      { value: 'varies', label: 'It varies by room/activity', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
    ],
  },
  {
    id: 'sp-3',
    text: 'How do you respond to strong scents (candles, diffusers)?',
    subtext: '1 = Love them, 5 = Avoid them',
    type: 'scale',
    options: [
      { value: '1', label: '1', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
      { value: '2', label: '2', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: '3', label: '3', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: '4', label: '4', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
      { value: '5', label: '5', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
    ],
  },
  {
    id: 'sp-4',
    text: 'Visual complexity (patterns, objects, art) makes you feel...',
    subtext: '1 = Overwhelmed, 5 = Stimulated',
    type: 'scale',
    options: [
      { value: '1', label: '1', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: '2', label: '2', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 2 } },
      { value: '3', label: '3', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: '4', label: '4', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
      { value: '5', label: '5', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
    ],
  },
  {
    id: 'sp-5',
    text: 'Which sounds help you relax?',
    subtext: 'Select all that apply',
    type: 'multi',
    options: [
      { value: 'silence', label: 'Complete silence', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'nature', label: 'Nature sounds (rain, birds)', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
      { value: 'music', label: 'Soft background music', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'white-noise', label: 'White noise / fan', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
      { value: 'chatter', label: 'Distant conversation/bustle', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'water', label: 'Water features', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
    ],
  },
  {
    id: 'sp-6',
    text: 'How important is natural light to your mood?',
    subtext: '1 = Not important, 5 = Essential',
    type: 'scale',
    options: [
      { value: '1', label: '1', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 1 } },
      { value: '2', label: '2', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
      { value: '3', label: '3', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: '4', label: '4', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: '5', label: '5', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
    ],
  },
  {
    id: 'sp-7',
    text: 'You prefer furniture that feels...',
    type: 'single',
    options: [
      { value: 'sink-in', label: 'Soft and sink-in comfortable', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'structured', label: 'Structured and supportive', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'minimal', label: 'Minimal and lightweight', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'mix', label: 'A mix depending on the room', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
    ],
  },
  {
    id: 'sp-8',
    text: 'How do you feel about mirrors in a space?',
    type: 'single',
    options: [
      { value: 'love', label: 'Love them—opens up the space', scores: { calmSeeker: 0, energyCraver: 3, balanceFinder: 1 } },
      { value: 'fine', label: 'Fine in moderation', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: 'avoid', label: 'Prefer to avoid them', scores: { calmSeeker: 3, energyCraver: 0, balanceFinder: 1 } },
      { value: 'functional', label: 'Only where functional', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
    ],
  },
  {
    id: 'sp-9',
    text: 'Plants and greenery in your space...',
    type: 'single',
    options: [
      { value: 'essential', label: 'Are essential to me', scores: { calmSeeker: 1, energyCraver: 2, balanceFinder: 2 } },
      { value: 'nice', label: 'Are nice but not necessary', scores: { calmSeeker: 1, energyCraver: 1, balanceFinder: 3 } },
      { value: 'maintenance', label: 'Feel like too much maintenance', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 1 } },
      { value: 'fake', label: 'I prefer faux plants', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
    ],
  },
  {
    id: 'sp-10',
    text: 'Your sensory sanctuary would include...',
    subtext: 'Select all that apply',
    type: 'multi',
    options: [
      { value: 'soft-lighting', label: 'Soft, dimmable lighting', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 1 } },
      { value: 'plush', label: 'Plush textiles everywhere', scores: { calmSeeker: 2, energyCraver: 0, balanceFinder: 1 } },
      { value: 'views', label: 'Big windows with views', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
      { value: 'art', label: 'Statement art pieces', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 1 } },
      { value: 'sound-system', label: 'Quality sound system', scores: { calmSeeker: 0, energyCraver: 2, balanceFinder: 2 } },
      { value: 'fireplace', label: 'Fireplace or fire element', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
      { value: 'water', label: 'Water feature', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 2 } },
      { value: 'minimal', label: 'Minimal, clean surfaces', scores: { calmSeeker: 2, energyCraver: 1, balanceFinder: 1 } },
    ],
  },
]

// ============================================
// ASSESSMENTS EXPORT
// ============================================

export const assessments: Assessment[] = [
  {
    id: 1,
    name: 'Nervous System Mapping',
    description: 'Understand how your biology responds to environmental input.',
    icon: '◉',
    questions: nervousSystemQuestions,
  },
  {
    id: 2,
    name: 'Lifestyle Decoding',
    description: 'Map how you actually move through life.',
    icon: '◈',
    questions: lifestyleQuestions,
  },
  {
    id: 3,
    name: 'Sensory Profile',
    description: 'Discover your sensory thresholds and tolerances.',
    icon: '◇',
    questions: sensoryQuestions,
  },
]

// ============================================
// SCORING FUNCTIONS
// ============================================

export function calculateScores(answers: UserAnswers): Scores {
  const scores: Scores = {
    calmSeeker: 0,
    energyCraver: 0,
    balanceFinder: 0,
  }

  const allQuestions = [
    ...nervousSystemQuestions,
    ...lifestyleQuestions,
    ...sensoryQuestions,
  ]

  for (const question of allQuestions) {
    const answer = answers[question.id]
    if (!answer) continue

    if (question.type === 'multi' && Array.isArray(answer)) {
      // Multi-select: sum scores for each selected option
      for (const val of answer) {
        const option = question.options.find(o => o.value === val)
        if (option) {
          scores.calmSeeker += option.scores.calmSeeker
          scores.energyCraver += option.scores.energyCraver
          scores.balanceFinder += option.scores.balanceFinder
        }
      }
    } else {
      // Single select or scale
      const option = question.options.find(o => o.value === answer)
      if (option) {
        scores.calmSeeker += option.scores.calmSeeker
        scores.energyCraver += option.scores.energyCraver
        scores.balanceFinder += option.scores.balanceFinder
      }
    }
  }

  return scores
}

export function determineNervousSystemType(scores: Scores): NervousSystemType {
  const { calmSeeker, energyCraver, balanceFinder } = scores
  const max = Math.max(calmSeeker, energyCraver, balanceFinder)

  // If balance finder is dominant or scores are close
  if (balanceFinder >= max * 0.9 && Math.abs(calmSeeker - energyCraver) < max * 0.3) {
    return 'Balance Finder'
  }

  if (max === calmSeeker) return 'Calm Seeker'
  if (max === energyCraver) return 'Energy Craver'
  return 'Balance Finder'
}

// ============================================
// TYPE DESCRIPTIONS
// ============================================

export const systemTypeDescriptions: Record<NervousSystemType, string> = {
  'Calm Seeker': `Your nervous system craves regulation, softness, and containment. You thrive in spaces that feel like a protective cocoon—low stimulation, warm tones, soft textures, and controlled light. Overly open, bright, or busy environments can feel depleting rather than energizing. Your ideal home is a sanctuary that actively supports your nervous system's need for rest and recovery.`,
  
  'Energy Craver': `Your nervous system is energized by stimulation, contrast, and openness. You thrive in spaces with dynamic light, bold elements, visual interest, and room to move. Environments that are too muted or enclosed can actually feel draining to you. Your ideal home is an inspiring stage that matches your natural vitality and creative energy.`,
  
  'Balance Finder': `Your nervous system seeks equilibrium—spaces that can flex between calm retreat and energizing engagement. You need zones for both restoration and activation. A home that's entirely one mode (all calm or all energizing) won't serve you well. Your ideal space has distinct areas that support different states, allowing you to move between rest and activity as needed.`,
}

// ============================================
// DESIGN TRANSLATIONS
// ============================================

export const designTranslations: Record<NervousSystemType, {
  color: string
  lighting: string
  textures: string
  acoustics: string
  spatial: string
}> = {
  'Calm Seeker': {
    color: 'Warm, muted tones. Soft creams, warm grays, dusty blues, sage greens. Avoid high contrast and stark whites.',
    lighting: 'Soft, warm (2700K), layered lighting. Dimmable everything. Avoid harsh overhead or cool-toned light.',
    textures: 'Predominantly soft—velvet, wool, cashmere, brushed cotton. Some structured elements for grounding.',
    acoustics: 'High priority. Sound-absorbing materials, soft furnishings, area rugs. Quiet appliances essential.',
    spatial: 'Defined spaces with clear boundaries. Cozy proportions. Visual "stopping points" for the eye to rest.',
  },
  'Energy Craver': {
    color: 'Can handle more saturation and contrast. Bold accent colors, dramatic darks, or crisp whites work well.',
    lighting: 'Bright, dynamic options. Mix of natural light, task lighting, and accent lighting. Can enjoy higher color temps.',
    textures: 'Mix of textures including smooth, cool, and structured. Leather, metal, polished surfaces alongside warmth.',
    acoustics: 'Less sensitive. Background sound can be energizing. Focus on good speakers/sound system over absorption.',
    spatial: 'Open plans, visual flow, sightlines. Room to move. Interesting architectural features and visual destinations.',
  },
  'Balance Finder': {
    color: 'Warm neutral base with strategic color moments. Flexibility to shift mood with accessories and art.',
    lighting: 'Fully layered and dimmable. Warm base (2700-3000K) with ability to brighten for tasks. Zone lighting essential.',
    textures: 'Intentional mix of soft and structured. Different textures for different zones matching their purpose.',
    acoustics: 'Zone-based approach. Quiet areas need absorption, social areas can have more life.',
    spatial: 'Semi-open with defined zones. Visual anchors between areas. Both cozy nooks and open gathering spaces.',
  },
}

// ============================================
// ROOM-BY-ROOM INSIGHTS
// ============================================

export const roomByRoomInsights: Record<NervousSystemType, {
  bedroom: string
  kitchen: string
  living: string
  office: string
  bathroom: string
  entryway: string
}> = {
  'Calm Seeker': {
    bedroom: 'Cocoon priority. Blackout capability essential. Minimal visual noise—clear surfaces, hidden storage. Soft underfoot. Consider weighted bedding.',
    kitchen: 'Warm materials (wood, stone). Soft-close everything. Hidden appliances where possible. Good task lighting but dimmable for evening.',
    living: 'Sink-in seating. Low, warm lighting. Books and soft textiles over screens and tech. A dedicated "nest" spot for restoration.',
    office: 'If WFH, needs clear separation from rest spaces. Acoustic privacy important. Natural light but with glare control. Minimal visual clutter.',
    bathroom: 'Spa priority. Warm lighting (no harsh vanity lights). Heated floors if possible. Storage for clear counters. Bathtub over just shower.',
    entryway: 'Decompression zone. Place to pause before entering main space. Soft lighting. Hidden storage for visual calm.',
  },
  'Energy Craver': {
    bedroom: 'Can be more visually interesting than typical. Statement headboard, bold art. Good blackout for sleep but room for energy when awake.',
    kitchen: 'Social hub potential. Open to other spaces. Good for hosting. Quality appliances you enjoy using. Music/speaker integration.',
    living: 'Entertainment-ready. Room to move and gather. Interesting focal points—art, view, fireplace. Mix of seating options.',
    office: 'Inspiring environment. View if possible. Room for standing/moving while thinking. Interesting objects and visual stimulation.',
    bathroom: 'Efficient and energizing. Good bright lighting for morning routines. Walk-in shower. Can handle more visual drama.',
    entryway: 'Makes a statement. Sets energetic tone for the home. Interesting lighting or art. Efficient organization.',
  },
  'Balance Finder': {
    bedroom: 'Calmer than rest of home. Good blackout and quiet. But still reflects your aesthetic. Flexibility to energize morning routine.',
    kitchen: 'Flexible formality. Good for both quick solo meals and hosting. Transition lighting from task to ambient.',
    living: 'Zone it. Reading nook AND social area. Ability to shift mood with lighting. Flexible seating arrangements.',
    office: 'Separation from relaxation spaces. Natural light essential. Both focused work setup and creative thinking space.',
    bathroom: 'Efficient daily function but with spa moments available. Good storage. Lighting that can shift from bright to dim.',
    entryway: 'Transition zone. Helps shift between outside energy and home mode. Practical but welcoming.',
  },
}