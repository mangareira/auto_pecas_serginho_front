import Image from 'next/image';
import Link from 'next/link';

export const HeaderLogo = () => {
  return (
    <Link href={'/'}>
      <div className="items-center hidden lg:flex">
        <Image
          alt="logo"
          className="bg-white rounded-full"
          height={170}
          src={'/logo.png'}
          width={170}
        />
        <p className="font-semibold text-white text-2xl ml-2.5">Auto Eletrica Serginho</p>
      </div>
    </Link>
  );
};