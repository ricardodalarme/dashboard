import { useIntl } from 'react-intl';

import { MessagesKey } from '@/locales/messages';

import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/Tooltip';

import { cn } from '@/lib/utils';

interface IColoredCircle {
  tooltipText?: MessagesKey;
  quantity?: number;
  className?: string;
  backgroundClassName: string;
}

const TooltipWrapper = ({
  tooltipText,
  children,
}: {
  tooltipText?: MessagesKey;
  children: JSX.Element;
}): JSX.Element => {
  const { formatMessage } = useIntl();
  if (!tooltipText) {
    return children;
  }
  return (
    <Tooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      {tooltipText && (
        <TooltipContent>{formatMessage({ id: tooltipText })}</TooltipContent>
      )}
    </Tooltip>
  );
};

const ColoredCircle = ({
  quantity,
  backgroundClassName,
  className,
  tooltipText,
}: IColoredCircle): JSX.Element => {
  return (
    <TooltipWrapper tooltipText={tooltipText}>
      <div
        className={cn(
          'inline-flex h-6 w-fit min-w-6 justify-center rounded-full px-1 text-black',
          className,
          backgroundClassName,
        )}
      >
        <span className="text-sm">{quantity}</span>
      </div>
    </TooltipWrapper>
  );
};

export default ColoredCircle;
