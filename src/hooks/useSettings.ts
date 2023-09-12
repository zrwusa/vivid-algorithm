import {useContext} from 'react'
import {SettingsContext, SettingsContextValue} from '../context/settingsContext'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext)
