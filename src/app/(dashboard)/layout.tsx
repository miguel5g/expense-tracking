import { cookies } from 'next/headers';

import { GetStarted } from '@/components/dialogs/get-started';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const store = cookies();
  const hasGetStarted = store.get('get-started') && store.get('get-started')?.value === 'true';

  return (
    <>
      <GetStarted alreadyStarted={hasGetStarted} />
      {children}
    </>
  );
};

export default DashboardLayout;
