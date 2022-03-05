import createRequest from './index';

export interface Widget {
  name: string;
  displayName: string;
  iconUrl: string;
  defaultSettings: DefaultWidgetSetting[];
  requiresServiceAuth: boolean;
}

export interface DefaultWidgetSetting {
  settingName: string;
  displayName: string;
  defaultValue: string;
  acceptedValues: string[] | null;
}

export interface WidgetPosition {
  area: PositionArea;
  x: number;
  y: number;
}

export enum PositionArea {
  TOP_LEFT,
  TOP_CENTER,
  TOP_RIGHT,
  MIDDLE_LEFT,
  MIDDLE_CENTER,
  MIDDLE_RIGHT,
  BOTTOM_LEFT,
  BOTTOM_CENTER,
  BOTTOM_RIGHT,
}

export interface WidgetPositions {
  [widgetName: string]: WidgetPosition;
}

export interface UpdateWidgetPositionForm extends WidgetPosition {
  widgetName: string;
}

export interface WidgetSetting {
  settingName: string;
  value: string;
}

export interface WidgetSettings {
  [widgetName: string]: WidgetSetting[];
}

export interface UpdateWidgetSettingForm extends WidgetSetting {
  widgetName: string;
}

export async function getWidgets(): Promise<Widget[]> {
  const response = await createRequest('widgets');
  return await response.json();
}

export async function getPositions(): Promise<WidgetPositions> {
  const response = await createRequest('widgets/positions');
  return await response.json();
}

export async function updatePosition(
  updateWidgetPositionForm: UpdateWidgetPositionForm
): Promise<WidgetPosition> {
  const response = await createRequest(
    `widgets/positions/update/${updateWidgetPositionForm.widgetName}`,
    'POST',
    updateWidgetPositionForm
  );
  return await response.json();
}

export async function getSettings(): Promise<WidgetSettings> {
  const response = await createRequest('widgets/settings');
  return await response.json();
}

export async function updateSetting(
  updateWidgetSettingForm: UpdateWidgetSettingForm
): Promise<WidgetSetting> {
  const response = await createRequest(
    `widgets/settings/update/${updateWidgetSettingForm.widgetName}`,
    'POST',
    updateWidgetSettingForm
  );
  return await response.json();
}
