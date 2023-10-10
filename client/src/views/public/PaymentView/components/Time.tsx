import { Box, Flex } from "@chakra-ui/layout";
import { Button, IconButton, Text } from "@chakra-ui/react";
import { bg } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { RefreshIcon } from "~/components/common/Icons";
import { useAppDispatch, useAppSelector } from "~/redux/hook/hook";
import { setCheckOtp, setOtp, setTime } from "~/redux/slices/globalSlice";

type Props = {
  handleSendOtp: () => void;
};

const Time = ({ handleSendOtp }: Props) => {
  const { time, isCheckOtp } = useAppSelector(
    (state) => state.persistedReducer.global
  );

  const [timer, setTimer] = useState(time);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (timer === 0) {
      dispatch(setTime(timer));
      dispatch(setOtp(false));
      return;
    }
    const timers = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => {
      dispatch(setTime(timer));
      clearTimeout(timers);
    };
  }, [timer]);

  const handleSendOtpAgain = () => {
    if (time == 0 && !isCheckOtp) {
      dispatch(setCheckOtp(60));
      setTimer(60);
      handleSendOtp();
    }
  };
  return (
    <Flex alignItems="center">
      <Text fontSize="12px" fontWeight="semibold">
        Mã OTP của bạn sẽ hết hạn sau : 00:{`${timer < 10 ? "0" : ""}`}
        {timer}
      </Text>
      {timer === 0 && (
        <IconButton
          aria-label="refresh otp"
          icon={<RefreshIcon color="black" size={4} />}
          bg="none"
          padding={3}
          _hover={{ bg: "bg.gray" }}
          onClick={handleSendOtpAgain}
        />
      )}
    </Flex>
  );
};

export default Time;
