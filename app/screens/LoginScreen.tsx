import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../components/button';
import Input from '../components/input/Input';
import { tokenKey } from '../helpers/localStorage';
import useStateStorage from '../hooks/useStateStorage';
import { login, loginSuccess } from '../store/reducers/user';
import { selectUser } from '../store/selector/user';
import { color } from '../theme/color';
import { image } from '../theme/image';
import { spacing } from '../theme/spacing';

export const LoginScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState<string>('')
    const [token, setToken] = useStateStorage<string | null>(tokenKey, null);

    const { top: marginTop } = useSafeAreaInsets()

    const dispatch = useDispatch()

    const navigation = useNavigation()

    const user = useSelector(selectUser);

    const onAddAcount = () => {
        setIsLoading(true)
        try {
            dispatch(login());
            dispatch(loginSuccess());
            if (user.loggedIn && username.length > 0) {
                setToken("token")
                navigation.navigate("search")
            }
        } catch (error) {
            setIsLoading(false)
            console.log({ error })
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <View style={[styles.contentContainer, { marginTop }]}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Add Your Instagram Account!</Text>
                    <Text style={styles.description}>
                        To collaborate with brands on
                        their content and promotional campaigns
                        you need to have an active and influential
                        Instagram account.
                    </Text>
                </View>
                <View style={styles.form}>
                    <Image source={image.Instagram} style={styles.image} />
                    <View style={styles.inputContainer}>
                        <Input
                            placeholder='Your Instagram username...'
                            imageSource={image.InstagramIcon}
                            imageStyle={styles.input}
                            onChangeText={setUsername}
                            value={username}
                            error={!username}
                            errorText={"username is required!"}
                        />
                    </View>
                </View>

            </View>
            <View style={styles.footer}>
                <Button
                    onPress={onAddAcount}
                    text='Add Acount'
                    textStyle={styles.buttonText}
                    style={styles.button}
                    isLoading={isLoading}
                />
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: spacing.xLarge,
        flex: 1
    },

    textContainer: {
        paddingVertical: spacing.xxLarge
    },

    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    description: {
        textAlign: "center",
        color: color.dim,
        paddingVertical: spacing.large
    },
    form: {
        paddingVertical: spacing.xxxLarge
    },

    image: {
        width: "100%",
        height: 40,
        resizeMode: "contain"
    },

    inputContainer: {
        marginVertical: spacing.large
    },

    input: {
        width: 40,
        height: 40,
        marginHorizontal: spacing.small
    },

    footer: {
        alignSelf: "center",
        marginVertical: spacing.xxxLarge
    },

    button: {
        backgroundColor: "#365efb",
        padding: spacing.medium,
        width: 260,
        borderRadius: spacing.xLarge
    },
    buttonText: {
        color: color.white,
        fontWeight: "bold",
        textAlign: "center"
    }
})