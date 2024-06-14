import React from 'react';
import { Checkbox } from '@chakra-ui/react';

export default function Checbox({ 
    text, 
    defaultChecked, 
    size,
    disabled
}) {


    return (
        <Checkbox 
            defaultChecked={defaultChecked ?? false}
            disabled={disabled}
            size={size ?? 'lg'}
            colorScheme="red"
            iconColor='white'

        >
            {text}
        </Checkbox>
    );
}