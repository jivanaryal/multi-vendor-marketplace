import { Button, Form, Input, TreeSelect, message, Spin, Upload, Modal } from "antd";
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
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState<string>("");

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

  // Handle preview logic
  const handlePreview = async (file: any) => {
    setPreviewImage(file.thumbUrl || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const onFinish = async (values: { name: string }) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('parent_id', value || '');

    if (fileList.length > 0) {
      fileList.forEach((file) => formData.append('images', file.originFileObj));
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/mv/categories', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success("Category added successfully!");
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Error occurred while adding the category");
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: any) => {
    // Generate preview using FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileList((prevList) => [...prevList, { ...file, thumbUrl: e.target?.result }]);
    };
    reader.readAsDataURL(file);
    return false; // Prevent automatic upload
  };

  return (
    <main style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ background: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: 'Please enter the category name' }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item label="Select Parent Category" name="parent_id">
          <TreeSelect
            treeDefaultExpandAll={false}
            allowClear
            showSearch
            style={{ width: "100%" }}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Select a parent category (optional)"
            onChange={onChange}
            loadData={onLoadData}
            treeData={categories}
          />
        </Form.Item>

        <Form.Item label="Upload Image">
          <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onRemove={(file) => setFileList(fileList.filter((f) => f.uid !== file.uid))}
            onPreview={handlePreview} // Handle image preview
          >
            {fileList.length < 1 && <UploadOutlined />}
          </Upload>
        </Form.Item>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: "100%" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

export default CreateCategory;
