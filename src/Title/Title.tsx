import { Typography } from 'antd';
import { CSSProperties } from 'react';

const { Title: AntTitle } = Typography;

export interface CustomTitleProps {
  level?: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

const Title = ({ level = 1, children, className = '', style }: CustomTitleProps) => {
  const baseClasses = 'font-bold tracking-tight text-gray-900 dark:text-white';
  
  const levelClasses = {
    1: 'text-4xl md:text-5xl mb-6',
    2: 'text-3xl md:text-4xl mb-5',
    3: 'text-2xl md:text-3xl mb-4',
    4: 'text-xl md:text-2xl mb-3',
    5: 'text-lg md:text-xl mb-2',
  }[level];

  return (
    <AntTitle
      level={level}
      className={`${baseClasses} ${levelClasses} ${className}`}
      style={style}
    >
      {children}
    </AntTitle>
  );
};

export default Title;