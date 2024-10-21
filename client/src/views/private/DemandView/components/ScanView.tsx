import { useEffect, useRef, useState } from "react";
// Import the main component
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import { PDFDocument, degrees } from "pdf-lib";
// thêm pubgin
import { RotateDirection } from "@react-pdf-viewer/core";
import type { RenderThumbnailItemProps } from "@react-pdf-viewer/thumbnail";

import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { rotatePlugin } from "@react-pdf-viewer/rotate";
import {
  RenderCurrentScaleProps,
  RenderZoomInProps,
  zoomPlugin,
} from "@react-pdf-viewer/zoom";
import { RenderZoomOutProps } from "@react-pdf-viewer/zoom";

import { Box, Flex, Text } from "@chakra-ui/layout";
import { Tooltip, useToast } from "@chakra-ui/react";

import pdftesst from "../../../../assets/images/DAY-LA-FILE-MAU-PDF.pdf";
// them thu viện css
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import "./customStyle.css";

import {
  ArrowDownIcon,
  ArrowUpAdminIcon,
  PlusFileIcon,
  RotateLeftIcon,
  RotateRightIcon,
  TrashIcon,
  ZoomOutIcon,
  ZoomInIcon,
  SaveFileIcon,
  ScanIcon,
  CheckedIcon,
  CloseIcon,
} from "~/components/common/Icons";
import { IconButton } from "@chakra-ui/react";
import RenderThumbnailItem from "./SideBarItem";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { changeStatus, openModal } from "~/redux/slices/scanSlice";
import { useLocation } from "react-router-dom";
type Props = {
  socket: any;
  handleChangeSocket: (value: any) => void;
};

const ScanView = ({ socket, handleChangeSocket }: Props) => {
  const { status } = useAppSelector((state) => state.persistedReducer.scan);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const toast = useToast();
  const [pdfFile, setPdfFile] = useState<any>(null);
  const [pdfFileInsert, setPdfFileInsert] = useState<any>(null);
  const [pageIndex, setPageIndex] = useState<null | number>(0);

  const thumbnailPluginInstance = thumbnailPlugin();
  const rotatePluginInstance = rotatePlugin();
  const zoomPluginInstance = zoomPlugin();
  const { CurrentScale, ZoomIn, ZoomOut } = zoomPluginInstance;
  // Hàm để xóa trang
  const deletePage = async () => {
    if (!pdfFile) return;
    if (pageIndex === null) return;
    const pdfDoc = await PDFDocument.load(
      await fetch(pdfFile).then((res) => res.arrayBuffer())
    );
    pdfDoc.removePage(pageIndex); // Xóa trang theo chỉ mục

    const pdfBytes = await pdfDoc.save();
    const updatedPdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);

    setPdfFile(updatedPdfUrl);
  };
  // hàm di chuyển trang
  const movePage = async (direction: string) => {
    if (!pdfFile) return;
    if (pageIndex === null) return;

    const pdfDoc = await PDFDocument.load(
      await fetch(pdfFile).then((res) => res.arrayBuffer())
    );
    const totalPages = pdfDoc.getPageCount();
    // Tính toán vị trí mới
    let newIndex;

    if (direction === "up" && pageIndex > 0) {
      newIndex = pageIndex - 1;
    } else if (direction === "down" && pageIndex < totalPages - 1) {
      newIndex = pageIndex + 1;
    } else {
      toast({
        duration: 1600,
        position: "top-right",
        status: "error",
        description: "Không thể di chuyển trang theo hướng đã cho",
      });
      return;
    }
    // Sao chép trang cần di chuyển
    const [movedPage] = await pdfDoc.copyPages(pdfDoc, [pageIndex]);
    // Xóa trang cũ
    pdfDoc.removePage(pageIndex);

    // Chèn trang vào vị trí mới
    pdfDoc.insertPage(newIndex, movedPage);

    // Lưu lại PDF
    const pdfBytes = await pdfDoc.save();
    const updatedPdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);

    // Cập nhật trạng thái PDF và chỉ số trang
    setPdfFile(updatedPdfUrl);
    setPageIndex(newIndex);
  };
  // hàm xoay trang
  const handleRotatePage = async (direction: string) => {
    if (!pdfFile) return;
    if (pageIndex === null) return;

    const pdfDoc = await PDFDocument.load(
      await fetch(pdfFile).then((res) => res.arrayBuffer())
    );
    // Kiểm tra index có hợp lệ không
    const pages = pdfDoc.getPages();
    if (pageIndex >= 0 && pageIndex < pages.length) {
      const page = pages[pageIndex];
      // Xoay trang theo hướng
      const currentRotation = page.getRotation().angle;
      const newRotation: any =
        direction === "clockwise"
          ? (currentRotation + 90) % 360 // Xoay theo chiều kim đồng hồ
          : (currentRotation - 90 + 360) % 360; // Xoay ngược chiều kim đồng hồ

      // Sử dụng phương thức 'rotateDegrees()' để xoay trang
      page.setRotation(degrees(newRotation));
    }
    // Lưu PDF sau khi xoay
    const rotatedPdfBytes = await pdfDoc.save();
    const updatedPdfBlob = new Blob([rotatedPdfBytes], {
      type: "application/pdf",
    });
    const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);
    setPdfFile(updatedPdfUrl);
  };
  // hàm chèn trang
  const handleInsertPage = async () => {
    if (!pdfFile || !pdfFileInsert || pageIndex === null) return;

    try {
      const pdfDoc = await PDFDocument.load(
        await fetch(pdfFile).then((res) => res.arrayBuffer())
      );
      const pdfDocInsert = await PDFDocument.load(
        await fetch(pdfFileInsert).then((res) => res.arrayBuffer())
      );

      // Sao chép tất cả các trang từ pdfDocInsert
      const pagesToInsert = await pdfDoc.copyPages(
        pdfDocInsert,
        pdfDocInsert.getPageIndices()
      );

      // Lấy các trang hiện tại của pdfDoc
      const pages = pdfDoc.getPages();

      // Kiểm tra nếu pageIndex hợp lệ
      if (pageIndex >= 0 && pageIndex <= pages.length) {
        // Chèn tất cả các trang từ pdfDocInsert vào vị trí pageIndex
        pagesToInsert.forEach((page, i) => {
          pdfDoc.insertPage(pageIndex + i, page); // Chèn từng trang tại vị trí tương ứng
        });

        const updatedPdfBytes = await pdfDoc.save();
        const updatedPdfBlob = new Blob([updatedPdfBytes], {
          type: "application/pdf",
        });
        const updatedPdfUrl = URL.createObjectURL(updatedPdfBlob);

        setPdfFile(updatedPdfUrl);
        setPdfFileInsert(null);
      } else {
        console.error("pageIndex không hợp lệ");
      }
    } catch (error) {
      console.error("Lỗi khi xử lý tệp PDF", error);
    }
  };
  // hàm lưu
  const handleSubmit = () => {
    console.log("abc");
  };
  const { Thumbnails } = thumbnailPluginInstance;
  // Đặt mức zoom mặc định là 130% khi component mount

  const base64toBlob = (data: string) => {
    const bytes = atob(data);
    let length = bytes.length;
    const out = new Uint8Array(length);
    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }
    return new Blob([out], { type: "application/pdf" });
  };
  const handleWebSocketMessage = (event: any) => {
    const msg = JSON.parse(event.data);
    const blob = base64toBlob(msg.base64);
    const url = URL.createObjectURL(blob);
    switch (msg.type) {
      case "scan":
        setPdfFile(url);
        break;
      case "insert":
        setPdfFileInsert(url);
        break;
    }
  };

  const ws = new WebSocket("ws://127.0.0.1:56789");
  useEffect(() => {
    return () => {
      ws.send("exit");
    };
  }, [location]);
  // tự động chạy hàm insert nếu có insertPage
  useEffect(() => {
    if (pdfFileInsert) {
      handleInsertPage();
    }
  }, [pdfFileInsert]);

  useEffect(() => {
    window.location.href = "sc://";
    ws.onopen = () => {
      toast({
        duration: 2000,
        position: "top-right",
        status: "success",
        description: "Đã kết nối máy scan",
      });
      dispatch(changeStatus(true));
    };
    ws.onmessage = handleWebSocketMessage;

    ws.onerror = (error: any) => {
      toast({
        duration: 2000,
        position: "top-right",
        status: "error",
        description: "Kết nối thất bại",
      });
      dispatch(changeStatus(false));
    };
    handleChangeSocket(ws);
    return () => {
      dispatch(openModal());
      setPdfFile(null);
      ws.close();
      toast({
        title: "Đã ngắt kết nối máy scan",
        duration: 2000,
        position: "top-right",
        status: "error",
      });
    };
  }, []);

  const handleScan = (action: string) => {
    if (socket) {
      ws?.send(action);
    }
  };
  return (
    <Flex w="full" flexDir={"column"} gap="2" h="full">
      <Flex
        w="full"
        p="2"
        rounded={"md"}
        bgColor={"white"}
        justifyContent={"space-between"}
      >
        <Flex gap="2.5">
          <Tooltip label="Scan">
            <IconButton
              size={"md"}
              icon={<ScanIcon size={7} color="gray.400" />}
              aria-label="rotate"
              bgColor={"gray.100"}
              _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
              onClick={() => handleScan("scan")}
            />
          </Tooltip>
          <Tooltip label="Chèn trang">
            <IconButton
              size={"md"}
              icon={<PlusFileIcon size={7} color="gray" />}
              aria-label="rotate"
              bgColor={"gray.100"}
              _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
              onClick={() => handleScan("insert")}
            />
          </Tooltip>
          <Tooltip label="Xoay trái">
            <IconButton
              size={"md"}
              icon={<RotateLeftIcon size={7} color="gray" />}
              aria-label="rotate"
              bgColor={"gray.100"}
              _hover={{
                bgColor: "text.textSuccess ",
                color: "text.white",
              }}
              onClick={() => handleRotatePage("clockwise")}
            />
          </Tooltip>
          <Tooltip label="Xoay phải">
            <IconButton
              size={"md"}
              icon={<RotateRightIcon size={7} color="gray" />}
              aria-label="rotate"
              bgColor={"gray.100"}
              _hover={{
                bgColor: "text.textSuccess ",
                color: "text.white",
              }}
              onClick={() => handleRotatePage("counterclockwise")}
            />
          </Tooltip>
          <Tooltip label="Trang sau">
            <IconButton
              size={"md"}
              icon={<ArrowDownIcon size={7} color="gray" />}
              aria-label="rotate"
              bgColor={"gray.100"}
              _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
              onClick={() => movePage("down")}
            />
          </Tooltip>
          <Tooltip label="Trang trước">
            <IconButton
              size={"md"}
              icon={<ArrowUpAdminIcon size={7} color="gray" />}
              aria-label="rotate"
              bgColor={"gray.100"}
              _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
              onClick={() => movePage("up")}
            />
          </Tooltip>

          <Tooltip label="Xoá trang">
            <IconButton
              size={"md"}
              icon={<TrashIcon color="gray" />}
              aria-label="rotate"
              bgColor={"gray.100"}
              _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
              onClick={deletePage}
            />
          </Tooltip>
        </Flex>
        <Flex alignItems={"center"} gap="2">
          <ZoomIn>
            {(props: RenderZoomInProps) => (
              <Tooltip label="Phóng to">
                <IconButton
                  size={"md"}
                  icon={<ZoomInIcon color="gray" />}
                  aria-label="rotate"
                  bgColor={"gray.100"}
                  _hover={{
                    bgColor: "text.textSuccess ",
                    color: "text.white",
                  }}
                  onClick={props.onClick}
                />
              </Tooltip>
            )}
          </ZoomIn>

          <CurrentScale>
            {(props: RenderCurrentScaleProps) => (
              <Text>{`${Math.round(props.scale * 100)}%`}</Text>
            )}
          </CurrentScale>
          <ZoomOut>
            {(props: RenderZoomOutProps) => (
              <Tooltip label="Thu nhỏ">
                <IconButton
                  size={"md"}
                  icon={<ZoomOutIcon color="gray" />}
                  aria-label="rotate"
                  bgColor={"gray.100"}
                  _hover={{
                    bgColor: "text.textSuccess ",
                    color: "text.white",
                  }}
                  onClick={props.onClick}
                />
              </Tooltip>
            )}
          </ZoomOut>
        </Flex>
        <Flex gap="2">
          <Tooltip label="Lưu File">
            <IconButton
              size={"md"}
              icon={<SaveFileIcon color="text.white" />}
              aria-label="rotate"
              bgColor={"gray.200"}
              _hover={{ bgColor: "text.textSuccess" }}
              onClick={handleSubmit}
            />
          </Tooltip>
          {status && (
            <Tooltip label="Trạng thái: Đã kết nối">
              <IconButton
                size={"md"}
                icon={<CheckedIcon size={7} color="gray.400" />}
                aria-label="rotate"
                bgColor={"gray.100"}
                _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
              />
            </Tooltip>
          )}
          {!status && (
            <Tooltip label="Trạng thái: Chưa kết nối">
              <IconButton
                size={"md"}
                icon={<CloseIcon size={7} color="gray.400" />}
                aria-label="rotate"
                bgColor={"gray.100"}
                _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
              />
            </Tooltip>
          )}
        </Flex>
      </Flex>
      {pdfFile && (
        <Flex height={"815px"} w="full" gap="2">
          <Flex
            bgColor="bg.white"
            w="20%"
            rounded="md"
            justifyContent={"center"}
            alignItems={"center"}
            p="2"
          >
            <Thumbnails
              renderThumbnailItem={(props) =>
                RenderThumbnailItem(props, setPageIndex)
              }
            />
          </Flex>
          <Box
            w="80%"
            h="screen"
            bgColor="bg.white"
            rounded="md"
            className="pdf-viewer-container"
          >
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
            >
              <Viewer
                fileUrl={pdfFile}
                plugins={[
                  thumbnailPluginInstance,
                  rotatePluginInstance,
                  zoomPluginInstance,
                ]}
                defaultScale={1}
                onDocumentLoad={() => {
                  // Thiết lập zoom "Page Fit" ngay sau khi tài liệu được tải
                  zoomPluginInstance.zoomTo(0.9);
                }}
              />
            </Worker>
          </Box>
        </Flex>
      )}
      {!pdfFile && (
        <Flex height={"815px"} w="full" gap="2">
          <Flex
            bgColor="bg.white"
            w="20%"
            rounded="md"
            justifyContent={"center"}
            alignItems={"center"}
            p="2"
          ></Flex>
          <Flex
            w="80%"
            h="screen"
            bgColor="bg.white"
            rounded="md"
            className="pdf-viewer-container"
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            gap="2"
          >
            <Text fontWeight={"bold"} fontSize="lg">
              Hãy tiến hành Scan
            </Text>
            <Flex alignItems={"center"} gap="4">
              <Text fontWeight={"semibold"} fontSize="lg">
                Nhấn vào đây
              </Text>
              <IconButton
                size={"md"}
                icon={<ScanIcon size={7} color="gray.400" />}
                aria-label="rotate"
                bgColor={"gray.100"}
                _hover={{ bgColor: "text.textSuccess ", color: "text.white" }}
                onClick={handleScan}
              />
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
export default ScanView;
