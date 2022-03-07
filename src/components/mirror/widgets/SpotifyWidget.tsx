import React, {useEffect, useState} from 'react';
import Widget, {WidgetSettingsProps} from '../Widget';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {requestSpotify} from '../../../store/spotifySlice';

const SpotifyWidget = ({
  widget,
  settings,
  position,
  getAreaElement,
  edit,
}: WidgetSettingsProps) => {
  const [deviceLabel, setDeviceLabel] = useState('');
  const {spotify} = useSelector((state: RootState) => state.spotify);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestSpotify());
  }, []);

  useEffect(() => {
    const deviceLabelSetting = settings.find(
      setting => setting.settingName === 'deviceLabel'
    );

    if (deviceLabelSetting) {
      setDeviceLabel(deviceLabelSetting.value);
    }
  }, [settings]);

  console.log(spotify);

  return (
    <Widget
      widget={widget}
      position={position}
      getAreaElement={getAreaElement}
      edit={edit}
    >
      <div />
    </Widget>
  );
};

export default SpotifyWidget;
