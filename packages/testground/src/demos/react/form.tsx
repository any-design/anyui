import { useRef, useState } from 'react';
import { Button, Form, FormItem, Input } from '@any-design/anyui-react';

const rules = {
  text: [{ required: true, message: 'Please input text' }],
};

const inlineRules = {
  text1: [{ required: true, message: 'Please input text' }],
  text2: [{ required: true, message: 'Please input text' }],
};

export default function FormDemo() {
  const formRef = useRef<any>(null);
  const inlineFormRef = useRef<any>(null);
  const [formData, setFormData] = useState({ text: '' });
  const [inlineFormData, setInlineFormData] = useState({ text1: '', text2: '' });
  return (
    <div>
      <div className="demo-block">
        <div className="demo-block__label">Basic Form</div>
        <Form ref={formRef} modelValue={formData} rules={rules}>
          <FormItem prop="text" label="Label">
            <Input
              modelValue={formData.text}
              onUpdateModelValue={(text: string) => setFormData({ text })}
            />
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={() => formRef.current?.validate()}>
              Submit
            </Button>
          </FormItem>
        </Form>
      </div>
      <div className="demo-block">
        <div className="demo-block__label">Inline Form</div>
        <Form ref={inlineFormRef} modelValue={inlineFormData} rules={inlineRules} layout="inline">
          <FormItem prop="text1" label="Label">
            <Input
              modelValue={inlineFormData.text1}
              onUpdateModelValue={(text1: string) => setInlineFormData((current) => ({ ...current, text1 }))}
            />
          </FormItem>
          <FormItem prop="text2" label="Label">
            <Input
              modelValue={inlineFormData.text2}
              onUpdateModelValue={(text2: string) => setInlineFormData((current) => ({ ...current, text2 }))}
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              fill
              onClick={() => {
                setInlineFormData({ text1: '', text2: '' });
                inlineFormRef.current?.clearFields();
              }}
            >
              Clear
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}
