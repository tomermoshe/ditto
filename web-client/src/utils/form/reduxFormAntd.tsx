import { Form, Input, Radio, Select, Checkbox, Button, DatePicker } from "antd";
import * as React from "react";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;


const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 }
    } ,
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 }
    }
  };
  
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 14,
        offset: 6
      }
    }
  };
  
  const makeField = Component => ({ input, meta, children, hasFeedback, label, ...rest }) => {
          const hasError = meta.touched && meta.invalid;
          return (
            <Form.Item
              {...formItemLayout}
              label={label}
              validateStatus={hasError ? "error" : "success"}
              hasFeedback={hasError}
              help={hasError && meta.error}
            >
              <Component {...input} {...rest} children={children} />
            </Form.Item>
          );
  };
        

export const AInput = makeField(Input);
export const ARadioGroup = makeField(RadioGroup);
export const ASelect = makeField(Select);
export const ACheckbox = makeField(Checkbox);
export const ATextarea = makeField(TextArea);
export const ARangePicker = makeField(RangePicker);
