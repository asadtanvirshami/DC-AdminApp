import React from 'react';

import { Avatar, Card} from 'antd';

const { Meta } = Card;

const CardMD = ({title, description, avatar}) => {

  return (
    <>
      <Card
        style={{
          width: 300,
          marginTop: 16,
        }}
      >
        <Meta
          avatar={<Avatar src={avatar} />}
          title={title}
          description={description}
        />
      </Card>
    </>
  );
};
export default CardMD;