// !弹窗组件约束
interface AlertPropsType {
  title: string; // 提示
  type: "hint" | "form"; // 弹窗类型
  show: boolean; // 显示弹窗
  hint?: string; // 提示内容
  isButton?: boolean; // 显示按钮
  form?:{
    data: any; // 数据
    columns: columnsType[]; // 表单内容
    rules?:Rules
  }
}

// !列：每一项
interface columnsType {
  label: string;
  name: string;
  formItem: {
    type: "text";
  };
}


// ? 表单检验
interface Rules {
  [key: string]: {
    validator: (rule: any, value: any, callback: any) => void;
    trigger: "blur"|'change';
  }[];
  
}
