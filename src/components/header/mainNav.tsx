import { usePathname } from 'next/navigation';

import { routes } from '@/utils/routes';
import { NavButton } from '../nav/navButton';

export const Navigation = () => {

  const pathName = usePathname();
   return (
    <div className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((r) => (
        <NavButton
          key={r.href}
          href={r.href}
          isActive={pathName === r.href}
          label={r.label}
        />
      ))}
    </div>
  );
};