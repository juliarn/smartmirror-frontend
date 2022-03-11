import {BiTimeFive} from 'react-icons/bi';
import {TiWeatherPartlySunny} from 'react-icons/ti';
import {BsSpotify} from 'react-icons/bs';
import {IconType} from 'react-icons';
import {IconBaseProps} from 'react-icons/lib/cjs/iconBase';

interface WidgetIcons {
  [widgetName: string]: IconType;
}

// Mso-Icon is not included in react-icons, needs special handling
const Mso = (props: IconBaseProps): JSX.Element => {
  return (
    <img
      style={{width: props.size, height: props.size}}
      src="https://www.marienschule.com/assets/MSOLogo-84510ebbb836300f53362971b6f5fe13d66642acf46fe82d95e4ee4fb65822b5.svg"
      alt=""
    />
  );
};

export default {
  time: BiTimeFive,
  weather: TiWeatherPartlySunny,
  spotify: BsSpotify,
  mso: Mso,
} as WidgetIcons;
