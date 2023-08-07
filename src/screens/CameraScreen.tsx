import React, {useCallback, useEffect, useRef} from 'react';
import {Platform, View} from 'react-native';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {CustomButton} from '../components/CustomButton';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export default function CameraScreen() {
  const navigation = useRootNavigation<'Camera'>();
  const route = useRootRoute<'Camera'>();
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const onPressTakePhoto = useCallback(async () => {
    const result = await cameraRef.current?.takePhoto();

    console.log(result);

    if (result) {
      const path = `${Platform.OS === 'android' ? 'file://' : ''}${
        result.path
      }`;

      const saveResult = await CameraRoll.save(path, {
        type: 'photo',
        album: 'AccountBook',
      });

      route.params.onTakePhoto(saveResult);

      navigation.goBack();
    }
  }, [navigation, route.params]);

  useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="사진 찍기" />
        <Header.Icon iconName="close" onPress={() => navigation.goBack()} />
      </Header>
      <View style={{flex: 1}}>
        <View style={{flex: 2}}>
          {device && (
            <Camera
              ref={cameraRef}
              style={{flex: 1}}
              device={device}
              isActive={true}
              photo
            />
          )}
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <CustomButton onPress={onPressTakePhoto}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: 'white',
                }}
              />
            </View>
          </CustomButton>
        </View>
      </View>
    </View>
  );
}
