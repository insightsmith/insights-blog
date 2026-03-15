import React from 'react';

type CalloutType = 'info' | 'tip' | 'warning' | 'quote';

const styles: Record<CalloutType, { border: string; bg: string; icon: string }> = {
  info:    { border: 'border-blue-400',  bg: 'bg-blue-50',   icon: 'ℹ️' },
  tip:     { border: 'border-green-400', bg: 'bg-green-50',  icon: '💡' },
  warning: { border: 'border-yellow-400',bg: 'bg-yellow-50', icon: '⚠️' },
  quote:   { border: 'border-gray-400',  bg: 'bg-gray-50',   icon: '💬' },
};

export default function Callout({
  type = 'info',
  children,
}: {
  type?: CalloutType;
  children: React.ReactNode;
}) {
  const { border, bg, icon } = styles[type];
  return (
    <div className={`my-6 border-l-4 ${border} ${bg} rounded-r-lg p-4 flex gap-3`}>
      <span className="text-xl">{icon}</span>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
