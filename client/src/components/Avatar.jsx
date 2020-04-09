import React from 'react';

const Avatar = ({username, avatar}) => <img src={avatar} alt={username + '\'s avatar'} />;

export default Avatar;