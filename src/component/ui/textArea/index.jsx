import React from 'react';
import { Textarea as ChakraTextarea, Text, VStack, FormControl, FormLabel } from '@chakra-ui/react'
import ErrorMessage from '../errorMessage';

export default function TextArea(props) {
    
    const { placeholder, size, value, error, onChange, label, maxLength, disabled, currentLength, ...rest } = props;

    return (
        <FormControl {...rest}>
            {label && <FormLabel>{label}</FormLabel>}
            <VStack spacing={1} w="full">
                <ChakraTextarea
                    value={value ?? ''}
                    placeholder={placeholder}
                    _placeholder={{ color: 'grey.60' }}
                    // _focus={{ borderColor: 'blue.50', borderWidth: '4px', borderRadius: '8px' }}
                    // _active={{ borderWidth: '2px', borderRadius: '8px', borderColor: 'blue.100' }}
                    _hover={{
                        borderColor: (!error) ? 'grey.20' : 'transparent'
                    }}
                    size={size}
                    resize="vertical"
                    disabled={disabled}
                    errorBorderColor='alert.error'
                    focusBorderColor='blue.100'
                    maxLength={maxLength ?? 500}
                />
                <Text color="grey.60" textStyle="InterTiny" alignSelf={"end"}>
                    {`Character count: ${currentLength ?? 0}/${maxLength}`}
                </Text>
                {!!error && <ErrorMessage color="red">{error}</ErrorMessage>}
            </VStack>
        </FormControl>
    )
}