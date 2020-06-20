import React from 'react';

function FlashMessage({msg}) {

  const [visible, visibleSet] = useState('');

  const close = () => visibleSet('hidden');
  
  return (
    <div className={'Flash' + visible}>
      <h3>msg</h3>
      <button onClick={close}>OK</button>
    </div>
  )
}