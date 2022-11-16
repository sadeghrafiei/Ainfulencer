import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Text, View, Keyboard, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { SearchInput } from '../components/search-input/SearchInput'
import { SearchInputRef } from '../components/search-input/SearchInput.props'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { users as fetchUser } from '../api/api'
import { image } from '../theme/image'
import { color } from '../theme/color'
import { spacing } from '../theme/spacing'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { logout, logoutSuccess } from '../store/reducers/user'
import useStateStorage from '../hooks/useStateStorage'
import { tokenKey } from '../helpers/localStorage'
import { selectUser } from '../store/selector/user'

type UserProps = {
    username: string
    id: number
}

export const SearchScreen: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [users, setUsers] = useState<UserProps[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [token, setToken] = useStateStorage<string | null>(tokenKey, null);

    const inputRef = useRef<SearchInputRef>(null)

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const user = useSelector(selectUser);

    const { top: marginTop } = useSafeAreaInsets()

    const clear = () => {
        Keyboard.dismiss()
        setSearchTerm('')
    }

    const getUsers = async () => {
        setIsLoading(true)
        try {
            const res = await fetchUser()
            if (res.status === 200) {
                setUsers(res.data)
            }
        } catch (error) {
            setIsLoading(false)
        }
        finally {
            setIsLoading(false)
        }
    }

    const clearToken = useCallback(async () => {
        await Promise.all([
            setToken(null),
        ]).then(() => {
            navigation.reset({ index: 0, routes: [{ name: 'login' }] });
        });
    }, [setToken]);

    const onLogout = () => {
        try {
            dispatch(logout());
            dispatch(logoutSuccess());
            if (!user.loggedIn) {
                clearToken()
            }

        } catch (error) {
            setIsLoading(false)
            console.log({ error })
        }
    }

    console.log({ token })

    useEffect(() => {
        getUsers()
    }, [])

    const renderItem = ({ item }: { item: UserProps }) => {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={image.Hashtag} style={styles.icon} />
                </View>
                <View style={styles.usernameContainer}>
                    <Text style={styles.username}>#{item.username}</Text>
                </View>
            </View>
        )
    }

    const listItems = users.filter((item, index) => item.username.toLowerCase().includes(searchTerm?.toLowerCase()))

    const renderHeaderComponent = () => {
        return (
            <View >
                <SearchInput
                    ref={inputRef}
                    initialized
                    onChangeText={setSearchTerm}
                    clear={clear}
                    defaultValue={searchTerm}
                    displayClear={searchTerm?.length > 0}
                    onBackPress={() => onLogout()}
                />
            </View>
        )
    }

    if (isLoading) return <ActivityIndicator size={"large"} color={color.dim} style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} />
    return (
        <View style={{ marginTop, flex: 1 }}>
            <FlatList
                data={listItems}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={renderHeaderComponent}
                ItemSeparatorComponent={() => <View style={{ marginVertical: spacing.small }} />}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: spacing.xLarge,
        top: 15
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: color.border,
        padding: spacing.small,
        borderRadius: spacing.xLarge
    },

    icon: {
        height: 20, width: 20
    },

    usernameContainer: {
        alignSelf: "center",
        marginHorizontal: spacing.medium
    },

    username: {
        fontWeight: "bold"
    }
})