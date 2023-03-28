// import React, { Component } from 'react';
import { useState } from 'react';
import Container from './Container/Container';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';


const opts = ['good', 'neutral', 'bad'];

export default function App() {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  

  const onLeaveFeed = e => {
    const value = e.target.value;

    switch (value) {
      case opts[0]:
        return setGood(prev => prev + 1);
      case opts[1]:
        return setNeutral(prev => prev + 1);
      case opts[2]:
        return setBad(prev => prev + 1);
      default:
        return;
    }
  };

const countTotalFeedback = () => {
  return [good, neutral, bad].reduce((acc, value) => {
    return acc + value;
  }, 0);
};

 const countPositiveFeedbackPercentage = () => {
   const percentage = Math.round((good / countTotalFeedback()) * 100);
   return percentage;
 };
    
  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={opts}
          onLeaveFeedback={onLeaveFeed}
        ></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </Container>
  );
}