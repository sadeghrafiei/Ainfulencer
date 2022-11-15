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
            placeholderTx = "SearchScreen.placeholder",
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
            <View style={styles.wrapper}>
                {/* {initialized ? ( */}
                <Pressable hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }} onPress={() => onBackPress?.()}>
                    <Image style={styles.icon} source={image.Close} />
                </Pressable>
                {/* ) : (
                    <Icon style={styles.icon} name="search" color="border" size={20} />
                )} */}
                <TextInput
                    ref={inputRef}
                    {...props}
                    value={value}
                    style={[styles.input]}
                    onChangeText={_onChangeText}
                    placeholder={placeholderTx}
                    placeholderTextColor={color.border}
                    returnKeyType="search"
                    keyboardType="web-search"
                />
                {initialized && displayClear && (
                    <Pressable onPress={clear} style={styles.clear} hitSlop={{ top: 8, bottom: 8, right: 8, left: 8 }}>
                        <Image style={styles.clearIcon} source={image.BackArrow} />
                    </Pressable>
                )}
                {typeof inProgress === "boolean" && (
                    <View style={styles.spinner}>{inProgress && <ActivityIndicator size="small" />}</View>
                )}
            </View>
        )
    },
)

SearchInput.displayName = "SearchInput"

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: spacing.xLarge,
        borderRadius: spacing.radius,
        backgroundColor: color.backgroundAlt,
        flexDirection: "row-reverse",
        alignItems: "center",
        paddingHorizontal: spacing.large,
    },

    icon: {},

    input: {
        flex: 1,
        paddingHorizontal: spacing.medium,
        color: color.text,
        paddingVertical: spacing.medium,
        fontSize: 14,
        lineHeight: 20
    },

    clear: {},

    clearIcon: {},

    spinner: {
        width: 15,
    },
})