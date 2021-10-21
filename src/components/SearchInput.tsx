import React, { useEffect, useState } from 'react'
import { Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

interface Props {
    onDebouce: ( value: string ) => void;
    style?: StyleProp<ViewStyle>
}

export const SearchInput = ({ style, onDebouce }: Props) => {

    const [textValue, setTextValue] = useState('')

    const debouncedValue = useDebouncedValue( textValue )

    useEffect(() => {
        onDebouce(debouncedValue)
    }, [debouncedValue])

    return (
        <View style={{ 
            ...styles.container,
            ...style as any
        }}>
            <View style={ styles.textBackground }>
                
                <TextInput 
                    placeholder="Buscar pokémon"
                    style={{ 
                        ...styles.textInput, 
                        top: (Platform.OS === 'ios') ? 0 : 0
                    }}
                    autoCapitalize="none"
                    autoCorrect={ false }
                    value={ textValue }
                    onChangeText={ setTextValue }
                />

                <Icon 
                    name="search-outline"
                    color="grey"
                    size={22}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red'
    },
    textBackground: {
        backgroundColor: 'rgba(255,255,255,0.97)',
        borderRadius: 50,
        height: 45,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
    }
});
