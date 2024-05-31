import type { ThemeConfig } from 'antd';

 const theme: ThemeConfig = {
    token: {
        fontSize: 16,
        // colorPrimary: "#52c21a",
    },
    components: {
        Layout: {
          //headerBg: "rgb(25, 115, 199)",
          headerHeight: 48,
          headerPadding: "0 0",     
          "headerColor": "#EFF6FC"
        },
        "Menu": {
            "darkItemBg": "rgb(22, 119, 255)",
            // "itemBg": "rgb(25, 115, 199)"
          }
      }
};

export default theme;