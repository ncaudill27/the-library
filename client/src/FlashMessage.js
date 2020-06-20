import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFlash } from '../actions/messages';

function FlashMessage({message, removeFlash}) {

  const dispatch = useDispatch();

  const close = () => dispatch(removeFlash);
  
  return (
    <div className={'Flash'}>
      <h3>{message}</h3>
      <button onClick={close}>OK</button>
    </div>
  )
}

const mapStateToProps = ({flash}) => ({message: flash.message});


export default connect(mapStateToProps, { removeFlash })(FlashMessage);