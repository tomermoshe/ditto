import * as React from "react";
import { Button, Row, Col, Switch, Popconfirm } from 'antd';

import { EnvTitleMenu } from "./EnvTitleMenu";
import { EnvironmentJSON } from "ditto-shared";
const EnvTitleButton = EnvTitleMenu(Button);
const EnvTitleSwitch = EnvTitleMenu(Switch);

interface Props {
    environment: EnvironmentJSON;
    onEdit: (e: any) => any;
    onDelete: (e: any) => any;
    selected: boolean | undefined;
    onSwitchEnvironment: (environment: EnvironmentJSON) => any;
}

export const EnvironmentCardTitle = (props: Props) => {
    const { environment } = props;
    return (
        <Row type="flex" align="middle" justify="space-between">

            <Col>{environment.name}</Col>
            <Col>
                <Row type="flex" align="middle" justify="end">
                    <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={() => props.onDelete(environment._id)}>
                        <EnvTitleButton icon="delete" type="danger" />
                    </Popconfirm>
                    <EnvTitleButton icon="form" onClick={props.onEdit} />
                    <EnvTitleSwitch
                        size="small"
                        onChange={props.onSwitchEnvironment(environment)}
                        checked={props.selected}
                    />

                </Row>
            </Col>
        </Row>
    )
}



