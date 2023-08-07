import {ScrollView, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {CustomButton} from '../components/CustomButton';
import {Typography} from '../components/Typography';
import {Spacer} from '../components/Spacer';
import {RemoteImage} from '../components/RemoteImage';
import {convertToDateString} from '../utils/DataUtil';
import {AccountBookHistory} from '../type/AccountBookHistory';

export default function DetailScreen() {
  const navigation = useRootNavigation<'Detail'>();
  const route = useRootRoute<'Detail'>();

  const [item, setItem] = useState<AccountBookHistory>(route.params.item);

  const onPressModify = useCallback(() => {
    navigation.push('Update', {
      item: item,
      onChangeData: nextItem => {
        setItem(nextItem);
      },
    });
  }, [item, navigation]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Detail Screen" />
        <Header.Icon
          iconName="close"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Header>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingTop: 32, paddingHorizontal: 24}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <View>
              <View
                style={{
                  backgroundColor: item.type === '사용' ? 'black' : 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 12,
                  borderTopLeftRadius: 12,
                  borderBottomLeftRadius: 12,
                }}>
                <Typography
                  fontSize={16}
                  color={item.type === '사용' ? 'white' : 'black'}>
                  사용
                </Typography>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View>
              <View
                style={{
                  backgroundColor: item.type === '수입' ? 'black' : 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 12,
                  borderTopRightRadius: 12,
                  borderBottomRightRadius: 12,
                }}>
                <Typography
                  fontSize={16}
                  color={item.type === '수입' ? 'white' : 'black'}>
                  수입
                </Typography>
              </View>
            </View>
          </View>
        </View>

        <Spacer space={20} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 4,
              }}>
              <Typography fontSize={16} color="gray">
                {item.price.toString() + '원'}
              </Typography>
            </View>

            <Spacer space={24} />

            <View
              style={{
                borderColor: 'gray',
                borderWidth: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 4,
              }}>
              <Typography fontSize={16} color="gray">
                {convertToDateString(item.date)}
              </Typography>
            </View>
          </View>

          <View style={{marginLeft: 24}}>
            {item.photoUrl ? (
              <RemoteImage
                url={item.photoUrl}
                width={100}
                height={100}
                style={{borderRadius: 12}}
              />
            ) : (
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 12,
                  backgroundColor: 'lightgray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            )}
          </View>
        </View>

        <Spacer space={12} />

        <View
          style={{
            alignSelf: 'stretch',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: 'gray',
            height: 100,
          }}>
          <Typography fontSize={20} color="gray">
            {item.comment}
          </Typography>
        </View>

        <Spacer space={64} />

        <CustomButton onPress={onPressModify}>
          <View
            style={{
              paddingVertical: 12,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Typography fontSize={16} color="white">
              수정하기
            </Typography>
          </View>
        </CustomButton>
      </ScrollView>
    </View>
  );
}
