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

    const intervalId = setInterval(() => dispatch(requestSpotify()), 3000);
    return () => clearInterval(intervalId);
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

  const right = position.area.endsWith('RIGHT');
  const imageUrl = spotify?.item?.album?.images[0]?.url;

  return (
    <Widget
      widget={widget}
      position={position}
      getAreaElement={getAreaElement}
      edit={edit}
    >
      {(spotify?.isPlaying || edit) && (
        <div className={`text-white ${right ? 'text-right' : ''}`}>
          <p className="text-gray-500 text-base">
            {deviceLabel.replace('%device%', spotify?.device?.name ?? 'Device')}
          </p>
          <div className={`flex justify-${right ? 'end' : 'start'}`}>
            {imageUrl ? (
              <img
                className="w-36 h-36 mt-1"
                draggable={false}
                src={imageUrl}
                alt=""
              />
            ) : (
              <div className="w-36 h-36 mt-1 bg-gray-500" />
            )}
          </div>
          <p className="text-2xl">{spotify?.item?.name ?? 'Name'}</p>
          <p className="text-lg">
            {spotify?.item?.artists?.map(artist => artist.name).join(', ') ??
              'Artist'}
          </p>
        </div>
      )}
    </Widget>
  );
};

export default SpotifyWidget;
