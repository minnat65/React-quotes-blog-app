import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api'
import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {

  const params = useParams();
  const { quoteId } = params;
  const commentTextRef = useRef();
  const {sendRequest, status, error} = useHttp(addComment);

  const { onAddComment } = props;

  useEffect( () => {
    if(status==='completed' && !error){
      onAddComment();
    }
  }, [status, error, onAddComment])
  
  const submitFormHandler = (event) => {
    event.preventDefault();

    const commentData = commentTextRef.current.value;
    const comment = {
      commentData,
      quoteId
    }
    
    sendRequest(comment);
    
    // optional: Could validate here

    // send comment to server
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
