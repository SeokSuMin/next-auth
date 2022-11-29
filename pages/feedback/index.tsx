import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Fragment, useState } from 'react';
import { IHomePageProps } from '..';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

interface IFeedbaackPageProps {
  feedbackItems: IHomePageProps[];
}

const FeedbaackPage = ({ feedbackItems }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [feedbackData, setFeedbackData] = useState<IHomePageProps>();

  const loadFeedbackHandler = (id: number) => {
    fetch('/api/feedback/' + id)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback));
  };

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => loadFeedbackHandler(item.id)}>Show Detail</button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<IFeedbaackPageProps> = async (context) => {
  const filepath = buildFeedbackPath();
  const data = extractFeedback(filepath);
  return {
    props: {
      feedbackItems: data,
    },
  };
};

export default FeedbaackPage;
