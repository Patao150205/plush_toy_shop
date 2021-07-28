import React, { FC, useState } from "react";
import ConfirmationCard from "components/settlement/ConfirmationCard";
import { Divider, Modal, Button } from "semantic-ui-react";
import style from "./HistoryCard.module.scss";

type Props = {
  order: {
    user: string;
    createdAt: any;
    products: [
      {
        _id: string;
        productId: string;
        name: string;
        primaryPic: string;
        price: number;
        amount: number;
      }
    ];
    status: "noSent" | "sent";
  };
};

const HistoryCard: FC<Props> = ({ order }) => {
  const { createdAt, products } = order;
  let status;
  switch (order.status) {
    case "noSent":
      status = false;
      break;
    case "sent":
      status = true;
      break;
  }

  const [isOpenDetail, setIsOpenDetail] = useState(false);
  return (
    <>
      <div>
        <p>注文日: {new Date(createdAt).toLocaleString()}</p>
        {status ? (
          <div className={`${style.status} ${style.sent}`}>
            <i className="fas fa-check"></i>発送済み
          </div>
        ) : (
          <div className={`${style.status} ${style.noSent}`}>
            <i className="fas fa-check"></i>発送準備中
          </div>
        )}
        <div className={"module-spacer--sm"} />
        <Modal
          onClose={() => setIsOpenDetail(false)}
          onOpen={() => setIsOpenDetail(true)}
          open={isOpenDetail}
          style={{ marginTop: "20vh" }}
          trigger={<Button>購入履歴の詳細をみる</Button>}>
          <Modal.Header>{new Date(order.createdAt).toLocaleString()}の購入履歴</Modal.Header>
          <Modal.Content style={{ height: "50vh" }} scrolling>
            {order.products.map((prod, i) => (
              <ConfirmationCard key={i} product={prod} amount={prod.amount} />
            ))}
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="確認"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setIsOpenDetail(false)}
              positive
            />
          </Modal.Actions>
        </Modal>
        {isOpenDetail && (
          <>
            {products.map((prod, i) => (
              <ConfirmationCard key={i} product={prod} amount={prod.amount} />
            ))}
          </>
        )}
        <div className={"module-spacer--sm"} />
        <Divider />
      </div>
    </>
  );
};

export default HistoryCard;
