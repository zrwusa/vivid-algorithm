// ** React Imports
import {createContext, ReactNode, useState} from 'react';

// ** MUI Imports
import {PaletteMode} from '@mui/material';

// ** ThemeConfig Import
import themeConfig from '../configs/themeConfig';

// ** Types Import
import {ContentWidth, ThemeColor} from '../layouts/types';

export type Settings = {
  mode: PaletteMode;
  themeColor: ThemeColor;
  contentWidth: ContentWidth;
};

export type SettingsContextValue = {
  settings: Settings;
  saveSettings: (updatedSettings: Settings) => void;
};

const initialSettings: Settings = {
  themeColor: 'primary',
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth
};

// ** Create Context
export const SettingsContext = createContext<SettingsContextValue>({
  saveSettings: () => null,
  settings: initialSettings
});

export const SettingsProvider = ({children}: {children: ReactNode}) => {
  // ** State
  const [settings, setSettings] = useState<Settings>({...initialSettings});

  const saveSettings = (updatedSettings: Settings) => {
    setSettings(updatedSettings);
  };

  return <SettingsContext.Provider value={{settings, saveSettings}}>{children}</SettingsContext.Provider>;
};

export const SettingsConsumer = SettingsContext.Consumer;
