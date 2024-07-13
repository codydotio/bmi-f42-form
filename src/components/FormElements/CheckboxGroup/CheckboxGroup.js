import React from 'react';
import Checkbox from '../Checkbox/Checkbox';

const CheckboxGroup = ({ identifier, options, selected, setSelected, otherValue, setOtherValue }) => {
  const handleChange = (value) => {
    setSelected((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
    if (value !== 'other') {
      setOtherValue("");
    }
  }

  return (
    <div className={`checkbox-group ${identifier}`}>
      {options.map((option, i) => (
        <Checkbox
          key={option}
          checked={selected.includes(option)}
          onChange={() => handleChange(option)}
          label={option}
          id={`checkbox-${identifier}-${i}`}
        />
      ))}
      <div className="checkbox-group-other">
        <Checkbox
          checked={selected.includes('other')}
          onChange={() => handleChange('other')}
          label="Other"
          id={`checkbox-${identifier}-other`}
        />
        {selected.includes('other') && (
          <input
            type="text"
            className="border px-1"
            value={otherValue}
            onChange={(e) => setOtherValue(e.target.value)}
            placeholder="Please specify"
          />
        )}
      </div>
    </div>
  );
};

export default CheckboxGroup;
