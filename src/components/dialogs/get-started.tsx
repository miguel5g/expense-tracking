'use client';

import Image from 'next/image';
import { setCookie } from 'cookies-next';

import SavingsSVG from '@/assets/savings.svg';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface GetStartedProps {
  alreadyStarted?: boolean;
}

const GetStarted: React.FC<GetStartedProps> = ({ alreadyStarted }) => {
  function handleGetStarted() {
    setCookie('get-started', 'true', { path: '/' });
  }

  return (
    <AlertDialog defaultOpen={!alreadyStarted}>
      <AlertDialogContent>
        <div className="flex items-center justify-center">
          <Image src={SavingsSVG} alt="Savings" width={240} height={194} priority />
        </div>

        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            Monitore suas despesas com agilidade
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            O Gerenciador de despesas é uma ferramenta que ajuda a gerenciar suas despesas de forma
            fácil e eficiente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="!justify-center">
          <Button variant="link">Saber mais</Button>
          <AlertDialogAction onClick={handleGetStarted}>Iniciar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { GetStarted };
