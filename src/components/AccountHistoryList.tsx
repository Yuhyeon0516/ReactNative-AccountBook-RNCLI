import {View} from 'react-native';
import React from 'react';
import {AccountBookHistory} from '../type/AccountBookHistory';
import {CustomButton} from './CustomButton';
import {Icon} from './Icons';
import {Typography} from './Typography';
import {Spacer} from './Spacer';
import {RemoteImage} from './RemoteImage';
import {convertToDateString} from '../utils/DataUtil';

export default function AccountHistoryList({
  item,
  onPressItem,
}: {
  item: AccountBookHistory;
  onPressItem: (item: AccountBookHistory) => void;
}) {
  return (
    <CustomButton onPress={() => onPressItem(item)}>
      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 24,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Icon
          iconName={item.type === '사용' ? 'remove-circle' : 'add-circle'}
          size={24}
          color={item.type === '사용' ? 'red' : 'blue'}
        />
        <View style={{flex: 1, marginLeft: 12}}>
          <Typography fontSize={16} numOfLines={1}>
            {item.comment} | {item.price.toString() + '만원'}
          </Typography>
          <Spacer space={4} />
          <Typography fontSize={12}>
            {convertToDateString(item.date)}
          </Typography>
        </View>
        {item.photoUrl !== null ? (
          <RemoteImage
            url={item.photoUrl}
            width={100}
            height={100}
            style={{marginLeft: 12, borderRadius: 10}}
          />
        ) : (
          <View />
        )}
      </View>
    </CustomButton>
  );
}
