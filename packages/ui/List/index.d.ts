import * as React from "react";
import "./index.scss";
export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    variant?: "default" | "inset";
    children: React.ReactNode;
}
export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    icon?: React.ReactNode;
    title: string;
    subtitle?: string;
    rightContent?: React.ReactNode;
    chevron?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}
declare const List: React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLDivElement>>;
declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLDivElement>>;
export { List, ListItem };
export default List;
