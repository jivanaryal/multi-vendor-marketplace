import { Button, Form, Input, TreeSelect, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState();
  const [form] = Form.useForm();  // Initialize form

  const onChange = (newValue) => {
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
  const transformToTreeData = (categoryList) => {
    return categoryList.map((category) => ({
      title: category.name,
      value: category.id,
      key: category.id,
      isLeaf: category.haschildren === 'false', // If no children, mark as leaf
    }));
  };

  const loadSubCategories = async (parentCategoryId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/mv/categories/${parentCategoryId}`);
      return transformToTreeData(res.data);
    } catch (error) {
      console.error('Error fetching the subcategories', error);
      return [];
    }
  };

  // Recursively update categories with their children
  const updateCategoryChildren = (categories, key, subCategories) => {
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

  const onLoadData = async (treeNode) => {
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
  const onFinish = async (values) => {
    try {
      // Send POST request to the backend
      const response = await axios.post('http://localhost:5000/api/mv/categories', {
        name: values.name, // Category name
        parent_id: value || null, // Parent category ID
      });

      // Show success message
      message.success('Category created successfully!');
      form.resetFields();  // Reset the form after successful submission
      setValue(null);      // Reset selected parent category

    } catch (error) {
      console.error('Error submitting the form:', error);
      message.error('Failed to create category. Please try again.');
    }
  };

  return (
    <main>
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </main>
  );
};

export default CreateCategory;
