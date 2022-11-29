import React, { useRef, useState } from 'react';

export interface IHomePageProps {
  id: number;
  email: string;
  text: string;
}

const HomePage = () => {
  const [feedbackItems, setFeedbackItems] = useState<IHomePageProps[]>([]);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const enteredEmail = emailInputRef?.current?.value;
    const enteredFeedback = feedbackInputRef?.current?.value;
    if (enteredEmail && enteredFeedback) {
      const reqBody = { email: enteredEmail, text: enteredFeedback };
      fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => console.log);
    }
  };

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => setFeedbackItems(data.feedback));
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1>The Home Page</h1>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows={5} ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;
