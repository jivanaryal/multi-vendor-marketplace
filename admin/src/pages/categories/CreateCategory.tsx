import { Button, Form, Input, TreeSelect, message, Spin, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { UploadOutlined } from '@ant-design/icons';

type CategoryTypes = {
  id: number;
  name: string;
  parent_id: number | null;
  haschildren: string;
};

type TreeNode = {
  title: string;
  value: number;
  key: number;
  isLeaf: boolean;
  children?: TreeNode[];
};

const CreateCategory = () => {
  const [categories, setCategories] = useState<TreeNode[]>([]);
  const [value, setValue] = useState<number | undefined>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const onChange = (newValue: number) => setValue(newValue);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get("http://localhost:5000/api/mv/categories/parent");
      setCategories(transformToTreeData(res.data));
    };
    fetchCategory();
  }, []);

  const transformToTreeData = (categoryList: CategoryTypes[]): TreeNode[] => {
    return categoryList.map((category: CategoryTypes) => ({
      title: category.name,
      value: category.id,
      key: category.id,
      isLeaf: category.haschildren === 'false',
    }));
  };

  const loadSubCategories = async (parentCategoryId: number): Promise<TreeNode[]> => {
    try {
      const res = await axios.get(`http://localhost:5000/api/mv/categories/${parentCategoryId}`);
      return transformToTreeData(res.data);
    } catch (error) {
      console.error('Error fetching the subcategories', error);
      return [];
    }
  };

  const updateCategoryChildren = (categories: TreeNode[], key: number, subCategories: TreeNode[]): TreeNode[] => {
    return categories.map((category) => {
      if (category.key === key) {
        return {
          ...category,
          children: subCategories,
        };
      } else if (category.children) {
        return {
          ...category,
          children: updateCategoryChildren(category.children, key, subCategories),
        };
      }
      return category;
    });
  };

  const onLoadData = async (treeNode: any) => {
    const { key, children } = treeNode;
    if (children) return;
    const subCategories = await loadSubCategories(key);
    setCategories((prevCategories) => updateCategoryChildren(prevCategories, key, subCategories));
  };

  const onFinish = async (values: { name: string }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('parent_id', value || null);


     console.log('Before adding images:');
for (let [key, value] of formData.entries()) {
  console.log(key, value);  // Log the key and value pairs
}
      fileList.forEach(file => formData.append('images', file));

      console.log('After adding images:');
for (let [key, value] of formData.entries()) {
  console.log(key, value);  // Log key-value pairs after adding files
}

    

      const response = await axios.post('http://localhost:5000/api/mv/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        message.success("Category created successfully");
        form.resetFields();
        setValue(undefined);
        setFileList([]);
        setCategories((prevCategories) => [...prevCategories, response.data.result]);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      message.error(error.response?.data?.message || 'Failed to create category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: 'Please enter the category name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Select Parent Category" name="parent_id">
          <TreeSelect
            treeDefaultExpandAll={false}
            allowClear
            showSearch
            style={{ width: "100%" }}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            onChange={onChange}
            loadData={onLoadData}
            treeData={categories}
          />
        </Form.Item>
        <Form.Item label="Upload Images">
          <Upload
            fileList={fileList}
            beforeUpload={(file) => {
              setFileList((prev) => [...prev, file]);
              return false;
            }}
            onRemove={(file) => {
              setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
            }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </main>
  );
};

export default CreateCategory;
