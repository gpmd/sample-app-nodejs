export interface FormData {
    description: string;
    isVisible: boolean;
    name: string;
    price: number;
    type: string;
}

export interface TableItem {
    id: number;
    uuid: number;
    name: string;
    template_file: string;
    price: number;
    stock: number;
}

export interface WidgetTableItem {
  uuid: number;
  template_file: string;
}

export interface ListItem extends FormData {
    id: number;
}

export interface StringKeyValue {
    [key: string]: string;
}
