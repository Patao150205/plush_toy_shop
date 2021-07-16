import React, { FC } from "react";
import { AddressData } from "utils/address";
import { Table } from "semantic-ui-react";

const AddressTable: FC<{ address: AddressData }> = ({ address }) => {
  const { building, city, firstname, lastname, phoneNumber, postcord, prefecture, streetAddress } = address;

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={10}>項目名</Table.HeaderCell>
          <Table.HeaderCell width="six">情報</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell>姓</Table.Cell>
          <Table.Cell>{lastname}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>名</Table.Cell>
          <Table.Cell>{firstname}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>電話番号</Table.Cell>
          <Table.Cell>{phoneNumber}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>郵便番号</Table.Cell>
          <Table.Cell>{postcord}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>都道府県</Table.Cell>
          <Table.Cell>{prefecture}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>市区町村</Table.Cell>
          <Table.Cell>{city}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>番地</Table.Cell>
          <Table.Cell>{streetAddress}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>建物名・マンション名・部屋番号</Table.Cell>
          <Table.Cell>{streetAddress}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default AddressTable;
