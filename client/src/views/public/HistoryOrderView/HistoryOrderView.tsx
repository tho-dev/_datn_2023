import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import CheckPhone from './components/CheckPhone';
import ListOrder from './components/ListOrder';
import { useAppSelector } from '~/redux/hook/hook';
import CheckOtp from './components/CheckOtp';

type Props = {};

const HistoryOrderView = (props: Props) => {
  const phoneNumber = useAppSelector((state) => state.persistedReducer.order);
  console.log(phoneNumber.visibleListOrder);
  return <Box m='30px 0'>{phoneNumber.visibleListOrder ? <ListOrder /> : <CheckPhone />}</Box>;
};

export default HistoryOrderView;
