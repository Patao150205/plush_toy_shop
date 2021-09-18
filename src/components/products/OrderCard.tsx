import React, { FC, useState } from "react";
import ConfirmationCard from "components/settlement/ConfirmationCard";
import { Divider, Modal, Button } from "semantic-ui-react";
import style from "./OrderCard.module.scss";
import { Address } from "../../../pages/products/order";
import AddressTable from "components/address/AddressTable";
import { changeOrderStatus } from "utils/products";

type Props = {
  orderProps: {
    order: {
      user: {
        _id: string;
        nickname: string;
        email: string;
        role: "root" | "user";
        isShorthandEmail: boolean;
      };
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
      _id: string;
    };
    address: Address;
  };
};

const OrderCard: FC<Props> = ({ orderProps }) => {
  const { order, address } = orderProps;

  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [status, setStatus] = useState(orderProps.order.status);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "noSent" | "sent";
    const res = await changeOrderStatus(order._id, value);
    if (!res.err) {
      setStatus(value);
    }
  };

  return (
    <>
      <p>注文者: {address.lastname + " " + address.firstname}</p>
      <p>注文日: {new Date(order.createdAt).toLocaleString()}</p>
      <p>Email: {order.user.email}</p>
      <div>
        <label>
          商品状態: &nbsp;
          <select value={status} className="u-text--emphasis" onChange={handleChange}>
            <option value="noSent">発送準備中</option>
            <option value="sent">発送済み</option>
          </select>
        </label>
      </div>
      <div className={style.btnWrapper}>
        <div className={"module-spacer--sm"} />
        <Modal
          onClose={() => setIsOpenAddress(false)}
          onOpen={() => setIsOpenAddress(true)}
          open={isOpenAddress}
          style={{ marginTop: "20vh" }}
          trigger={<Button>発送先住所</Button>}>
          <Modal.Header>{order.user.nickname}の住所</Modal.Header>
          <Modal.Content style={{ height: "50vh" }} scrolling>
            <AddressTable address={address} />
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="確認"
              labelPosition="right"
              icon="checkmark"
              onClick={() => setIsOpenAddress(false)}
              positive
            />
          </Modal.Actions>
        </Modal>

        <div className={"module-spacer--sm"} />

        <Modal
          onClose={() => setIsOpenDetail(false)}
          onOpen={() => setIsOpenDetail(true)}
          open={isOpenDetail}
          style={{ marginTop: "20vh" }}
          trigger={<Button>発注された商品</Button>}>
          <Modal.Header>{new Date(order.createdAt).toLocaleString()}の注文履歴</Modal.Header>
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
      </div>
      <div className={"module-spacer--sm"} />
      <Divider />
    </>
  );
};

export default OrderCard;
