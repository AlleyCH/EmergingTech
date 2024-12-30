import React from 'react';
import { gql, useMutation } from '@apollo/client';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import "./entryform.css"

const ADD_PROMPT = gql`
  mutation AddPrompt(
    $chatId: String!,
    $prompt: String!,
    $response: String!,
    $createdAt: String!,
    $chatTitle: String!,
    $upVotes: Int!,
    $downVotes: Int!
  ) {
    addPrompt(
      chatId: $chatId,
      prompt: $prompt,
      response: $response,
      createdAt: $createdAt,
      chatTitle: $chatTitle,
      upVotes: $upVotes,
      downVotes: $downVotes
    ) {
      chatId
    }
  }
`;
const AddPrompt = () => {
  //
  let navigate = useNavigate()
  //
  let chatId, prompt, response, createdAt, chatTitle, upVotes, downVotes;
  const [addPrompt, { data, loading, error }] = useMutation(ADD_PROMPT);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="entryform">
    <form
    onSubmit={ (e) => {
      e.preventDefault();
      try {
        addPrompt({
          variables: {
            chatId: chatId.value,
            prompt: prompt.value,
            response: response.value,
            createdAt: createdAt.value, 
            chatTitle: chatTitle.value,
            upVotes: parseInt(upVotes.value),
            downVotes: parseInt(downVotes.value),
          },            
        });
    
        // Clear input fields
        chatId.value = '';
        prompt.value = '';
        response.value = '';
        createdAt.value = '';
        chatTitle.value = '';
        upVotes.value = '';
        downVotes.value = '';
    
        // Navigate to the prompt list page after successful submission
        navigate('/promptlist');
      } catch (error) {
        // Handle error, you might want to log it or show a user-friendly message
        console.error(error);
      }
    }}
    
      >
<Form.Group>
  <Form.Label> Chat ID:</Form.Label>
  <Form.Control type="text" name="chatId" ref={(node) => (chatId = node)} placeholder="Chat ID:" />
</Form.Group>

<Form.Group>
  <Form.Label> Prompt:</Form.Label>
  <Form.Control type="text" name="prompt" ref={(node) => (prompt = node)} placeholder="Prompt:" />
</Form.Group>

<Form.Group>
  <Form.Label> Response:</Form.Label>
  <Form.Control type="text" name="response" ref={(node) => (response = node)} placeholder="Response:" />
</Form.Group>

<Form.Group>
  <Form.Label> Created At:</Form.Label>
  <Form.Control type="text" name="createdAt" ref={(node) => (createdAt = node)} placeholder="Date:" />
</Form.Group>

<Form.Group>
  <Form.Label> Chat Title:</Form.Label>
  <Form.Control type="text" name="chatTitle" ref={(node) => (chatTitle = node)} placeholder="Chat Title:" />
</Form.Group>

<Form.Group>
  <Form.Label> Up Vote:</Form.Label>
  <Form.Control type="text" name="upVotes" ref={(node) => (upVotes = node)} placeholder="Up Vote:" />
</Form.Group>

<Form.Group>
  <Form.Label> Down Vote:</Form.Label>
  <Form.Control type="text" name="downVotes" ref={(node) => (downVotes = node)} placeholder="Down Vote:" />
</Form.Group>       

        <Button variant="primary" type="submit">
          Add Prompt
        </Button>
      </form>
    </div>
  );
};

export default AddPrompt;
