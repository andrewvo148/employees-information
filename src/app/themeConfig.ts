import type { ThemeConfig } from 'antd';

 const theme: ThemeConfig = {
    token: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-seri',
      fontSize: 16,
    },
    components: {
        Layout: {
          //headerBg: "rgb(25, 115, 199)",
          headerHeight: 48,
          headerPadding: "0 0",     
          // headerColor: "#2466E9"
        },
        Menu: {
            //darkItemBg: "rgb(22, 119, 255)",
             //itemBg: "rgb(25, 115, 199)"
             "itemColor": "#869ab8",
             "itemSelectedBg": "#2466E9",
             "itemSelectedColor": "#ffffff",
             "itemHoverBg": "#32405B",
             "itemHoverColor": "#DADDE3",
             "itemHeight": 48,
             "fontSize": 14,
             "iconSize": 18

          },
          "Table": {
            "cellFontSize": 14
          }
      }
};

export default theme;