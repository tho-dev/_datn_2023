import Axios from "axios";
// Lấy mã địa chỉ
export const getLocation = async (location) => {
  try {
    let ward_code;
    let district_id;

    const provinces = await Axios.get(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
      {
        headers: {
          token: process.env.GHN_SHOP_TOKEN,
        },
      }
    );

    const provinces_id = provinces.data.data.filter((item) => {
      return item.NameExtension.every(
        (item) => item === location.split(",")[2].trim()
      );
    });
    const districts = await Axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
      {
        province_id: provinces_id.ProvinceID,
      },
      {
        headers: {
          token: process.env.GHN_SHOP_TOKEN,
        },
      }
    );
    const district = districts.data.data.find(
      (item) => item.DistrictName == location.split(",")[1].trim()
    );
    district_id = district.DistrictID;
    const wards = await Axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",
      {
        district_id: district.DistrictID,
      },
      {
        headers: {
          token: process.env.GHN_SHOP_TOKEN,
        },
      }
    );
    const ward = wards.data.data.find(
      (item) => item.WardName == location.split(",")[0].trim()
    );
    ward_code = ward.WardCode;
    return {
      ward_code,
      district_id,
    };
  } catch (error) {
    console.log(error);
  }
};
// Lấy thông tin đơn hàng
export const get_order_info = async (order_code) => {
  try {
    const order_info = await Axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/detail",
      {
        order_code,
      },
      {
        headers: {
          Token: process.env.GHN_SHOP_TOKEN,
        },
      }
    );
    return order_info.data;
  } catch (error) {
    console.log(error);
  }
};
// Huỷ đơn hàng
export const cancelled_order = async (order_code) => {
  try {
    const order_info = await Axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel",
      {
        order_codes: [order_code],
      },
      {
        headers: {
          Token: process.env.GHN_SHOP_TOKEN,
          ShopId: process.env.GHN_SHOP_ID,
        },
      }
    );
    return order_info;
  } catch (error) {
    console.log(error);
  }
};
// cập nhật thông tin
export const update_info = async (info) => {
  try {
    const order_info = await Axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/update",
      {
        ...info,
      },
      {
        headers: {
          Token: process.env.GHN_SHOP_TOKEN,
          ShopId: process.env.GHN_SHOP_ID,
        },
      }
    );
    return order_info.data;
  } catch (error) {
    console.log(error);
  }
};
// Tính toán thời gian
export const calculate_time = async (info) => {
  try {
    const expected_time = await Axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime",
      {
        ...info,
      },
      {
        headers: {
          Token: process.env.GHN_SHOP_TOKEN,
          ShopId: process.env.GHN_SHOP_ID,
        },
      }
    );
    return expected_time.data;
  } catch (error) {
    console.log(error);
  }
};
// tính toán phí ship
export const calculate_fee = async (location) => {
  try {
    const calculate = await Axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
      {
        ...location,
      },
      {
        headers: {
          Token: process.env.GHN_SHOP_TOKEN,
          ShopId: process.env.GHN_SHOP_ID,
        },
      }
    );
    return calculate.data;
  } catch (error) {
    console.log(error);
  }
};
// api lấy token để in đơn
export const getTokenPrintBill = async (order_code) => {
  try {
    const print_bill = await Axios.post(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token",
      {
        order_codes: [order_code],
      },
      {
        headers: {
          Token: process.env.GHN_SHOP_TOKEN,
        },
      }
    );
    return print_bill.data;
  } catch (error) {
    console.log(error);
  }
};
