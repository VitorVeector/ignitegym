import { MaterialIcons } from '@expo/vector-icons'
import { useAuth } from '@hooks/useAuth'

import { HStack, Text, Heading, VStack, Icon } from 'native-base'
import { TouchableOpacity } from 'react-native'
import userPhotoDefault from "@assets/userPhotoDefault.png"
import { UserPhoto } from './UserPhoto'

export const HomeHeader = () => {
    const { user } = useAuth()

    return (
        <HStack bg="gray.500" width="full" pt={16} pb={5} px={8} alignItems="center">
            <UserPhoto size={16} source={user.avatar ? { uri: user.avatar } : userPhotoDefault} alt="Foto de perfil do usuário" mr={4} />
            <HStack alignItems="center" flex={1} justifyContent="space-between">
                <VStack>
                    <Text color="gray.100" fontSize="md">Olá,</Text>
                    <Heading fontFamily="heading" color="gray.100" fontSize="md">{user.name}</Heading>
                </VStack>
                <TouchableOpacity>
                    <Icon
                        as={MaterialIcons}
                        name="logout"
                        color="gray.200"
                        size={7} />
                </TouchableOpacity>
            </HStack>

        </HStack>
    )
}