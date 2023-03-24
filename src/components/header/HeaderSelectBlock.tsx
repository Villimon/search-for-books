import React from 'react';
import { OptionsType } from '../../types/types';
import MySelect from '../UI/select/MySelect';


type PropsType = {
    lable: string
    options: Array<OptionsType>
    value: string
    onChange: (value: string) => void
}


const HeaderSelectBlock: React.FC<PropsType> = ({ lable, options, value, onChange }) => {
    return (
        <div className="header__block">
            <p className="header__lable">{lable}</p>
            <MySelect
                options={options}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default HeaderSelectBlock;
