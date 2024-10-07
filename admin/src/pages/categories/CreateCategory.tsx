import { Form, Input, Button, Select } from 'antd';
import { Option } from 'antd/es/mentions';
const CreateCategory = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
    }

  return (
      <Form form={form} onFinish={onFinish} className=''>
          <Form.Item name="name" label="category name" rules={[{ required: true }]}>
              <Input />
          </Form.Item>
          <Form.Item
              name="parent_id"
              label="parent category"
              rules={[
                  {
                      required:false,
                  }
              ]}
          
          
          >
              <Select
                  placeholder="select a parent category"
                
              >
                  
         <Option value="">null</Option>
         <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
                  
              </Select>
              
             </Form.Item>
           <Button type="primary" className='w-fit' htmlType="submit">
          Submit
        </Button>
          
     </Form>
  )
}

export default CreateCategory