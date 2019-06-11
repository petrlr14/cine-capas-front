import React from 'react';
import {Form, FormGroup, Label, Input} from "reactstrap";

export const LoginPage = (props) => {
    return (
        <Form>
            <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" name="username" id="username" placeholder="Username" />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Password" />
            </FormGroup>
        </Form>
    );
};