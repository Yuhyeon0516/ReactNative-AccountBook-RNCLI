import {View, TextInput, StyleProp, TextInputProps} from 'react-native';
import React, {useState} from 'react';

export default function SingleLineInput({
  value,
  onChangeText,
  placeholder,
  style,
  fontSize,
  onSubmitEditing,
  keyboardType,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onSubmitEditing?: () => void;
  fontSize?: number;
  style?: StyleProp<TextInputProps>;
  keyboardType?: TextInputProps['keyboardType'];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View
      style={{
        alignSelf: 'stretch',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: focused ? 'black' : 'gray',
      }}>
      <TextInput
        autoCorrect={false}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={[style, {fontSize: fontSize ?? 20, padding: 0}]}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
}
