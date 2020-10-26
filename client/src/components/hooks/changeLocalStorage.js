import { useEffect, useState } from 'react'
const APPID = 'whatsapp_clone_'
export default function ChangeLocalStorage( key, initalValue) {
    const itemKey = APPID + key;
    const [value, setValue] = useState(() => {
        const jsonVal = localStorage.getItem(itemKey);
        if(jsonVal != null) { return JSON.parse(jsonVal); }
        if(typeof initalValue === 'function') {
            return initalValue();
        } else {
            return initalValue;
        }
    })
    useEffect(() => {
        localStorage.setItem(itemKey,JSON.stringify(value));
    },[itemKey,value])
    return [value,setValue];
}
