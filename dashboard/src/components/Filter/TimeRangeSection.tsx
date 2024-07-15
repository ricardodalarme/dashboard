import { FormattedMessage } from 'react-intl';

import { Input } from '../ui/input';

interface TimeRangeSection {
  min: number;
  max: number;
  onMinChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onMaxChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const inputContainerClass = 'flex gap-x-4 items-center';
const inputClass = 'max-w-20';

const TimeRangeSection = ({
  min,
  max,
  onMinChange,
  onMaxChange,
}: TimeRangeSection): JSX.Element => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className={inputContainerClass}>
        <span className="w-8">
          <FormattedMessage id="filter.min" />:
        </span>
        <Input
          className={inputClass}
          onChange={onMinChange}
          value={min}
          type="number"
        />
      </div>

      <div className={inputContainerClass}>
        <span className="w-8">
          <FormattedMessage id="filter.max" />:
        </span>

        <Input
          className={inputClass}
          onChange={onMaxChange}
          value={max}
          type="number"
        />
      </div>
    </div>
  );
};

export default TimeRangeSection;
