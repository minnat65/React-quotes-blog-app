import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList'

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';

const Comments = () => {
  const params = useParams();
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { quoteId } = params;
  const { sendRequest, status, data: loadedComments, error } = useHttp(getAllComments, true);


  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  let comments;
  if (status === 'pending') {
    comments = <div className='centered'>
      <LoadingSpinner />
    </div>
  }

  if(error){
    console.log(error);
  }

  if (status === 'completed' && loadedComments) {
    comments = <CommentsList comments={loadedComments} />
  }

  if (status === 'completed' && !loadedComments) {
    comments = <p className='centered'></p>
  }

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const commentAddHandler = useCallback (() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId])

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddComment={commentAddHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
