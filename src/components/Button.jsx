import { ArrowLeft } from 'lucide-react';

const Button = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition font-semibold shadow ${className || ''}`}
  >
    <ArrowLeft size={20} />
    {children || 'Retour'}
  </button>
);

export default Button;
