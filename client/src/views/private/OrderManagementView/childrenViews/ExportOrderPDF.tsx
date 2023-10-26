import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

type Props = {
  data: any;
};

// Register Font

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

// Create styles
const styles = StyleSheet.create({
  body: {
    fontFamily: "Roboto",
    fontSize: 10,
    padding: "16px",
  },
  container: {
    minHeight: "100%",
    backgroundColor: "white",
    border: "1px solid #111",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    justifyContent: "space-between",
    padding: 12,
  },
  heading: {
    fontSize: "16px",
    fontWeight: 700,
    textAlign: "center",
    height: "40px",
  },
  textRow: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  table: {
    width: "auto",
    marginBottom: 20,
  },
  tableHead: {
    margin: "auto",
    flexDirection: "row",
    backgroundColor: "#325ca8",
    color: "#EEE",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    borderBottom: "1px solid gray",
  },
  tableCol: {
    width: "25%",
  },
  tableCell: {
    margin: "auto",
    marginVertical: 6,
  },
});

const ExportOrderPDF = ({ data }: Props) => {
  return (
    <Document>
      <Page style={styles.body} size={"A5"}>
        <View style={styles.container}>
          {/* Header */}
          <View>
            <Text style={styles.heading}>HÓA ĐƠN MUA HÀNG TẠI POLYTECH</Text>
            {/* Thong tin KH */}

            <View style={styles.textRow}>
              <Text>Tên khách hàng: </Text>
              <Text>{data.customer_name} </Text>
            </View>
            <View style={styles.textRow}>
              <Text>Số điện thoại: </Text>
              <Text>{data.phone_number}</Text>
            </View>
            <View style={styles.textRow}>
              <Text>Địa chỉ mua hàng: </Text>
              <Text>{data.shop_address}</Text>
            </View>
            <View style={styles.textRow}>
              <Text>Phương thức mua hàng: </Text>
              <Text>{data.shipping_method} </Text>
            </View>
            <View style={styles.textRow}>
              <Text>Ghi chú: </Text>
              <Text>{data.content} </Text>
            </View>

            {/* tables */}
            <View style={styles.table}>
              <View style={styles.tableHead}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Tên sản phẩm</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Đơn giá</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Số lượng</Text>
                </View>

                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Thành tiền</Text>
                </View>
              </View>
              {data.products.map((product: any) => (
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{product.sku_id.name}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{product.price} </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{product.quantity}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                      {product.price * product.quantity}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.textRow}>
              <Text>Tổng: </Text>
              <Text>{data.total_amount.toLocaleString()} </Text>
            </View>
          </View>

          <View>
            <View style={styles.textRow}>
              <Text>Đơn hàng được tạo lúc: </Text>
              <Text> {data.created_at} </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ExportOrderPDF;
