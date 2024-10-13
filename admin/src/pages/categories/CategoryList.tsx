import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, message, Card, Row, Col } from 'antd';

const { Meta } = Card;

type Category = {
  id: number;
  name: string;
  parent_id: number | null;
  haschildren: string;
  image_urls: string[];  // Assuming this comes from the backend
};

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch the category data when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/mv/categories');
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories", error);
        message.error("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      
      <Row gutter={[16, 16]}>
        {categories.map((category) => (
          <Col key={category.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                category.image_urls.length > 0 ? (
                  <img
                    alt={category.name}
                    src={category.image_urls[0]}  // Display the first image as the cover
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ height: 200, backgroundColor: '#f0f0f0' }}></div>
                )
              }
            >
              <Meta title={category.name} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CategoryList;
