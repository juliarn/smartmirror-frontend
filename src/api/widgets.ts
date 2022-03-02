import createRequest from './index';

export interface Widget {
  name: string;
  defaultSettings: DefaultWidgetSetting[];
  requiresServiceAuth: boolean;
}

export interface DefaultWidgetSetting {
  settingName: string;
  defaultValue: string;
  acceptedValues: string[];
}

export interface WidgetPosition {
  area: string;
  x: number;
  y: number;
}

export type WidgetPositions = Map<string, WidgetPosition>;

export interface UpdateWidgetPositionForm extends WidgetPosition {
  widgetName: string;
}

export interface WidgetSetting {
  name: string;
  value: string;
}

export type WidgetSettings = Map<string, WidgetSetting[]>;

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
): Promise<void> {
  await createRequest(
    `widgets/positions/update/${updateWidgetPositionForm.widgetName}`,
    'POST',
    updateWidgetPositionForm
  );
}

export async function getSettings(): Promise<WidgetSettings> {
  const response = await createRequest('widgets/settings');
  return await response.json();
}

export async function updateSetting(
  updateWidgetSettingsForm: UpdateWidgetPositionForm
): Promise<void> {
  const response = await createRequest(
    `widgets/settings/update/${updateWidgetSettingsForm.widgetName}`,
    'POST',
    updateWidgetSettingsForm
  );
  return await response.json();
}
