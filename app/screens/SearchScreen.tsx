import React, { useEffect, useRef, useState } from 'react'
import { FlatList, Text, View, Keyboard, Image, StyleSheet } from 'react-native'
import { SearchInput } from '../components/SearchInput'
import { SearchInputRef } from '../components/SearchInput.props'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { users } from '../api/api'
import { image } from '../theme/image'
import { color } from '../theme/color'
import { spacing } from '../theme/spacing'

type UserProps = {
    username: string
    id: number
}

export const SearchScreen: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [user, setUser] = useState<UserProps[]>([])

    const inputRef = useRef<SearchInputRef>(null)

    const { top: marginTop } = useSafeAreaInsets()

    const clear = () => {
        Keyboard.dismiss()
        setSearchTerm('')
    }

    const getUsers = async () => {
        const res = await users()
        if (res.status === 200) {
            setUser(res.data)
        }
    }

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

    const listItems = user.filter((item, index) => item.username.toLowerCase().includes(searchTerm?.toLowerCase()))

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
                />
            </View>
        )
    }
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