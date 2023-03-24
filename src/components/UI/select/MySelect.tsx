import React from 'react';
import { OptionsType } from '../../../types/types';


type PropsType = {
    options: Array<OptionsType>
    value: string
    onChange: (value: string) => void
}


const MySelect: React.FC<PropsType> = ({ options, value, onChange }) => {

    return (
        <select
            className="header__select"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}

export default MySelect;
