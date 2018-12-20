import { Form, Input, Radio, Select, Checkbox, Button, DatePicker, message, Upload, Icon } from "antd";
import * as React from "react";
import { ROOT_API_URL } from "../../app/constants";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 }
  }
};

export const tailFormItemLayout = {
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
export const renderFieldFile: React.StatelessComponent<any> = ({
  input,
  label,
  accept,
  uploadId,
  meta: { touched, error, warning, invalid },
}) => {
  const hasError = touched && invalid;

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  } 
  const props = {
    name: 'file', 
    action: `${ROOT_API_URL}/simulators/upload`,
    accept: accept ,
    data : {uploadId}, 
    onChange(info) {
      console.log(info);
      
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        input.onChange(normFile(info));

      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        input.onChange(normFile(undefined));

      }

    },
  };
  return (
    <Form.Item
      {...tailFormItemLayout}
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasError}
      help={hasError && error}

    >

      <Upload  {...props}>
        <Button>
          <Icon type="upload" /> Upload Simulator Docker file .tar
        </Button>
      </Upload>
    </Form.Item>
  );

}

export const AInput = makeField(Input);
export const ARadioGroup = makeField(RadioGroup);
export const ASelect = makeField(Select);
export const ACheckbox = makeField(Checkbox);
export const ATextarea = makeField(TextArea);
export const ARangePicker = makeField(RangePicker);
