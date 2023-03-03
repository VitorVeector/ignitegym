import { MaterialIcons } from '@expo/vector-icons'
import { useAuth } from '@hooks/useAuth'

import { HStack, Text, Heading, VStack, Icon } from 'native-base'
import { TouchableOpacity, Alert } from 'react-native'
import defaultUserPhotoImg from '@assets/userPhotoDefault.png'
import { UserPhoto } from './UserPhoto'
import { api } from '@services/api'

export const HomeHeader = () => {
    const PHOTO_SIZE = 16

    const { user, signOut } = useAuth()

    const logOut = () => {
        Alert.alert(
            "SignOut",
            "Você realmente deseja sair da sessão?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                { text: "Sair", onPress: signOut }
            ]
        );
    }

    return (
        <HStack bg="gray.500" width="full" pt={16} pb={5} px={8} alignItems="center">
            <UserPhoto source={user.avatar ?
                                { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                                : defaultUserPhotoImg} size={PHOTO_SIZE} alt="Foto do usuário" mr={3} />
            <HStack alignItems="center" flex={1} justifyContent="space-between">
                <VStack>
                    <Text color="gray.100" fontSize="md">Olá,</Text>
                    <Heading fontFamily="heading" color="gray.100" fontSize="md">{user.name}</Heading>
                </VStack>
                <TouchableOpacity
                    onPress={logOut}>
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