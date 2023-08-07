import {ScrollView, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {CustomButton} from '../components/CustomButton';
import {AccountBookHistory} from '../type/AccountBookHistory';
import {Typography} from '../components/Typography';
import {Spacer} from '../components/Spacer';
import SingleLineInput from '../components/SingleLineInput';
import {Icon} from '../components/Icons';
import {convertToDateString} from '../utils/DataUtil';
import MultiLineInput from '../components/MultiLineInput';
import useAccountBookHistory from '../hooks/useAccountBookHistory';

export default function AddUpdateScreen() {
  const navigation = useRootNavigation<'Add' | 'Update'>();
  const route = useRootRoute<'Add' | 'Update'>();
  const {insertItem} = useAccountBookHistory();
  const [item, setItem] = useState<AccountBookHistory>(
    route.params?.item ?? {
      type: '사용',
      price: 0,
      comment: '',
      date: 0,
      createdAt: 0,
      updatedAt: 0,
      photoUrl: null,
    },
  );

  const onPressType = useCallback<(type: AccountBookHistory['type']) => void>(
    type => {
      if (route.name === 'Update') {
        return;
      }
      setItem(prev => {
        return {
          ...prev,
          type: type,
        };
      });
    },
    [route.name],
  );

  const onChangePrice = useCallback<(text: string) => void>(text => {
    setItem(prev => {
      return {
        ...prev,
        price: parseInt(text),
      };
    });
  }, []);

  const onChangeComment = useCallback<(text: string) => void>(text => {
    setItem(prev => {
      return {
        ...prev,
        comment: text,
      };
    });
  }, []);

  const onPressPhoto = useCallback(() => {}, []);

  const onPressCalandar = useCallback(() => {
    navigation.push('Calendar', {
      onSelectDay: date => {
        setItem(prev => {
          return {
            ...prev,
            date: date,
          };
        });
      },
    });
  }, [navigation]);

  const onPressSave = useCallback(() => {
    if (route.name === 'Add') {
      insertItem(item).then(() => navigation.goBack());
    }
  }, [insertItem, item, navigation, route.name]);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Add/Update Screen" />
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
            <CustomButton
              onPress={() => {
                onPressType('사용');
              }}>
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
            </CustomButton>
          </View>
          <View style={{flex: 1}}>
            <CustomButton
              onPress={() => {
                onPressType('수입');
              }}>
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
            </CustomButton>
          </View>
        </View>

        <Spacer space={20} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <SingleLineInput
              value={item.price === 0 ? '' : item.price.toString()}
              placeholder="금액을 입력해주세요."
              onChangeText={onChangePrice}
              keyboardType="number-pad"
              fontSize={16}
            />

            <Spacer space={24} />

            <CustomButton onPress={onPressCalandar}>
              <View
                style={{
                  borderColor: 'gray',
                  borderWidth: 1,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 4,
                }}>
                <Typography fontSize={16} color="gray">
                  {item.date
                    ? convertToDateString(item.date)
                    : '날짜를 선택하세요.'}
                </Typography>
              </View>
            </CustomButton>
          </View>

          <View style={{marginLeft: 24}}>
            <CustomButton onPress={onPressPhoto}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 12,
                  backgroundColor: 'lightgray',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon iconName="add" size={24} color="gray" />
              </View>
            </CustomButton>
          </View>
        </View>

        <Spacer space={12} />

        <MultiLineInput
          value={item.comment}
          height={100}
          onChangeText={onChangeComment}
          placeholder="어떤 일인가요?"
          onSubmitEditing={() => {}}
        />

        <Spacer space={64} />

        <CustomButton onPress={onPressSave}>
          <View
            style={{
              paddingVertical: 12,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Typography fontSize={16} color="white">
              {route.name === 'Add' ? '저장하기' : '수정하기'}
            </Typography>
          </View>
        </CustomButton>
      </ScrollView>
    </View>
  );
}
