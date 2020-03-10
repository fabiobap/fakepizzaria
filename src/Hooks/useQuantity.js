import { useState } from 'react'

export function useQuantity(defaultQuantity) {
    const [value, setValue] = useState(defaultQuantity || 1);
    function onChange(e) {
        if(!(+e.target.value >= 1)){
            console.log(e.target.value);
            setValue(1);
            return;
        }
        setValue(+e.target.value);
    }

    return {
        value,
        setValue,
        onChange
    };
}