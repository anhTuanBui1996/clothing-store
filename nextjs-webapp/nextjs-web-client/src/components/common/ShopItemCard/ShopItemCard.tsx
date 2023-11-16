import React from "react";
import { Card } from "react-bootstrap";
import ButtonCustom from "../ButtonCustom/ButtonCustom";

export default function ShopItemCard({
  imgSrc,
  title,
  priceString,
  noBorder = false,
}: {
  imgSrc?: string;
  title: string;
  priceString: string;
  noBorder?: boolean;
}) {
  return (
    <Card
      className={`shop-item-card max-w-[280px] m-auto pb-2${
        noBorder ? " border-0" : ""
      }`}
    >
      <Card.Img src={imgSrc ? imgSrc : "/images/suit-thumbnail.svg"} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{priceString}</Card.Text>
      </Card.Body>
      <ButtonCustom className="px-4 py-3 mx-auto" isOutline>
        BUY NOW
      </ButtonCustom>
    </Card>
  );
}
