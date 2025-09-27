import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Button = () => {
  const navigate = useNavigate();
  return (
    <button
      className="border border-neutral-700 inline-flex items-center gap-2 text-sm text-white bg-neutral-950 h-12 px-3 py-2 rounded-full hover:opacity-80"
      onClick={() => navigate('/movies')}
    >
      <ArrowLeft size={24} />
      Retour
    </button>
  );
};

export default Button;
