import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'
import React from 'react'

type ButtonProps = IButtonProps & {
    value: string;
    variant?: 'outline' | 'solid'
}

export const Button = ({ value, variant, ...rest }: ButtonProps) => {
    return (
        <NativeBaseButton
            w='full'
            h={14}
            bg={variant === 'outline' ? 'transparent' : 'green.700'}
            borderColor='green.700'
            borderWidth={1}
            _pressed={{ bg: variant === 'outline' ? 'gray.500' : 'green.500' }}
            {...rest}>
            <Text
                color={variant === 'outline' ? 'green.500' : 'white'}
                fontFamily='Heading fontFamily="heading"'
                fontSize='sm'>{value}</Text>
        </NativeBaseButton>
    )
} 