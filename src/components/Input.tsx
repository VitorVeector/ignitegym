import { IInputProps, Input as NativeBaseInput } from 'native-base'
import React from 'react'

export const Input = ({ ...rest }: IInputProps) => {
    return (
        <NativeBaseInput
            bg='gray.700'
            placeholderTextColor='gray.300'
            borderWidth={1}
            borderColor='gray.700'
            fontSize='md'
            fontFamily='body'
            marginBottom={4}
            color='white'
            _focus={{
                bg: 'gray.700',
                borderWidth: 1,
                borderColor: 'green.500'
            }}
            {...rest}
        />
    )
}