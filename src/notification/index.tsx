import { notification as antdNotification } from 'antd';
import {ArgsProps} from "antd/lib/notification";

export const notification: typeof antdNotification = antdNotification;
export type NotificationArgs = ArgsProps;
