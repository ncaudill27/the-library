import React from 'react';

const Avatar = ({showing, avatar}) => <img src={avatar} alt={showing + '\'s avatar'} />;

export default Avatar;