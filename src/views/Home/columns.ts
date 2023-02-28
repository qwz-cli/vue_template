interface Props {
  onEmit:(v:{})=>void
  onDelete:(v:{})=>void
}
export default function (props:Props): columnsType[] {
  return [
    {
      label: "#",
      name: "index",
      tableItem: {
        width: 50,
      },
    },
    {
      label: "名称",
      name: "name",
      tableItem: {
        width: 100,
      },
      formItem:{
        type:'text'
      }
    },
    {
      label: "时间",
      name: "date",
      tableItem: {},
    },
    {
      label: "地址",
      name: "address",
    },
    {
      label: "政治状态",
      name: "politics_status",
      tableItem:{},
      formItem: {
          type: 'select',
          placeholder: '请选择身份',
          options: [
              {
                  label: '群众',
                  value: 0
              },
              {
                  label: '团员',
                  value: 1
              },
              {
                  label: '党员',
                  value: 2
              },
          ]
      }

  },
    {
      label: "操作",
      name: "",
      tableItem: {
        type: "button",
        buttons: [
          {
            name: "编辑",
            event: props.onEmit,
            type: "primary",
            size: "small",
          },
          {
            name: "删除",
            event: props.onDelete,
            type: "danger",
            size: "small",
          },
        ],
      },
    },
  ]
}
