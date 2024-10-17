import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DialogThinkPro from "~/components/DialogThinkPro";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { closeModal, openModal } from "~/redux/slices/scanSlice";
import CreateBoxView from "./ActionCreateBox";
import { useGetStorageByIdProjectQuery } from "~/redux/api/product";
import { useGetDocumentByStorageQuery } from "~/redux/api/category";
import ActionBoxOld from "./ActionBoxOld";
import SideBarItem from "./components/SideBarItem";
import DetailScan from "./components/DetailScan";
import DefaultSetting from "./components/DefaultSetting";
import ScanView from "./components/ScanView";
import { useNavigate } from "react-router-dom";

type Props = {};

const DemandView = (props: Props) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector((state) => state.persistedReducer.scan);
  const [idStorage, setIdStorage] = useState<any>(2);
  const [idProject, setIdProject] = useState<any>(4);
  const [dataPdf, setDataPdf] = useState<any>();
  // call api
  const { data: dataDocumentByIdStorage } =
    useGetDocumentByStorageQuery(idStorage);
  const { data: dataStorageApi } = useGetStorageByIdProjectQuery(idProject, {
    skip: !idProject, // Chỉ gọi API khi idProject không phải null
  });
  const dispatch = useAppDispatch();

  const {
    isOpen: isOpenBoxModal,
    onOpen: onOpenBoxModal,
    onClose: onCloseBoxModal,
  } = useDisclosure();

  const {
    isOpen: isOpenBoxModalOld,
    onOpen: onOpenBoxModalOld,
    onClose: onCloseBoxModalOld,
  } = useDisclosure();
  const {
    isOpen: isOpenBoxModalNew,
    onOpen: onOpenBoxModalNew,
    onClose: onCloseBoxModalNew,
  } = useDisclosure();

  useEffect(() => {
    if (isLoading) {
      onOpenBoxModal();
    }
  }, [isLoading]);

  const handleBox = () => {
    onCloseBoxModal();
    onOpenBoxModalOld();
  };

  const handleBoxNew = () => {
    onCloseBoxModal();
    onOpenBoxModalNew();
  };

  const handleScan = () => {
    console.log("abc");
  };
  const handleReturnDashboard = () => {
    navigate("/admin");
    dispatch(openModal());
    onCloseBoxModal();
  };
  let socket: WebSocket | null = null;

  const base64toBlob = (data: string) => {
    const bytes = atob(data);
    let length = bytes.length;
    const out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: "application/pdf" });
  };
  const attemptReconnection = () => {
    // Đợi 5 giây trước khi thử kết nối lại
    setTimeout(() => {
      toast({
        title: "Đang kết nối lại",
        duration: 1600,
        position: "top-right",
        status: "warning",
      });
      createWebSocketConnection();
    }, 5000);
  };
  const handleWebSocketMessage = (event: any) => {
    const blob = base64toBlob(event.data);
    const url = URL.createObjectURL(blob);
    setDataPdf(url);
  };
  // Hàm để tạo và duy trì kết nối WebSocket
  const createWebSocketConnection = () => {
    socket = new WebSocket("ws://127.0.0.1:56789");
    socket.onopen = () => {
      toast({
        title: "Thành công",
        duration: 2000,
        position: "top-right",
        status: "success",
        description: "Đã kết nối máy scan",
      });
    };

    socket.onmessage = handleWebSocketMessage;

    socket.onerror = (error: any) => {
      toast({
        title: "Thất bại",
        duration: 2000,
        position: "top-right",
        status: "error",
        description: "Kết nối đến máy Scan thất bại",
      });
      if (!socket) {
        attemptReconnection();
      }
    };
  };

  useEffect(() => {
    createWebSocketConnection(); // Khởi tạo kết nối WebSocket
    // Cleanup function để đóng kết nối WebSocket khi component unmount
    return () => {
      if (socket) {
        socket.close();
        toast({
          title: "Thất bại",
          duration: 2000,
          position: "top-right",
          status: "success",
          description: "Đã ngắt kết nối máy scan",
        });
      }
    };
  }, []);

  const handleReturnBox = () => {
    dispatch(openModal());
    onOpenBoxModal();
  };
  if (isLoading) {
    return (
      <>
        <DialogThinkPro
          isOpen={isOpenBoxModal}
          isCentered
          title={
            <Heading fontSize="16" textTransform="uppercase">
              Quét tài liệu
            </Heading>
          }
          onClose={handleReturnDashboard}
        >
          <Flex
            w="100%"
            justifyContent="center"
            alignItems="center"
            gap="4"
            p="4"
          >
            <Button onClick={handleBox}>Chọn hộp có sẵn</Button>
            <Button onClick={handleBoxNew}>Tạo hộp mới</Button>
          </Flex>
        </DialogThinkPro>
        <DialogThinkPro
          isOpen={isOpenBoxModalOld}
          isCentered
          title={
            <Heading fontSize="16" textTransform="uppercase">
              Chọn hộp có sẵn
            </Heading>
          }
          onClose={() => {
            handleReturnBox();
            onCloseBoxModalOld();
          }}
        >
          <ActionBoxOld
            onClose={onCloseBoxModalOld}
            dataStorage={dataStorageApi?.data}
            handleReturnBox={handleReturnBox}
          />
        </DialogThinkPro>
        <DialogThinkPro
          isOpen={isOpenBoxModalNew}
          isCentered
          title={
            <Heading fontSize="16" textTransform="uppercase">
              Tạo mới hộp
            </Heading>
          }
          onClose={() => {
            handleReturnBox();
            onCloseBoxModalNew();
          }}
        >
          <CreateBoxView
            onClose={onCloseBoxModalNew}
            dataDocument={dataDocumentByIdStorage?.data}
            handleReturnBox={handleReturnBox}
          />
        </DialogThinkPro>
      </>
    );
  }

  return (
    <>
      <Flex p="4" rounded="xl" h="100vh" flexDirection="column" gap="4">
        <Flex w="100%" gap="2" h="100%">
          <Flex w="75%" borderRadius="6">
            <ScanView dataPdf={dataPdf} handleScan={handleScan} />
          </Flex>
          <Flex
            w="25%"
            bgColor="bg.white"
            borderRadius="6"
            p="4"
            flexDirection="column"
          >
            <DetailScan
              dataDocument={dataStorageApi?.data}
              dataDocumentByIdStorage={dataDocumentByIdStorage?.data}
            />
          </Flex>
        </Flex>
      </Flex>
      {/* Form */}
    </>
  );
};

export default DemandView;
