import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'
import React from 'react'

type InputProps = IInputProps & {
    errorMessage?: string,
    isInvalid?: boolean
}

export const Input = ({ errorMessage = null, isInvalid, ...rest }: InputProps) => {
    const invalid = !!errorMessage || isInvalid

    return (
        <FormControl>
            <NativeBaseInput
                isInvalid={invalid}
                _invalid={{
                    borderWidth: 1,
                    borderColor: "red.500"
                }}
                bg='gray.700'
                placeholderTextColor='gray.300'
                borderWidth={1}
                borderColor='gray.700'
                fontSize='md'
                fontFamily='body'
                color='white'
                _focus={{
                    bg: 'gray.700',
                    borderWidth: 1,
                    borderColor: 'green.500'
                }}
                {...rest}
            />
        </FormControl>

    )
}