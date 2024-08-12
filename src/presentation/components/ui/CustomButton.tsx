import { Button } from "@ui-kitten/components";
import React from "react";
interface Props {
  title: string;
}
export const CustomButton = ({ title }: Props) => {
  return <Button>{title}</Button>;
};
