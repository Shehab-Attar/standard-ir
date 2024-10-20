import React, { useEffect, useState } from 'react';

const ArgaamReportsDetailsPage = ({ articleID }) => {
  const [articleContent, setArticleContent] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Simulate fetching data (replace with actual API call)
        const response = await fetch(`https://data-ir.argaam.com/articles/${articleID}`);
        const data = await response.json();
        setArticleContent(data.body);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [articleID]);

  return (
    <div dangerouslySetInnerHTML={{ __html: articleContent }} />
  );
};

export default ArgaamReportsDetailsPage;
