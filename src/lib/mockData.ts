// Mock data for doctors and hospitals
export const mockDoctors = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialty: "General Physician",
    hospital: "Apollo Hospital",
    distance: "2.3 km",
    rating: 4.8,
    available: true,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialty: "Cardiologist",
    hospital: "Max Healthcare",
    distance: "3.1 km",
    rating: 4.9,
    available: true,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
  },
  {
    id: "3",
    name: "Dr. Anjali Patel",
    specialty: "Pulmonologist",
    hospital: "Fortis Hospital",
    distance: "4.5 km",
    rating: 4.7,
    available: false,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop",
  },
  {
    id: "4",
    name: "Dr. Vikram Singh",
    specialty: "Neurologist",
    hospital: "AIIMS",
    distance: "5.2 km",
    rating: 4.9,
    available: true,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop",
  },
];

export const mockHospitals = [
  {
    id: "1",
    name: "Apollo Hospital",
    type: "Multi-Specialty",
    distance: "2.3 km",
    emergency: true,
    address: "Sarita Vihar, New Delhi",
    phone: "+91-11-26925858",
  },
  {
    id: "2",
    name: "Max Healthcare",
    type: "Super-Specialty",
    distance: "3.1 km",
    emergency: true,
    address: "Saket, New Delhi",
    phone: "+91-11-26515050",
  },
  {
    id: "3",
    name: "Fortis Hospital",
    type: "Multi-Specialty",
    distance: "4.5 km",
    emergency: true,
    address: "Vasant Kunj, New Delhi",
    phone: "+91-11-42776222",
  },
];

export const symptoms = [
  { id: "headache", label: "Headache", icon: "🤕" },
  { id: "dizziness", label: "Dizziness", icon: "😵" },
  { id: "chest-tightness", label: "Chest Tightness", icon: "💔" },
  { id: "fatigue", label: "Fatigue", icon: "😴" },
  { id: "anxiety", label: "Anxiety", icon: "😰" },
  { id: "nausea", label: "Nausea", icon: "🤢" },
  { id: "fever", label: "Fever", icon: "🤒" },
  { id: "cough", label: "Cough", icon: "😷" },
];

export const allergies = [
  "Peanuts",
  "Shellfish",
  "Dairy",
  "Gluten",
  "Eggs",
  "Soy",
  "Tree Nuts",
  "Penicillin",
  "Aspirin",
  "Sulfa Drugs",
  "Latex",
  "Pollen",
  "Dust Mites",
  "Pet Dander",
];

export const diagnoses = [
  "Type 2 Diabetes",
  "Hypertension (High BP)",
  "Asthma",
  "Heart Disease",
  "Thyroid Disorder",
  "Arthritis",
  "Migraine",
  "GERD / Acid Reflux",
  "Anxiety Disorder",
  "Depression",
  "Sleep Apnea",
  "Anemia",
];

export const activityLevels = [
  { value: "sedentary", label: "Sedentary", description: "Little or no exercise" },
  { value: "light", label: "Light", description: "1-3 days per week" },
  { value: "moderate", label: "Moderate", description: "3-5 days per week" },
  { value: "active", label: "Active", description: "6-7 days per week" },
  { value: "very-active", label: "Very Active", description: "Intense exercise daily" },
];

export const sleepQualityOptions = [
  { value: "poor", label: "Poor", emoji: "😫" },
  { value: "average", label: "Average", emoji: "😐" },
  { value: "good", label: "Good", emoji: "😊" },
  { value: "excellent", label: "Excellent", emoji: "😴" },
];
