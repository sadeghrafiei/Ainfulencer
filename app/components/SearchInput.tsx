import React, { useState, useEffect, useImperativeHandle, useRef } from "react"
import { ActivityIndicator, Image, Pressable, StyleSheet, TextInput, View } from "react-native"
import { color } from "../theme/color"
import { image } from "../theme/image"
import { spacing } from "../theme/spacing"

import { SearchInputProps, SearchInputRef } from "./SearchInput.props"

export const SearchInput = React.forwardRef<SearchInputRef, SearchInputProps>(
    (
        {
            initialized,
            onBackPress,
            onChangeText,
            clear,
            defaultValue,
            displayClear,
            placeholderTx = "Search a hashtag...",
            inProgress = null,
            ...props
        },
        ref,
    ) => {
        const [value, setValue] = useState<string>()

        const inputRef = useRef<TextInput>(null)

        const _onChangeText = (e: string) => {
            setValue(e)
            onChangeText?.(e)
        }

        const focus = () => {
            inputRef.current?.focus()
        }

        useImperativeHandle(ref, () => ({
            focus,
        }))

        useEffect(() => {
            setValue(defaultValue)
        }, [defaultValue])

        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    {displayClear && initialized && (
                        <Pressable onPress={clear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                            <Image style={styles.icon} source={image.Close} />
                        </Pressable>
                    )}
                    <TextInput
                        ref={inputRef}
                        {...props}
                        value={value}
                        style={[styles.input]}
                        onChangeText={_onChangeText}
                        placeholder={placeholderTx}
                        placeholderTextColor={color.dim}
                        returnKeyType="search"
                        keyboardType="web-search"
                    />

                    {typeof inProgress === "boolean" && (
                        <View style={styles.spinner}>{inProgress && <ActivityIndicator size="small" />}</View>
                    )}
                </View>
                {/* {initialized && displayClear && ( */}
                <Pressable onPress={() => onBackPress?.()} style={styles.clear} hitSlop={{ top: 8, bottom: 8, right: 8, left: 8 }}>
                    <Image style={styles.backIcon} source={image.BackArrow} />
                </Pressable>
                {/* )} */}
            </View>

        )
    },
)

SearchInput.displayName = "SearchInput"

const styles = StyleSheet.create({
    container: {
        marginHorizontal: spacing.xLarge,
        flexDirection: "row-reverse",
    },
    wrapper: {
        borderRadius: spacing.xxLarge,
        backgroundColor: color.gray,
        flexDirection: "row-reverse",
        alignItems: "center",
        paddingHorizontal: spacing.large,
        flex: 1
    },

    icon: {
        width: 10,
        height: 15
    },

    input: {
        flex: 1,
        paddingHorizontal: spacing.medium,
        color: color.text,
        paddingVertical: spacing.medium + 2,
        fontSize: 14,
        lineHeight: 20
    },

    clear: {
        paddingHorizontal: spacing.tiny,
        alignSelf: "center"
    },

    backIcon: { width: 30, height: 30 },

    spinner: {
        width: 15,
    },
})