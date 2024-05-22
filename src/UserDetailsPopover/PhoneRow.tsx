import {PhoneOutlined} from '@ant-design/icons';
import React from 'react';

import {Anchor} from '../Anchor';

import {RowWithLabel} from './RowWithLabel';
import {callToLink} from "./phone";

type PhoneRowProps = {
    phone: string;
};

export function PhoneRow({phone}: PhoneRowProps) {
    return (
        <RowWithLabel label={<PhoneOutlined/>}>
            <Anchor href={callToLink(phone)}>{phone}</Anchor>
        </RowWithLabel>
    );
}
