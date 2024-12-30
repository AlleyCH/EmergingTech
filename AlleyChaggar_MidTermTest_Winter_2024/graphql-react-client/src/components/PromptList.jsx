import React from 'react';
import {gql, useQuery, useMutation} from "@apollo/client";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const GET_PROMPTS = gql`
  {
    prompts {
      chatId
      prompt
      response
      createdAt
      chatTitle
      upVotes
      downVotes
    }
  }
`;

const DELETE_PROMPT = gql`
  mutation DeletePrompt($chatId: String!) {
    deletePrompt(chatId: $chatId) {
      chatId
    }
  }
`;

function PromptList () {
  const { loading, error, data, refetch } = useQuery(GET_PROMPTS);
  const [deletePrompt] = useMutation(DELETE_PROMPT);  

  const handleDelete = async (chatId) => {
    try {      
      await deletePrompt({
        variables: { chatId },
      });
      
      refetch();
    } catch (error) {
      console.error('Error deleting prompt:', error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Chat ID</th>
            <th>Prompt</th>
            <th>Response</th>
            <th>Created At</th>
            <th>Chat Title</th>
            <th>UpVote</th>
            <th>DownVote</th>            
          </tr>
          {data.prompts.map((prompt) => (
            <tr key={prompt.chatId}>
              <td>{prompt.chatId}</td>
              <td>{prompt.prompt}</td>
              <td>{prompt.response}</td>
              <td>{prompt.createdAt}</td>
              <td>{prompt.chatTitle}</td>
              <td>{prompt.upVotes}</td>
              <td>{prompt.downVotes}</td>
              <td>
                <Button onClick={() => handleDelete(prompt.chatId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </thead>
      </Table>

      <div className="center">
        <Button className="center" onClick={() => refetch()}>
          Refetch
        </Button>
      </div>
    </div>
  );
};

export default PromptList;