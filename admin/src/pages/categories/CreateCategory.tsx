import { Button, Form, Input, TreeSelect, message, Spin } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(false); // Loading state for the form submission

  const onChange = (newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get("http://localhost:5000/api/mv/categories/parent");
      setCategories(transformToTreeData(res.data));
    };
    fetchCategory();
  }, []);

  // Transform categories into tree data with proper isLeaf property
  const transformToTreeData = (categoryList: CategoryTypes[]): TreeNode[] => {
    return categoryList.map((category: CategoryTypes) => ({
      title: category.name,
      value: category.id,
      key: category.id,
      isLeaf: category.haschildren === 'false', // If no children, mark as leaf
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

  // Recursively update categories with their children
  const updateCategoryChildren = (categories: TreeNode[], key: number, subCategories: TreeNode[]): TreeNode[] => {
    return categories.map((category) => {
      if (category.key === key) {
        // If the category matches the key, update it with children
        return {
          ...category,
          children: subCategories,
        };
      } else if (category.children) {
        // If the category has children, recursively update them
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

    if (children) {
      return; // If children already loaded, do nothing
    }

    const subCategories = await loadSubCategories(key);

    setCategories((prevCategories) =>
      updateCategoryChildren(prevCategories, key, subCategories)
    );
  };

  // Handle form submission
  const onFinish = async (values: { name: string }) => {
    setLoading(true); // Set loading to true when the form starts submitting
    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:5000/api/mv/categories', {
        name: values.name, // Category name
        parent_id: value || null, // Parent category ID
      });

      console.log(response)

      // Show success message
      if (response.status === 200) {
         message.success("category created sucessfully")
       }

      form.resetFields(); // Reset the form after successful submission
      setValue(undefined); // Reset selected parent category
      setTimeout(() => {
    location.reload();
}, 1000); // Delay of 1 second

    } catch (error) {
      console.error('Error submitting the form:', error);
      message.error('Failed to create category. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after submission is complete
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
        <Form.Item
          label="Select Parent Category"
          name="parent_id"
        >
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
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </main>
  );
};

export default CreateCategory;
