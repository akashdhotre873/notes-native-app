import {
  colorType,
  newContentIconPosition,
  settingTypes,
  timeFormats,
} from '../helpers/constants';

const settings = {
  [settingTypes.TIME_FORMAT]: timeFormats[0].format,
  [settingTypes.NEW_CONTENT_ICON_POSITION]: newContentIconPosition.RIGHT,
  [settingTypes.COLORS]: {
    [colorType.PRIMARY_COLOR]: '#006efe',
    [colorType.LOCKED_COLOR]: '#fe9a03',
    [colorType.UNLOCKED_COLOR]: '#01eb00',
    [colorType.SETTING_BOX_BORDER_Color]: 'grey',
    [colorType.SETTING_BOX_BACKGROUND_Color]: 'white',
    [colorType.NEW_CONTENT_ICON_COLOR]: '#006efe',
    [colorType.ICON_PRIMARY_COLOR]: 'black',
    [colorType.HEADER_TEXT_COLOR]: 'black',
  },
};
