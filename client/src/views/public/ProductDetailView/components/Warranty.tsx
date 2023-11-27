import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import DialogThinkPro from "~/components/DialogThinkPro";
import { NavArrowRightIcon } from "~/components/common/Icons";

const Warranty = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex justifyContent={"space-between"}>
        <Text as={"h5"} fontSize={"lg"} fontWeight={"semibold"}>
          Bảo hành & đổi trả
        </Text>
        <Flex
          onClick={onOpen}
          as={"button"}
          fontSize={"14px"}
          bg={"white"}
          alignItems={"center"}
          color={"text.blue"}
        >
          12 tháng
          <Flex
            w="9"
            h="9"
            right="4"
            top={"calc(50% - 24px)"}
            translateY="-50%"
            zIndex="5"
            rounded="full"
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
            className="btn-next"
          >
            <NavArrowRightIcon size={4} strokeWidth={2} color="text.black" />
          </Flex>
        </Flex>
      </Flex>
      <Box ml={"6"} fontSize={"14px"}>
        <ul>
          <li>
            Bảo hành <strong>12 tháng tại chuỗi cửa hàng</strong>
          </li>
          <li>Đổi mới trong 15 ngày đầu tiên</li>
        </ul>
      </Box>

      {/* Modal */}
      <DialogThinkPro
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="5xl"
        title={<Heading fontSize="xl">Bảo hành</Heading>}
        footer={
          <Button w="full" onClick={onClose} bgColor="bg.blue">
            Đóng
          </Button>
        }
      >
        <Text>
          Bảo hành 12 tháng tại PolyTech với linh kiện phần cứng (Đối với Pin và
          Màn hình 06 tháng)
        </Text>
        <Text py={"2"}>
          Chính sách đổi trả tại PolyTech: 1. Lỗi do nhà sản xuất: Trong 15 ngày
          đầu 1 đổi 1 sản phẩm nếu xảy ra lỗi của nhà sản xuất, quý khách có thể
          đổi tại toàn bộ các chi nhánh thuộc hệ thống của PolyTech. Trong
          trường hợp PolyTech hết hàng để đổi, cửa hàng sẽ hoàn 100% giá trị
          trên hóa đơn mua hàng của Quý khách.
          <br /> 2. Sản phẩm không lỗi: Đối với sản phẩm mới: Trong 15 ngày đầu
          tiên, nếu sản phẩm không lỗi Quý khách muốn đổi sản phẩm khác PolyTech
          sẽ tính phí đổi sản phẩm là 15%, trong trường hợp Quý khách muốn trả
          lại sản phẩm PolyTech sẽ tính phí 25% giá trị sản phẩm. Đối với sản
          phẩm qua sử dụng: Trong 15 ngày đầu tiên, PolyTech cung cấp dịch vụ
          dùng thử miễn phí, Quý khách có thể đổi sản phẩm khác nếu thấy sản
          phẩm mình đang sử dụng chưa phù hợp với nhu cầu. Trong trường hợp Quý
          khách muốn trả lại sản phẩm PolyTech sẽ tính phí 15% giá trị sản phẩm.
          3. Sản phẩm lỗi do người sử dụng Trong trường hợp sản phẩm xảy ra lỗi
          do người sử dụng, vi phạm các chính sách bảo hành tại PolyTech (Quý
          khách có thể tham khảo chi tiết tại Chính sách bảo hành), PolyTech
          không hỗ trợ đổi/trả sản phẩm. PolyTech sẽ hỗ trợ Quý khách sửa chữa
          dịch vụ đối với sản phẩm này.
        </Text>
      </DialogThinkPro>
    </Box>
  );
};

export default Warranty;
