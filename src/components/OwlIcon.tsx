export default function OwlIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="#8B5CF6"/>
      <circle cx="24" cy="28" r="6" fill="white"/>
      <circle cx="40" cy="28" r="6" fill="white"/>
      <circle cx="24" cy="28" r="3" fill="#1F2937"/>
      <circle cx="40" cy="28" r="3" fill="#1F2937"/>
      <path d="M 28 38 Q 32 42 36 38" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 12 16 L 18 12 L 18 20 Z" fill="#8B5CF6"/>
      <path d="M 52 16 L 46 12 L 46 20 Z" fill="#8B5CF6"/>
    </svg>
  );
}
