'use-client';

import { IconType } from "react-icons";

interface ButtonProps{
    label:string;
    onClick:(e:React.MouseEvent<HTMLBodyElement>) => void;
    disabled?:boolean;
    outline?:boolean;
    small?:boolean;
    icon?:IconType;
}

const Button:React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon
}) => {
  return (
    <button title="button"></button>
  )
}

export default Button