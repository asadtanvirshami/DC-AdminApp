import React from "react";

import { Avatar, Card } from "antd";
import { HiMiniUserCircle } from "react-icons/hi2";

const { Meta } = Card;

const CardMD = ({ title, description, avatar }) => {
  return (
    <>
      <Card
        style={{
          maxWidth: "100%",
          marginTop: 16,
        }}
      >
        <Meta
          avatar={avatar?<Avatar src={avatar} />:<HiMiniUserCircle color="grey" fontSize={40} />}
          title={title}
          description={description}
        />
      </Card>
    </>
  );
};
export default CardMD;
