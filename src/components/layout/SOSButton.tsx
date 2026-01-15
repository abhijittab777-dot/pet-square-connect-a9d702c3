import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const SOSButton = () => {
  const navigate = useNavigate();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => navigate('/sos')}
          className="sos-button w-14 h-14 md:w-16 md:h-16 bottom-6 right-6"
          aria-label="SOS Emergency Hub"
        >
          <AlertTriangle className="w-6 h-6 md:w-7 md:h-7" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="left" className="bg-destructive text-destructive-foreground font-semibold">
        <p>SOS Emergency Hub</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default SOSButton;
