import { ComponentProps } from 'react';

interface EmojiProps extends Omit<ComponentProps<'span'>, 'children'> {
  symbol: string;
  label?: string;
}

const Emoji: React.FC<EmojiProps> = ({ symbol, label, ...props }) => {
  return (
    <span role="img" aria-label={label ? label : 'Emoji'} aria-hidden={!label} {...props}>
      {symbol}
    </span>
  );
};

export { Emoji };
