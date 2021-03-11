import React from 'react';

function UserProfile(props) {
  return <h2>{props.id}</h2>;
}

export default UserProfile;

export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;
  console.log('******** run : getServerSideProps');
  return {
    props: {
      id: 'user-id-' + userId,
    },
  };
}
