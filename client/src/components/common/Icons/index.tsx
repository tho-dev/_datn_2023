import { Icon } from "@chakra-ui/react";

export const SearchIcon = ({ size = 46, strokeWidth = 2, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M11 3a8 8 0 1 0 0 16 8 8 0 1 0 0-16z" />
		<path d="m21 21-4.35-4.35" />
	</Icon>
);

export const ArrowRightUpIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M9.5 5.5h9v9" />
		<path d="M5.772 18.228 18.5 5.5" />
	</Icon>
);

export const ArrowUpIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="m6 9 6 6 6-6"></path>
	</Icon>
);
export const ArrowRightIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M21 12H3" />
		<path d="m15 6 6 6-6 6" />
	</Icon>
);

export const MoneyIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M2 6.5h20v12H2v-12Z" />
		<path
			d="M2 10.5a4 4 0 0 0 4-4H2v4Z"
			clipRule="evenodd"
		/>
		<path
			d="M2 14.5a4 4 0 0 1 4 4H2v-4Z"
			clipRule="evenodd"
		/>
		<path
			d="M22 14.5v4h-4a4 4 0 0 1 4-4Z"
			clipRule="evenodd"
		/>
		<path
			d="M22 10.5a4 4 0 0 1-4-4h4v4Z"
			clipRule="evenodd"
		/>
		<path d="M12 15.5c1.38 0 2.5-1.343 2.5-3s-1.12-3-2.5-3-2.5 1.343-2.5 3 1.12 3 2.5 3Z" />
	</Icon>
);

export const WaletIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M8.991 5.984 15.892 2 18.2 5.994l-9.208-.01Z"
			clipRule="evenodd"
		/>
		<path d="M2 7a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Z" />
		<path d="M17.625 16.5H22v-5h-4.375C16.175 11.5 15 12.62 15 14s1.175 2.5 2.625 2.5Z" />
		<path d="M22 8.25v12" />
	</Icon>
);

export const GlobalIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
		<path d="m2.5 12.5 5.5 2L7 18l1 3" />
		<path d="m17 20.5-.5-2.5-2.5-1v-3.5l3-1 4.5.5" />
		<path d="M19 5.5 18.5 7l-3.5.5v3l2.5-1h2l2 1" />
		<path d="m2.5 10.5 2.5-2L7.5 8l2-3-1-2" />
	</Icon>
);

export const QRCodeIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M15 12v3" />
		<path d="M12 3v3" />
		<path d="M18 12v3" />
		<path d="M12 18h9" />
		<path d="M18 21h3" />
		<path d="M6 12h3" />
		<path d="M6 6.011 6.01 6" />
		<path d="m12 12.011.01-.011" />
		<path d="M3 12.011 3.01 12" />
		<path d="M12 9.011 12.01 9" />
		<path d="m12 15.011.01-.011" />
		<path d="m15 21.011.01-.011" />
		<path d="m12 21.011.01-.011" />
		<path d="m21 12.011.01-.011" />
		<path d="m21 15.011.01-.011" />
		<path d="M18 6.011 18.01 6" />
		<path d="M9 3.6v4.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6Z" />
		<path d="M21 3.6v4.8a.6.6 0 0 1-.6.6h-4.8a.6.6 0 0 1-.6-.6V3.6a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6Z" />
		<path d="M6 18.011 6.01 18" />
		<path d="M9 15.6v4.8a.6.6 0 0 1-.6.6H3.6a.6.6 0 0 1-.6-.6v-4.8a.6.6 0 0 1 .6-.6h4.8a.6.6 0 0 1 .6.6Z" />
	</Icon>
);

export const BounceRightIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M19 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
		<path d="M4 15.5c3-1 5.5-.5 8 4.5.5-3 2-7.5 3.5-10" />
	</Icon>
);

export const CheckIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M11.607 2.342a.6.6 0 0 1 .787 0l1.948 1.693a.6.6 0 0 0 .446.145l2.57-.224a.6.6 0 0 1 .638.462l.58 2.515a.6.6 0 0 0 .276.379l2.212 1.33a.6.6 0 0 1 .243.748L20.3 11.766a.6.6 0 0 0 0 .469l1.007 2.376a.6.6 0 0 1-.243.748l-2.212 1.33a.6.6 0 0 0-.275.38l-.581 2.514a.6.6 0 0 1-.637.462l-2.571-.224a.6.6 0 0 0-.446.145l-1.948 1.693a.6.6 0 0 1-.787 0l-1.949-1.693a.6.6 0 0 0-.445-.145l-2.571.224a.6.6 0 0 1-.637-.462l-.581-2.515a.6.6 0 0 0-.276-.379l-2.212-1.33a.6.6 0 0 1-.243-.748l1.008-2.376a.6.6 0 0 0 0-.469L2.693 9.39a.6.6 0 0 1 .243-.748l2.212-1.33a.6.6 0 0 0 .276-.38l.581-2.514a.6.6 0 0 1 .637-.462l2.57.224a.6.6 0 0 0 .446-.145l1.949-1.693Z" />
		<path d="m9 13 2 2 5-5" />
	</Icon>
);

export const ShieldIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m8.5 11.5 3 3 5-5" />
		<path d="M5 17.998 3.13 4.911a.996.996 0 0 1 .774-1.114l7.662-1.703a2 2 0 0 1 .868 0l7.662 1.703c.51.114.847.596.773 1.114L19 17.998c-.07.495-.5 3.5-7 3.5s-6.928-3.005-7-3.5Z" />
	</Icon>
);

export const TrunkIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M8 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="M18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="M10.05 17H15V6.6a.6.6 0 0 0-.6-.6H1" />
		<path d="M5.65 17H3.6a.6.6 0 0 1-.6-.6v-4.9" />
		<path d="M2 9h4" />
		<path d="M15 9h5.61a.6.6 0 0 1 .548.356l1.79 4.028a.6.6 0 0 1 .052.243V16.4a.6.6 0 0 1-.6.6h-1.9" />
		<path d="M15 17h1" />
	</Icon>
);

export const ScanQRCodeIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M9 6.6v1.8a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h1.8a.6.6 0 0 1 .6.6Z" />
		<path d="M6 12h3" />
		<path d="M15 12v3" />
		<path d="M12 18h3" />
		<path d="m12 12.011.01-.011" />
		<path d="m18 12.011.01-.011" />
		<path d="m12 15.011.01-.011" />
		<path d="m18 15.011.01-.011" />
		<path d="m18 18.011.01-.011" />
		<path d="M12 9.011 12.01 9" />
		<path d="M12 6.011 12.01 6" />
		<path d="M9 15.6v1.8a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6v-1.8a.6.6 0 0 1 .6-.6h1.8a.6.6 0 0 1 .6.6Z" />
		<path d="M18 6.6v1.8a.6.6 0 0 1-.6.6h-1.8a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h1.8a.6.6 0 0 1 .6.6Z" />
		<path d="M18 3h3v3" />
		<path d="M18 21h3v-3" />
		<path d="M6 3H3v3" />
		<path d="M6 21H3v-3" />
	</Icon>
);

export const ShoppingIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m19.261 9.696 1.385 9A2 2 0 0 1 18.669 21H5.331a2 2 0 0 1-1.976-2.304l1.384-9A2 2 0 0 1 6.716 8h10.569a2 2 0 0 1 1.976 1.696Z" />
		<path d="M14 5a2 2 0 1 0-4 0" />
	</Icon>
);
export const ShoppingCartIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m19.261 9.696 1.385 9A2 2 0 0 1 18.669 21H5.331a2 2 0 0 1-1.976-2.304l1.384-9A2 2 0 0 1 6.716 8h10.569a2 2 0 0 1 1.976 1.696Z" />
		<path d="M14 5a2 2 0 1 0-4 0" />
	</Icon>
);
export const InfoIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 11.5v5" />
		<path d="m12 7.511.01-.011" />
		<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
	</Icon>
);

export const FacebookIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z" />
		<path d="M11 21v-9c0-2.188.5-4 4-4" />
		<path d="M9 13h6" />
	</Icon>
);

export const YoutubeIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			fill={color}
			d="m14 12-3.5 2v-4l3.5 2Z"
		/>
		<path d="M2 12.706v-1.415c0-2.895 0-4.343.905-5.275.906-.931 2.332-.971 5.183-1.052 1.35-.038 2.73-.066 3.912-.066 1.181 0 2.561.028 3.912.066 2.851.08 4.277.121 5.182 1.052.906.932.906 2.38.906 5.275v1.415c0 2.895 0 4.343-.905 5.274-.906.932-2.331.972-5.183 1.053-1.35.038-2.73.066-3.912.066-1.181 0-2.561-.028-3.912-.066-2.851-.08-4.277-.121-5.183-1.053C2 17.05 2 15.601 2 12.706Z" />
	</Icon>
);

export const InstagramIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
		<path d="M3 16V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z" />
		<path d="m17.5 6.511.01-.011" />
	</Icon>
);

export const TiktokIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5Z" />
		<path d="M10 12a3 3 0 1 0 3 3V6c.333 1 1.6 3 4 3" />
	</Icon>
);

export const NavArrowLeflIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m15 6-6 6 6 6" />
	</Icon>
);

export const NavArrowRightIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m9 6 6 6-6 6" />
	</Icon>
);

export const CheckOneIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 22a9.97 9.97 0 0 0 7.071-2.929A9.97 9.97 0 0 0 22 12a9.969 9.969 0 0 0-2.929-7.071A9.969 9.969 0 0 0 12 2a9.969 9.969 0 0 0-7.071 2.929A9.969 9.969 0 0 0 2 12a9.969 9.969 0 0 0 2.929 7.071A9.969 9.969 0 0 0 12 22Z" />
		<path d="m8 12 3 3 6-6" />
	</Icon>
);

export const FilterIcon = ({ size = 33, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M4.8 15.6a.6.6 0 0 1 .6-.6H9a.6.6 0 1 1 0 1.2H5.4a.6.6 0 0 1-.6-.6Zm0-3.6a.6.6 0 0 1 .6-.6h8.4a.599.599 0 1 1 0 1.2H5.4a.6.6 0 0 1-.6-.6Zm0-3.6a.6.6 0 0 1 .6-.6h13.2a.6.6 0 1 1 0 1.2H5.4a.6.6 0 0 1-.6-.6Z" />
	</Icon>
);

export const CloseSmallIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m7 7 10 10" />
		<path d="M7 17 17 7" />
	</Icon>
);

export const PhoneIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M6.567 3.66a.848.848 0 0 0-1.269-.078L4.006 4.875c-.604.605-.826 1.462-.563 2.213a21.96 21.96 0 0 0 5.21 8.26 21.961 21.961 0 0 0 8.26 5.21c.752.264 1.608.041 2.213-.563l1.292-1.292a.85.85 0 0 0-.078-1.269l-2.884-2.242a.849.849 0 0 0-.725-.153l-2.738.684a2.181 2.181 0 0 1-2.07-.574l-3.07-3.071a2.181 2.181 0 0 1-.576-2.071l.685-2.738a.848.848 0 0 0-.152-.725L6.567 3.66ZM4.355 2.64a2.181 2.181 0 0 1 3.265.203l2.242 2.882a2.18 2.18 0 0 1 .394 1.868l-.684 2.737a.847.847 0 0 0 .223.804l3.07 3.071a.848.848 0 0 0 .806.223l2.736-.684a2.181 2.181 0 0 1 1.868.394l2.882 2.242a2.18 2.18 0 0 1 .204 3.264l-1.293 1.293c-.925.925-2.307 1.33-3.596.877A23.292 23.292 0 0 1 7.71 16.29a23.292 23.292 0 0 1-5.525-8.761c-.453-1.288-.047-2.671.878-3.596L4.356 2.64h-.001Z" />
	</Icon>
);

export const MapIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M16.999 13.128c-.629 1.275-1.48 2.544-2.352 3.684A37.81 37.81 0 0 1 12 19.896a37.91 37.91 0 0 1-2.647-3.084c-.872-1.14-1.724-2.41-2.352-3.684C6.365 11.841 6 10.635 6 9.6a6 6 0 0 1 12 0c0 1.035-.366 2.24-1.001 3.528Zm-5 8.472s7.2-6.823 7.2-12a7.2 7.2 0 0 0-14.4 0c0 5.177 7.2 12 7.2 12Z" />
		<path d="M12 12a2.4 2.4 0 1 1 0-4.801A2.4 2.4 0 0 1 12 12Zm0 1.2A3.6 3.6 0 1 0 12 6a3.6 3.6 0 0 0 0 7.2Z" />
	</Icon>
);

export const PhonesIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 4.2a6 6 0 0 0-6 6v1.2h1.2a1.2 1.2 0 0 1 1.2 1.2v3.6a1.2 1.2 0 0 1-1.2 1.2H6a1.2 1.2 0 0 1-1.2-1.2v-6a7.2 7.2 0 0 1 14.4 0v7.2a3 3 0 0 1-3 3h-2.561a1.2 1.2 0 0 1-1.04.6h-1.2a1.2 1.2 0 1 1 0-2.4h1.2a1.2 1.2 0 0 1 1.04.6h2.56a1.8 1.8 0 0 0 1.8-1.8h-1.2a1.2 1.2 0 0 1-1.2-1.2v-3.6a1.2 1.2 0 0 1 1.2-1.2H18v-1.2a5.999 5.999 0 0 0-6-6Z" />
	</Icon>
);

export const NewIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M19.8 6a.6.6 0 0 1 .6.6v10.8a.6.6 0 0 1-.6.6H4.2a.6.6 0 0 1-.6-.6V6.6a.6.6 0 0 1 .6-.6h15.6ZM4.2 4.8a1.8 1.8 0 0 0-1.8 1.8v10.8a1.8 1.8 0 0 0 1.8 1.8h15.6a1.8 1.8 0 0 0 1.8-1.8V6.6a1.8 1.8 0 0 0-1.8-1.8H4.2Z" />
		<path d="M10.8 9a.6.6 0 0 1 .6-.6h6a.6.6 0 0 1 0 1.2h-6a.6.6 0 0 1-.6-.6ZM9.007 7.975a.6.6 0 0 1 0 .85l-1.8 1.8a.6.6 0 0 1-.85 0l-.6-.6a.6.6 0 1 1 .85-.85l.175.176 1.375-1.376a.6.6 0 0 1 .85 0ZM10.8 13.8a.6.6 0 0 1 .6-.6h6a.6.6 0 1 1 0 1.2h-6a.6.6 0 0 1-.6-.6Zm-1.795-1.025a.6.6 0 0 1 0 .85l-1.8 1.8a.6.6 0 0 1-.85 0l-.6-.6a.6.6 0 1 1 .85-.85l.175.177 1.375-1.377a.6.6 0 0 1 .85 0Z" />
	</Icon>
);

export const CartIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			fill={color}
			d="M19.5 22a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
		/>
		<path
			fill={color}
			d="M9.5 22a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
		/>
		<path d="M5 4c-.167-.667-1-2-3-2m3 2h17l-2 11H7L5 4Z" />
		<path d="M20 15H5.23c-1.784 0-2.73.781-2.73 2 0 1.219.946 2 2.73 2H19.5" />
	</Icon>
);

export const UserIcon = ({ size = 33, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M5 20v-1a7 7 0 1 1 14 0v1" />
		<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
	</Icon>
);

export const ExampleIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M6 17.507H2v-13.5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v13.5h-4" />
		<path d="m12 16-5 5h10l-5-5Z" />
	</Icon>
);

export const PlusIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M12 5v14"></path>
		<path d="M5 12h14"></path>
	</Icon>
);

export const Clock = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M16.828 11.736a27.683 27.683 0 0 1-.198-.019 9.873 9.873 0 0 0-.83-.057 813.608 813.608 0 0 0-4.187-.037 850.334 850.334 0 0 1-3.131-.025 1.463 1.463 0 0 1-.185-.019l-.041-.006.053-.057c.06-.066.11-.12.162-.172a10.121 10.121 0 0 0 1.819-2.54l.015-.028a1.21 1.21 0 0 0 .109-.257.353.353 0 0 0-.01-.16.619.619 0 0 1-.013-.062l-.005-.042-.042.008a.718.718 0 0 1-.074.01.304.304 0 0 0-.178.051c-.058.055-.11.116-.155.181-.035.05-.073.097-.115.141-.338.346-.676.69-1.016 1.035-.436.443-.871.887-1.305 1.332a4.047 4.047 0 0 0-.522.612c-.218.339-.185.62.111.943.284.309.582.643.91 1.023.24.276.477.554.714.832.257.302.515.603.774.903.1.12.215.226.345.313a.32.32 0 0 0 .16.039.229.229 0 0 0 .15-.044.323.323 0 0 0 .057-.313 2.116 2.116 0 0 0-.248-.361l-.062-.08-.896-1.152-1.043-1.344a.87.87 0 0 1-.076-.127l-.016-.03.566.028c.46.023.895.046 1.335.063.936.035 2.303.07 3.625.104 1.138.028 2.212.056 3.002.083.154.004.31-.007.462-.033.233-.037.351-.157.35-.356 0-.223-.132-.357-.37-.38Z" />
		<path d="M2.938 9.451c-.832 3.27-.103 6.155 2.167 8.575l.18.186c1.22 1.22 2.738 1.972 3.942 2.496.517.226 3.167.5 3.885.393 4.262-.636 7.066-3.04 8.043-7.062.187-.788.28-1.595.277-2.405.005-1.907-.798-4.124-2.454-5.784-.17-.141-.34-.287-.505-.429-.356-.306-.724-.623-1.11-.894-2.943-2.071-6-2.083-9.088-.984-2.796.993-4.591 2.982-5.337 5.908Zm5.349-4.93c2.709-1.125 5.427-1.324 8.078.362.485.309 1.777 1.353 1.98 1.51l.013.01.011.012c1.034 1.096 2.219 3.102 2.192 5.163a10.516 10.516 0 0 1-.355 2.61c-.673 2.448-2.283 4.232-4.921 5.452-2.683 1.284-6.53-.014-7.553-.69a11.952 11.952 0 0 1-2.926-2.844c-1.263-1.788-1.546-4.358-.868-6.707a7.617 7.617 0 0 1 4.349-4.878Z" />
	</Icon>
);

export const CodeIcon = ({ ...props }) => (
	<>
		<Icon
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		>
			<path d="M12 4.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 1 0 0-14.5z" />
			<path d="M12 8v4l2 2" />
		</Icon>
	</>
);

export const DownIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 4.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 1 0 0-14.5z" />
		<path d="M12 8v4l2 2" />
	</Icon>
);

export const GoogleIcon = (props: any) => (
	<Icon
		viewBox="0 0 32 32"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g
			id="SVGRepo_bgCarrier"
			strokeWidth="0"
		></g>
		<g
			id="SVGRepo_tracerCarrier"
			strokeLinecap="round"
			strokeLinejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			{" "}
			<path
				d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z"
				fill="#4285F4"
			></path>{" "}
			<path
				d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z"
				fill="#34A853"
			></path>{" "}
			<path
				d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z"
				fill="#FBBC05"
			></path>{" "}
			<path
				d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z"
				fill="#EB4335"
			></path>{" "}
		</g>
	</Icon>
);

export const FbIcon = (props: any) => (
	<Icon
		viewBox="0 0 48 48"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g
			id="SVGRepo_bgCarrier"
			strokeWidth="0"
		></g>
		<g
			id="SVGRepo_tracerCarrier"
			strokeLinecap="round"
			strokeLinejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			<circle
				cx="24"
				cy="24"
				r="20"
				fill="#3B5998"
			></circle>{" "}
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M29.315 16.9578C28.6917 16.8331 27.8498 16.74 27.3204 16.74C25.8867 16.74 25.7936 17.3633 25.7936 18.3607V20.1361H29.3774L29.065 23.8137H25.7936V35H21.3063V23.8137H19V20.1361H21.3063V17.8613C21.3063 14.7453 22.7708 13 26.4477 13C27.7252 13 28.6602 13.187 29.8753 13.4363L29.315 16.9578Z"
				fill="white"
			></path>{" "}
			<path d="m18.5 9-6 6-6-6" />
		</g>
	</Icon>
);

export const DashboardIcon = ({ size = 35, color = "#809FB8", ...props }) => (
	<Icon
		width={size}
		height={size}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 27 30"
		fill="none"
		{...props}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M11.371 28.5999L3.53501 24.0809C1.94807 23.1583 0.969193 21.4635 0.963013 19.6279V10.6149C0.969158 8.77933 1.948 7.08453 3.53492 6.1619L11.371 1.64285C12.9616 0.720444 14.9244 0.720444 16.515 1.64285L24.351 6.16185C25.9379 7.08446 26.9168 8.77922 26.923 10.6149L26.923 19.6279C26.9169 21.4634 25.938 23.1582 24.3511 24.0808L16.515 28.5999C14.9222 29.514 12.9638 29.514 11.371 28.5999H11.371ZM12.36 3.35585L4.52401 7.87485C3.54592 8.44099 2.9429 9.48476 2.94101 10.6149V19.6279C2.9458 20.7574 3.548 21.8002 4.52401 22.3689L12.36 26.8878C13.3392 27.4548 14.5468 27.4548 15.526 26.8878L23.362 22.3689C24.3402 21.8024 24.9429 20.7582 24.944 19.6279V10.6149C24.9393 9.48584 24.3375 8.44351 23.3621 7.87488L15.526 3.35585C14.5457 2.79318 13.3403 2.79318 12.36 3.35585H12.36ZM9.00001 18.4418C8.64275 18.4418 8.31262 18.2513 8.13399 17.9418C7.95535 17.6324 7.95535 17.2513 8.13399 16.9418C8.31262 16.6324 8.64275 16.4418 9.00001 16.4418H19C19.3573 16.4418 19.6874 16.6324 19.866 16.9418C20.0447 17.2513 20.0447 17.6324 19.866 17.9418C19.6874 18.2513 19.3573 18.4418 19 18.4418H9.00001ZM9.00001 13.4418C8.64275 13.4418 8.31262 13.2513 8.13399 12.9418C7.95535 12.6324 7.95535 12.2513 8.13399 11.9418C8.31262 11.6324 8.64275 11.4418 9.00001 11.4418H19C19.3573 11.4418 19.6874 11.6324 19.866 11.9418C20.0447 12.2513 20.0447 12.6324 19.866 12.9418C19.6874 13.2513 19.3573 13.4418 19 13.4418H9.00001Z"
			fill={color}
		/>
	</Icon>
);

export const InboxIcon = ({ size = 35, color = "#809FB8", ...props }) => (
	<Icon
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 29 30"
		fill="none"
		{...props}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.717 29.0626C3.51097 29.0626 0.431969 25.9826 0.431969 18.7736V16.2796C0.42281 16.2261 0.418129 16.1719 0.417969 16.1176C0.418167 16.0643 0.422852 16.0111 0.431973 15.9586L0.431969 10.8076C0.431969 3.59759 3.51097 0.517578 10.717 0.517578H18.679C25.885 0.517578 28.964 3.59756 28.964 10.8076V18.7736C28.964 25.9826 25.885 29.0626 18.679 29.0626L10.717 29.0626ZM2.42297 18.7736C2.42297 24.8936 4.59897 27.0735 10.717 27.0735H18.679C24.797 27.0735 26.973 24.8955 26.973 18.7736V17.1136H22.966C22.3353 17.1061 21.7567 17.4627 21.48 18.0295L20.3 20.4066C19.6871 21.6479 18.4204 22.4314 17.036 22.4255L12.35 22.4256C10.9562 22.4645 9.67279 21.6709 9.08497 20.4066L7.89997 18.0305C7.62274 17.4637 7.04392 17.1071 6.41297 17.1146H2.42297V18.7736ZM6.41697 15.1226C7.80135 15.1166 9.06826 15.8996 9.68197 17.1406L10.863 19.5176C11.1217 20.1008 11.7126 20.4648 12.35 20.4335L17.035 20.4336C17.6656 20.4408 18.2441 20.0842 18.521 19.5176L19.7 17.1356C20.3133 15.8948 21.5799 15.1117 22.964 15.1176H26.972V10.8026C26.972 4.68155 24.796 2.50256 18.678 2.50256H10.717C4.59897 2.50256 2.42297 4.67956 2.42297 10.8026V15.1176L6.41697 15.1226ZM11.38 13.1356C10.8644 13.0893 10.4693 12.6572 10.4693 12.1396C10.4693 11.6219 10.8644 11.1898 11.38 11.1436H18.016C18.5316 11.1898 18.9266 11.6219 18.9266 12.1396C18.9266 12.6572 18.5316 13.0893 18.016 13.1356H11.38ZM12.495 9.15356C12.1181 9.18994 11.7531 9.01038 11.5519 8.6897C11.3506 8.36899 11.3478 7.96216 11.5445 7.63867C11.7411 7.31519 12.1037 7.13052 12.481 7.16156H16.9C17.4523 7.16156 17.9 7.60928 17.9 8.16156C17.9044 8.70868 17.4651 9.15607 16.918 9.16156L12.495 9.15356Z"
			fill={color}
		/>
	</Icon>
);

export const NewsFeedIcon = ({ size = 35, color = "#809FB8", ...props }) => (
	<Icon
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 29 30"
		fill="none"
		{...props}
	>
		<path
			id="newsfeed"
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8.0897 29.452C3.1737 29.452 0.345703 26.625 0.345703 21.711V8.25198C0.345703 3.33798 3.1747 0.510986 8.0897 0.510986H18.8657C23.7827 0.510986 26.6097 3.33798 26.6097 8.25198V21.714C26.6097 26.628 23.7817 29.455 18.8657 29.455L8.0897 29.452ZM2.3657 8.25198V21.714C2.3657 25.564 4.2377 27.435 8.0897 27.435H18.8657C22.7177 27.435 24.5907 25.564 24.5907 21.714V8.25198C24.5907 4.51599 22.8267 2.64297 19.2027 2.53598V12.103C19.2091 12.7721 18.8099 13.3784 18.1927 13.637C17.5787 13.9051 16.8642 13.7834 16.3737 13.327L13.4737 10.676L10.5737 13.341C10.0843 13.796 9.37212 13.9184 8.75891 13.6529C8.14571 13.3874 7.74768 12.7842 7.74469 12.116V2.53598C4.1287 2.64398 2.3657 4.51599 2.3657 8.25198ZM14.6227 8.97897L17.1817 11.334V2.534H9.7737V11.334L12.3337 8.97897C12.9826 8.38773 13.9749 8.38773 14.6237 8.97897H14.6227ZM9.4367 24.07C9.07508 24.0712 8.74041 23.8789 8.55924 23.5659C8.37808 23.253 8.37808 22.867 8.55924 22.554C8.7404 22.241 9.07507 22.0488 9.4367 22.05L20.8857 22.05C21.2473 22.0488 21.582 22.241 21.7632 22.554C21.9443 22.867 21.9443 23.2529 21.7632 23.5659C21.582 23.8789 21.2473 24.0712 20.8857 24.07H9.4367ZM15.1607 18.685C14.7991 18.6862 14.4644 18.4939 14.2832 18.1809C14.1021 17.868 14.1021 17.482 14.2832 17.169C14.4644 16.856 14.7991 16.6638 15.1607 16.6649L20.8857 16.665C21.2473 16.6638 21.582 16.856 21.7632 17.169C21.9443 17.482 21.9443 17.8679 21.7632 18.1809C21.582 18.4939 21.2473 18.6862 20.8857 18.685H15.1607Z"
			fill={color}
		/>
	</Icon>
);

export const AddIcon = ({ size = 35, color = "#809FB8", ...props }) => (
	<Icon
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 29 30"
		fill="none"
		{...props}
	>
		<path
			id="add"
			fillRule="evenodd"
			clipRule="evenodd"
			d="M9.46301 27.0162C2.89001 27.0162 0.0820312 24.2082 0.0820312 17.6352V10.3732C0.0820312 3.80019 2.89001 0.992188 9.46301 0.992188H16.725C23.298 0.992188 26.106 3.80019 26.106 10.3732V17.6352C26.106 24.2082 23.298 27.0162 16.725 27.0162H9.46301ZM1.89807 10.3732V17.6352C1.89807 23.2152 3.88306 25.1992 9.46301 25.1992H16.725C22.3049 25.1992 24.2899 23.2152 24.2899 17.6352V10.3732C24.2899 4.79317 22.3049 2.80817 16.725 2.80817H9.46301C3.88293 2.80818 1.90002 4.79417 1.90002 10.3742L1.89807 10.3732ZM12.187 18.8462V14.9122H8.25305C7.92163 14.9232 7.6106 14.7526 7.44165 14.4673C7.27271 14.182 7.27271 13.8273 7.44165 13.542C7.6106 13.2567 7.92163 13.0862 8.25293 13.0972H12.187V9.16316C12.1757 8.83156 12.3461 8.52019 12.6316 8.35103C12.917 8.18187 13.272 8.18187 13.5574 8.35103C13.8429 8.52017 14.0133 8.83156 14.002 9.16315V13.1012H17.9359C18.2673 13.0902 18.5784 13.2607 18.7473 13.546C18.9163 13.8313 18.9163 14.186 18.7473 14.4713C18.5784 14.7566 18.2673 14.9272 17.936 14.9162H14V18.8502C13.9833 19.3393 13.5819 19.7272 13.0925 19.7272C12.6031 19.7272 12.2018 19.3393 12.1851 18.8502L12.187 18.8462Z"
			fill={color}
		/>
	</Icon>
);

export const InfoCheckIcon = ({ size = 35, color = "#809FB8", ...props }) => (
	<Icon
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 29 30"
		fill="none"
		{...props}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M0.228516 11.7762C0.228516 7.33444 2.90344 3.33104 7.00647 1.63174C11.1095 -0.0674591 15.8315 0.872238 18.9714 4.01254C22.1114 7.15294 23.0505 11.8755 21.3505 15.978C19.6505 20.0806 15.6465 22.7551 11.2054 22.7542C5.14551 22.7482 0.233521 17.8365 0.228516 11.7762ZM1.7605 11.7762C1.7605 15.5972 4.0625 19.042 7.59247 20.5042C11.1224 21.9663 15.1865 21.1579 17.8875 18.4559C20.5895 15.7539 21.3975 11.6904 19.9355 8.16034C18.4725 4.63034 15.0275 2.32884 11.2065 2.32924C5.99146 2.33594 1.76648 6.56174 1.7605 11.7762ZM10.4415 15.8652V10.7552C10.4415 10.4819 10.5875 10.2293 10.8235 10.0927C11.0605 9.95604 11.3525 9.95604 11.5885 10.0927C11.8254 10.2293 11.9714 10.4819 11.9714 10.7552V15.8652C11.9714 16.1385 11.8254 16.3911 11.5885 16.5277C11.3525 16.6644 11.0605 16.6644 10.8235 16.5277C10.5875 16.3911 10.4415 16.1385 10.4415 15.8652ZM10.8185 8.63124C10.6945 8.57904 10.5804 8.50635 10.4805 8.41624C10.3905 8.31694 10.3185 8.20294 10.2665 8.07924C10.1575 7.83214 10.1575 7.55034 10.2665 7.30324C10.3155 7.17804 10.3885 7.06334 10.4805 6.96524C10.5804 6.87514 10.6945 6.80275 10.8185 6.75124C11.0655 6.64204 11.3475 6.64204 11.5945 6.75124C11.7185 6.80264 11.8325 6.87505 11.9315 6.96524C12.0234 7.06334 12.0964 7.17804 12.1455 7.30324C12.2545 7.55045 12.2545 7.83214 12.1455 8.07924C12.0525 8.33585 11.8495 8.53795 11.5935 8.63124C11.3445 8.73294 11.0665 8.73294 10.8175 8.63124H10.8185Z"
			fill={color}
		/>
	</Icon>
);

export const SearchAdminIcon = ({ size = 35, color = "#809FB8", ...props }) => (
	<Icon
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 29 30"
		fill="none"
		{...props}
	>
		<g id="svg">
			<path
				id="Shape"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10.2495 20.5C4.59951 20.5 -0.000488281 15.9 -0.000488281 10.25C-0.000488281 4.6 4.59951 0 10.2495 0C15.8995 0 20.4995 4.6 20.4995 10.25C20.4995 15.9 15.8995 20.5 10.2495 20.5ZM10.2495 1.5C5.41951 1.5 1.49951 5.43 1.49951 10.25C1.49951 15.07 5.41951 19 10.2495 19C15.0795 19 18.9995 15.07 18.9995 10.25C18.9995 5.43 15.0795 1.5 10.2495 1.5Z"
				fill="#809FB8"
			/>
			<path
				id="Shape_2"
				d="M20.5497 21.4999C20.3597 21.4999 20.1697 21.4299 20.0197 21.2799L17.0197 18.2799C16.7297 17.9899 16.7297 17.5099 17.0197 17.2199C17.3097 16.9299 17.7897 16.9299 18.0797 17.2199L21.0797 20.2199C21.3697 20.5099 21.3697 20.9899 21.0797 21.2799C20.9297 21.4299 20.7397 21.4999 20.5497 21.4999Z"
				fill={color}
			/>
		</g>
	</Icon>
);

export const SettingsIcon = ({ size = 35, color = "#809FB8", ...props }) => (
	<Icon
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 29 30"
		fill="none"
		{...props}
	>
		<path
			id="settings"
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8.59997 26.7639L6.28997 25.4478C5.47346 24.9881 4.87478 24.2209 4.62738 23.3172C4.37998 22.4134 4.50442 21.4482 4.97297 20.6368C5.34305 20.1611 5.4445 19.5294 5.24197 18.9617C4.84591 18.5012 4.24424 18.2714 3.64198 18.3508C1.68731 18.358 0.0952072 16.7824 0.0819702 14.8278V12.4888C0.0952339 10.5342 1.68734 8.95868 3.64201 8.96588C4.24426 9.0451 4.84591 8.81537 5.24197 8.3548C5.45158 7.78778 5.34956 7.15253 4.97297 6.67975C4.50533 5.87152 4.38004 4.90997 4.62497 4.00885C4.86282 3.09729 5.46484 2.32355 6.28997 1.86884L8.61397 0.552856C10.1597 -0.332458 12.1296 0.181396 13.046 1.70886L13.207 1.97485C14 3.33087 15.087 3.33087 15.88 1.97485L16.028 1.72284C16.941 0.181885 18.926 -0.334228 20.474 0.566833L22.784 1.88281C23.6009 2.3421 24.1999 3.10931 24.4473 4.01318C24.6948 4.91711 24.57 5.88251 24.101 6.69379C23.7309 7.16949 23.6294 7.80133 23.832 8.36884C24.228 8.82928 24.8297 9.05902 25.432 8.97968C27.3867 8.97235 28.9788 10.5479 28.992 12.5026V14.8417C28.9782 16.7962 27.3864 18.3714 25.432 18.3647C24.8297 18.2853 24.228 18.5151 23.832 18.9756C23.6221 19.5425 23.7241 20.1779 24.101 20.6507C24.5701 21.462 24.6948 22.4273 24.4474 23.3312C24.1999 24.2352 23.6009 25.0024 22.784 25.4617L20.46 26.7778C19.9629 27.0546 19.4039 27.2012 18.835 27.2038C18.5498 27.2011 18.2659 27.1652 17.989 27.0969C17.1645 26.8793 16.4566 26.3506 16.014 25.6218L15.853 25.3558C15.061 23.9998 13.973 23.9998 13.18 25.3558L13.032 25.6088C12.5983 26.3483 11.8873 26.884 11.057 27.0969C10.7814 27.171 10.4973 27.2087 10.212 27.2089C9.64433 27.2087 9.08733 27.0549 8.59997 26.7639H8.59997ZM9.62097 2.26385L7.29697 3.59283C6.94135 3.79468 6.68054 4.12964 6.57197 4.52386C6.46428 4.91345 6.5176 5.32996 6.71997 5.67987C7.47062 6.76239 7.57328 8.16754 6.98797 9.34784C6.24436 10.447 4.9668 11.0609 3.64397 10.9548C3.23583 10.9507 2.84303 11.1102 2.55303 11.3973C2.26303 11.6845 2.0999 12.0757 2.09997 12.4839V14.8229C2.1044 15.6712 2.79568 16.3553 3.64397 16.3509C4.96714 16.2454 6.24469 16.8602 6.98797 17.9599C7.57306 19.1402 7.4704 20.5452 6.71997 21.6279C6.51683 21.9775 6.46347 22.3943 6.57197 22.7839C6.67917 23.1751 6.93457 23.5091 7.28397 23.715L9.60798 25.0309C9.8862 25.199 10.2207 25.247 10.535 25.164C10.8548 25.0804 11.1295 24.8755 11.301 24.593L11.449 24.3399C11.9621 23.0937 13.1767 22.2802 14.5245 22.2802C15.8723 22.2802 17.0868 23.0937 17.6 24.3399L17.748 24.593C18.0944 25.1644 18.8314 25.3581 19.414 25.0309L21.738 23.702C22.0935 23.5005 22.3544 23.166 22.463 22.7719C22.5703 22.3823 22.517 21.9659 22.315 21.6159C21.5636 20.5336 21.4605 19.1282 22.046 17.9479C22.7893 16.8484 24.067 16.2341 25.39 16.3399C25.7983 16.3442 26.1913 16.185 26.4815 15.8978C26.7717 15.6105 26.935 15.2192 26.935 14.8109V12.4719C26.93 11.6235 26.2384 10.9395 25.39 10.9439C24.067 11.0497 22.7894 10.4354 22.046 9.33588C21.4605 8.15558 21.5636 6.75018 22.315 5.66791C22.5172 5.31757 22.5705 4.90082 22.463 4.51093C22.3558 4.11975 22.1004 3.78577 21.751 3.5799L19.427 2.26392C18.838 1.92108 18.0828 2.11646 17.734 2.7019L17.586 2.9549C17.0731 4.20178 15.8582 5.01575 14.51 5.01575C13.1617 5.01575 11.9468 4.20178 11.434 2.9549L11.286 2.6889C11.06 2.32196 10.6589 2.09943 10.228 2.10193C10.0143 2.10284 9.80456 2.1601 9.61997 2.26782L9.62097 2.26385ZM9.48697 13.6548C9.46548 11.613 10.679 9.76007 12.5594 8.96368C14.4398 8.1673 16.6149 8.58502 18.0665 10.0214C19.5181 11.4577 19.9588 13.6282 19.1824 15.517C18.406 17.4057 16.5661 18.6387 14.524 18.6389C11.7585 18.6528 9.50415 16.4244 9.48597 13.6589L9.48697 13.6548ZM11.502 13.6548C11.4894 14.8798 12.2177 15.9913 13.3458 16.4688C14.474 16.9464 15.7789 16.6955 16.6496 15.8337C17.5204 14.972 17.7847 13.6697 17.3188 12.5367C16.8529 11.4036 15.7491 10.6639 14.524 10.6639C12.8622 10.6566 11.5088 11.997 11.5 13.6588L11.502 13.6548Z"
			fill={color}
		/>
	</Icon>
);

export const ProfileIcon = ({ size = 35, color = "#809FB8", ...props }) => (
	<Icon
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 29 30"
		fill="none"
		{...props}
	>
		<path
			id="profile"
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.486 28.198C8.96883 28.2324 7.45424 28.055 5.98603 27.671H5.98603C1.94603 26.571 0.0640259 23.565 0.0640259 18.2V10.459C0.0640259 3.45001 3.18003 0.458984 10.482 0.458984H18.548C25.848 0.458984 28.966 3.44897 28.966 10.459V18.2C28.966 23.542 27.099 26.549 23.091 27.657L23.052 27.668C21.5839 28.0529 20.0693 28.2309 18.552 28.197L10.486 28.198ZM7.42103 26.017C8.43283 26.194 9.45893 26.2764 10.486 26.2629H18.552C19.5791 26.2764 20.6052 26.194 21.617 26.017C20.901 23.545 17.966 21.709 14.517 21.709C11.8876 21.5842 9.37799 22.8173 7.87003 24.975L7.84903 25.011C7.6662 25.3278 7.52248 25.6656 7.42102 26.017L7.42103 26.017ZM23.542 25.442C25.921 24.385 26.954 22.151 26.954 18.201V10.46C26.954 4.50696 24.754 2.39594 18.554 2.39594H10.486C4.28603 2.39594 2.08603 4.50592 2.08603 10.46V18.201C2.08603 22.15 3.11903 24.385 5.49603 25.441C5.76965 24.5649 6.21953 23.7539 6.81802 23.058L6.83302 23.041L6.84202 23.03C8.74385 20.9608 11.4246 19.7816 14.235 19.7779L14.778 19.778C17.4594 19.7827 20.0307 20.8453 21.933 22.735L21.944 22.7459L21.954 22.7559L21.978 22.7819C22.6583 23.4998 23.1758 24.3559 23.495 25.2919C23.511 25.342 23.527 25.392 23.542 25.442ZM9.90003 15.898C9.12487 14.9342 8.70158 13.7349 8.70003 12.498C8.82747 9.46674 11.2562 7.0387 14.2875 6.91217C17.3188 6.78571 19.9415 9.00293 20.321 12.013C20.3357 12.1724 20.343 12.3337 20.343 12.497C20.343 12.7949 20.3186 13.0912 20.2699 13.3841C19.7572 16.1451 17.33 18.1353 14.522 18.097C12.7271 18.1052 11.026 17.2959 9.90003 15.898ZM14.521 16.161C15.1097 16.1614 15.6908 16.0287 16.221 15.773C17.0924 15.3561 17.7684 14.6177 18.107 13.713C18.2495 13.3234 18.3223 12.9117 18.322 12.4969C18.3153 11.3323 17.7456 10.2429 16.793 9.573C15.256 8.47821 13.1569 8.63458 11.799 9.94507C11.1078 10.6141 10.7161 11.5341 10.713 12.496C10.7276 13.9349 11.5831 15.2321 12.9 15.8121C13.4087 16.0424 13.9607 16.161 14.519 16.16L14.521 16.161Z"
			fill={color}
		/>
	</Icon>
);

export const LightDarkIcon = ({ size = 35, color = "#809FB8", ...props }) => (
	<Icon
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 29 30"
		fill="none"
		{...props}
	>
		<path
			id="icons-2"
			fillRule="evenodd"
			clipRule="evenodd"
			d="M25.9588 16.6757C26.0278 16.4434 26.0074 16.1937 25.9018 15.9757C25.7936 15.7545 25.6083 15.5807 25.3808 15.4867C25.1509 15.3912 24.8946 15.381 24.6578 15.4576C22.75 16.0865 20.701 16.1504 18.7578 15.6416C16.8247 15.1382 15.0818 14.0787 13.7448 12.5946C12.4243 11.129 11.5764 9.29944 11.3118 7.3446C11.0516 5.396 11.3892 3.41431 12.2798 1.66162C12.3889 1.44482 12.4128 1.19507 12.3468 0.96167C12.2782 0.725708 12.1252 0.523193 11.9168 0.392822C11.7058 0.260254 11.4541 0.20813 11.2078 0.24585C7.93283 0.736939 4.95855 2.43127 2.86578 4.99768C-1.42604 10.2634 -0.808872 17.9753 4.26578 22.4916C8.99746 26.7216 16.0396 27.0757 21.1718 23.3417C23.4443 21.6971 25.1239 19.3616 25.9598 16.6837L25.9588 16.6757ZM13.2638 23.9247C10.6193 23.922 8.05828 22.9984 6.02079 21.3126C4.01039 19.6514 2.6642 17.3228 2.22779 14.7516C1.80032 12.1898 2.3181 9.55994 3.68478 7.35144C5.07103 5.11792 7.20116 3.44531 9.69978 2.62854C9.36008 3.72986 9.18815 4.8761 9.18979 6.02856C9.20076 9.20728 10.4937 12.2471 12.7758 14.4597C15.5714 17.1682 19.4758 18.408 23.3218 17.8086C22.3813 19.6469 20.9474 21.1868 19.1808 22.2556C17.3958 23.3374 15.35 23.913 13.2628 23.9207L13.2638 23.9247Z"
			fill={color}
		/>
	</Icon>
);

export const AnalyticsIcon = ({ size = 35, color = "#809FB8", ...props }) => (
	<Icon
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 29 30"
		fill="none"
		{...props}
	>
		<path
			id="analytics"
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.486 29.4419C3.18599 29.4419 0.0679932 26.3189 0.0679932 19.0089V10.9319C0.0679932 3.62192 3.18599 0.497925 10.486 0.497925H18.552C25.852 0.497925 28.97 3.62192 28.97 10.9319V19.0089C28.97 26.3189 25.852 29.4419 18.552 29.4419H10.486ZM2.08599 10.9319V19.0089C2.08599 25.2149 4.28599 27.4229 10.486 27.4229H18.552C24.752 27.4229 26.952 25.2139 26.952 19.0089V10.9319C26.952 4.72592 24.747 2.51791 18.552 2.51791H10.486C4.28799 2.52094 2.08399 4.72794 2.08399 10.9349L2.08599 10.9319ZM17.06 23.2529H6.88399C6.32816 23.2486 5.8788 22.7988 5.875 22.2429L5.87499 15.3499C5.87824 13.9475 7.01345 12.8109 8.41592 12.8059H10.956V9.24191C10.9592 7.83951 12.0944 6.70288 13.4969 6.69791H15.54C16.9425 6.70285 18.0777 7.83945 18.081 9.24191V15.1119H20.623C22.0261 15.1158 23.1622 16.2528 23.165 17.6559V22.2419C23.1655 22.5098 23.0594 22.7668 22.8701 22.9563C22.6808 23.1458 22.4239 23.2522 22.156 23.2519L17.06 23.2529ZM21.147 21.2329V17.6519C21.147 17.362 20.9119 17.127 20.622 17.127H18.081V21.2329H21.147ZM16.052 21.2329V16.1169C16.0521 16.066 16.0561 16.0152 16.064 15.9649L16.064 9.24191C16.064 8.95236 15.8295 8.71747 15.54 8.71692H13.5C13.2104 8.71747 12.976 8.95236 12.976 9.24191L12.976 13.6509C12.9854 13.7064 12.9901 13.7626 12.99 13.8189V21.2369L16.052 21.2329ZM7.89199 15.3629V21.2329H10.956V14.8419H8.41599C8.12759 14.8425 7.89363 15.0756 7.89199 15.364L7.89199 15.3629Z"
			fill={color}
		/>
	</Icon>
);

export const MarketIcon = ({ size = 35, color = "#809FB8", ...props }) => (
	<Icon
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 29 30"
		fill="none"
		{...props}
	>
		<path
			id="market"
			fillRule="evenodd"
			clipRule="evenodd"
			d="M17.39 29.4418H10.549C4.04903 29.4418 1.28703 26.6008 1.28703 19.9638V13.9198C1.28693 13.8355 1.29734 13.7515 1.31802 13.6698C0.584141 12.5809 0.260277 11.267 0.404018 9.96179L0.759022 6.26178C1.31202 2.15479 3.11402 0.499756 6.98202 0.499756H21.153C25.021 0.499756 26.824 2.15479 27.363 6.22076L27.732 9.96277C27.8729 11.2453 27.5628 12.5369 26.855 13.6157C26.8862 13.7144 26.9021 13.8173 26.902 13.9208V19.9648C26.915 26.6018 24.139 29.4428 17.653 29.4428L17.39 29.4418ZM16.404 27.4218V25.0658C16.404 23.3658 15.76 22.7108 14.104 22.7108C12.448 22.7108 11.804 23.3708 11.804 25.0658V27.4218H16.404ZM3.26003 19.9678C3.26003 25.2198 4.99503 27.2388 9.82502 27.4138V25.0698C9.82502 22.2428 11.338 20.6948 14.101 20.6948C16.864 20.6948 18.377 22.2428 18.377 25.0698V27.4128C23.197 27.2349 24.929 25.2128 24.929 19.9678V15.3679C22.6235 16.5881 19.7727 15.9458 18.213 13.8549C17.2903 15.2143 15.7426 16.0146 14.1 15.9819C12.6862 16.0006 11.3347 15.4008 10.4 14.3398C10.2455 14.164 10.1035 13.9775 9.97503 13.7819C8.44355 15.9075 5.58769 16.5933 3.25803 15.3948L3.26003 19.9678ZM22.403 13.9678C23.3681 13.9831 24.2931 13.5823 24.942 12.8679C25.5812 12.1247 25.8816 11.1487 25.771 10.1749L25.403 6.47485C24.995 3.43286 24.035 2.52985 21.153 2.52985H18.287L19.06 10.4188C19.0828 10.6514 19.0911 10.8853 19.085 11.1188C19.4008 12.7187 20.7708 13.8945 22.4 13.9638L22.403 13.9678ZM2.72003 6.49182L2.36503 10.1668C2.24883 11.1412 2.54994 12.1194 3.19403 12.8598C3.84019 13.5787 4.7676 13.9803 5.73403 13.9598C7.46552 13.8909 8.88885 12.5712 9.08803 10.8498L9.90403 2.51678H6.98203C4.10003 2.51984 3.14103 3.40985 2.72003 6.49182ZM11.14 10.6108C11.0361 11.4677 11.2991 12.3284 11.864 12.9808C12.45 13.5873 13.2572 13.9297 14.1005 13.9297C14.9439 13.9297 15.751 13.5873 16.337 12.9808C16.7966 12.4493 17.0581 11.7751 17.077 11.0728L17.077 11.0558L16.244 2.51978H11.929L11.14 10.6108Z"
			fill={color}
		/>
	</Icon>
);

export const WalletIcon = ({ size = 35, color = "#809FB8", ...props }) => (
	<Icon
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 29 30"
		fill="none"
		{...props}
	>
		<path
			id="wallet"
			fillRule="evenodd"
			clipRule="evenodd"
			d="M8.40501 25.0708C3.97301 25.0708 0.997009 21.9518 0.997009 17.3068V7.85483C0.997009 3.69482 3.44501 0.684814 7.24601 0.184814C7.62936 0.123718 8.01682 0.09198 8.40501 0.0898438L20 0.0898132C20.3752 0.0868225 20.75 0.113586 21.121 0.16983C24.921 0.629791 27.407 3.65479 27.407 7.85379V9.04379C28.2081 9.45767 28.7069 10.2882 28.696 11.1898V13.9718C28.7053 14.8745 28.2072 15.706 27.407 16.1238L27.407 17.2928C27.407 21.9508 24.432 25.0708 19.999 25.0708L8.40501 25.0708ZM7.50501 2.18283C4.67101 2.56082 2.93201 4.72183 2.93201 7.85483V17.3068C2.93201 20.7908 5.08301 23.0458 8.40701 23.0458H20C23.324 23.0458 25.476 20.7908 25.476 17.3068V16.3618H23.917C22.3942 16.3426 21.0287 15.4195 20.4433 14.0135C19.8579 12.6075 20.1648 10.9881 21.224 9.89383C21.8749 9.19107 22.7911 8.79413 23.749 8.79984H25.475V7.85483C25.475 4.69482 23.71 2.52081 20.85 2.16983C20.5686 2.12607 20.2837 2.108 19.999 2.11584H8.40501C8.10216 2.1174 7.79979 2.1398 7.50002 2.18286L7.50501 2.18283ZM22.105 12.7158C22.2103 13.6371 22.9938 14.3304 23.921 14.3228H26.446C26.4713 14.3228 26.4967 14.3228 26.522 14.3228C26.672 14.2711 26.7715 14.1284 26.768 13.9698V11.1878C26.768 10.9881 26.6076 10.8255 26.408 10.8228H23.762C23.3222 10.8171 22.9007 10.999 22.603 11.3228L22.59 11.3358L22.561 11.3658C22.442 11.4942 22.3426 11.6394 22.266 11.7968C22.1312 12.0833 22.0739 12.4002 22.1 12.7158H22.105ZM8.40501 9.54282C7.86303 9.51874 7.43602 9.07233 7.43602 8.52982C7.43602 7.9873 7.86303 7.54089 8.40501 7.51682H16.135C16.677 7.54089 17.104 7.9873 17.104 8.52982C17.104 9.07233 16.677 9.51874 16.135 9.54282H8.40501Z"
			fill={color}
		/>
	</Icon>
);

export const ArrowLeftCirleIcon = (props: any) => (
	<Icon
		fill="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M16.828 11.736a27.683 27.683 0 0 1-.198-.019 9.873 9.873 0 0 0-.83-.057 813.608 813.608 0 0 0-4.187-.037 850.334 850.334 0 0 1-3.131-.025 1.463 1.463 0 0 1-.185-.019l-.041-.006.053-.057c.06-.066.11-.12.162-.172a10.121 10.121 0 0 0 1.819-2.54l.015-.028a1.21 1.21 0 0 0 .109-.257.353.353 0 0 0-.01-.16.619.619 0 0 1-.013-.062l-.005-.042-.042.008a.718.718 0 0 1-.074.01.304.304 0 0 0-.178.051c-.058.055-.11.116-.155.181-.035.05-.073.097-.115.141-.338.346-.676.69-1.016 1.035-.436.443-.871.887-1.305 1.332a4.047 4.047 0 0 0-.522.612c-.218.339-.185.62.111.943.284.309.582.643.91 1.023.24.276.477.554.714.832.257.302.515.603.774.903.1.12.215.226.345.313a.32.32 0 0 0 .16.039.229.229 0 0 0 .15-.044.323.323 0 0 0 .057-.313 2.116 2.116 0 0 0-.248-.361l-.062-.08-.896-1.152-1.043-1.344a.87.87 0 0 1-.076-.127l-.016-.03.566.028c.46.023.895.046 1.335.063.936.035 2.303.07 3.625.104 1.138.028 2.212.056 3.002.083.154.004.31-.007.462-.033.233-.037.351-.157.35-.356 0-.223-.132-.357-.37-.38Z" />
		<path d="M2.938 9.451c-.832 3.27-.103 6.155 2.167 8.575l.18.186c1.22 1.22 2.738 1.972 3.942 2.496.517.226 3.167.5 3.885.393 4.262-.636 7.066-3.04 8.043-7.062.187-.788.28-1.595.277-2.405.005-1.907-.798-4.124-2.454-5.784-.17-.141-.34-.287-.505-.429-.356-.306-.724-.623-1.11-.894-2.943-2.071-6-2.083-9.088-.984-2.796.993-4.591 2.982-5.337 5.908Zm5.349-4.93c2.709-1.125 5.427-1.324 8.078.362.485.309 1.777 1.353 1.98 1.51l.013.01.011.012c1.034 1.096 2.219 3.102 2.192 5.163a10.516 10.516 0 0 1-.355 2.61c-.673 2.448-2.283 4.232-4.921 5.452-2.683 1.284-6.53-.014-7.553-.69a11.952 11.952 0 0 1-2.926-2.844c-1.263-1.788-1.546-4.358-.868-6.707a7.617 7.617 0 0 1 4.349-4.878Z" />
	</Icon>
);

export const DownArrowIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M6 5h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4Z" />
		<path d="m14.5 10.75-2.5 2.5-2.5-2.5" />
	</Icon>
);

export const BellIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M14.857 19.428c-.762 1.143-1.714 1.715-2.857 1.715-1.143 0-2.095-.572-2.857-1.715" />
		<path d="M17.81 17.714H6.19a1.887 1.887 0 0 1-1.619-2.857 12.03 12.03 0 0 0 1.715-6.19V7.429a4.571 4.571 0 0 1 4.571-4.57h2.286a4.571 4.571 0 0 1 4.571 4.57v1.24c0 2.18.593 4.32 1.715 6.189a1.886 1.886 0 0 1-1.618 2.857Z" />
	</Icon>
);

export const ChevronDownIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M16.571 9.714 12 14.286 7.429 9.714" />
	</Icon>
);

export const CheveronUpIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M7.429 14.286 12 9.714l4.571 4.572" />
	</Icon>
);

export const ArrowUpAdminIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M16.571 8.571 12 4 7.395 8.571" />
		<path d="M12 4v14.857" />
	</Icon>
);

export const ArrowDownIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M7.429 15.427 12 20l4.571-4.573" />
		<path d="M12 20V5.143" />
	</Icon>
);

export const ArrowDownAdminIcon = ({ size = 35, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05 2.101 2.101 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17Z" />
	</Icon>
);

export const TraskIcon = ({ size = 35, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M9.96 3.6h3.6a.6.6 0 0 1 .6.6v1.2h-4.8V4.2a.6.6 0 0 1 .6-.6Zm5.4 1.8V4.2a1.8 1.8 0 0 0-1.8-1.8h-3.6a1.8 1.8 0 0 0-1.8 1.8v1.2H5.168a.6.6 0 0 0-.012 0H3.96a.6.6 0 0 0 0 1.2h.646L5.63 19.392A2.4 2.4 0 0 0 8.022 21.6h7.476a2.4 2.4 0 0 0 2.393-2.208L18.915 6.6h.645a.6.6 0 0 0 0-1.2h-1.194a.61.61 0 0 0-.012 0H15.36Zm2.35 1.2-1.015 12.696a1.2 1.2 0 0 1-1.197 1.104H8.022a1.2 1.2 0 0 1-1.196-1.104L5.811 6.6H17.71ZM8.726 7.8a.6.6 0 0 1 .633.564l.6 10.2a.6.6 0 0 1-1.197.072l-.602-10.2a.6.6 0 0 1 .564-.636h.002Zm6.07 0a.6.6 0 0 1 .563.636l-.6 10.2a.6.6 0 1 1-1.197-.072l.6-10.2a.6.6 0 0 1 .633-.564Zm-3.036 0a.6.6 0 0 1 .6.6v10.2a.6.6 0 1 1-1.2 0V8.4a.6.6 0 0 1 .6-.6Z" />
	</Icon>
);
export const TimeIcon = ({ size = 35, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 4.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 1 0 0-14.5z" />
		<path d="M12 8v4l2 2" />
	</Icon>
);

export const TagIcon = ({ size = 35, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			fill="currentColor"
			stroke="none"
			d="M15 8a1 1 0 1 0 0 2 1 1 0 1 0 0-2z"
		/>
		<path d="M12 4.75h7.25V12l-6.697 6.67a2 2 0 0 1-2.87-.047L5.29 13.94a2 2 0 0 1 .072-2.81L12 4.75Z" />
	</Icon>
);

export const WarningIcon = ({ size = 46, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 13v2" />
		<path
			fill={color}
			stroke="none"
			d="M12 8a1 1 0 1 0 0 2 1 1 0 1 0 0-2z"
		/>
		<path d="M12 4.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 1 0 0-14.5z" />
	</Icon>
);

export const MinusIcon = ({ size = 46, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M18.25 12.25H5.75" />
	</Icon>
);

export const GiftIcon = ({ size = 46, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M4 13h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7Z" />
		<path d="M2 9h20v4H2V9Z" />
		<path d="M12 5v17" />
		<path d="M12 5.5A3.5 3.5 0 1 0 8.5 9" />
		<path d="M15.5 9A3.5 3.5 0 1 0 12 5.5" />
	</Icon>
);

export const PictureIcon = ({ size = 46, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M6.286 4h11.428A2.286 2.286 0 0 1 20 6.286v11.428A2.286 2.286 0 0 1 17.714 20H6.286A2.286 2.286 0 0 1 4 17.714V6.286A2.286 2.286 0 0 1 6.286 4Z"
			clipRule="evenodd"
		/>
		<path d="M20 15.429 16.571 12l-3.428 3.411" />
		<path d="M17.714 20 7.43 9.714 4 13.143" />
		<path
			fill={color}
			stroke="none"
			d="M16 9.143a1.143 1.143 0 1 0 0-2.286 1.143 1.143 0 0 0 0 2.286Z"
		/>
	</Icon>
);

export const OrderIcon = ({ size = 32, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M4 6h2v2H4V6Zm0 5h2v2H4v-2Zm0 5h2v2H4v-2Zm16-8V6H8.023v2H20ZM8 11h12v2H8v-2Zm0 5h12v2H8v-2Z" />
	</Icon>
);
export const CheckedIcon = ({ size = 35, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M20 6 9 17l-5-5"></path>
	</Icon>
);
export const CarIcon = ({ size = 46, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M19.15 8a2 2 0 0 0-1.72-1H15V5a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 1 1.73 3.503 3.503 0 1 0 7 .27h3.1a3.48 3.48 0 0 0 6.9 0 2 2 0 0 0 2-2v-3a1.07 1.07 0 0 0-.14-.52L19.15 8ZM15 9h2.43l1.8 3H15V9ZM6.5 19a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm10 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
	</Icon>
);
export const DownloadIcon = ({ size = 32, color = "currentColor", ...props }) => (
	<svg
		width={size}
		height={size}
		fill={color}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m12 16 4-5h-3V4h-2v7H8l4 5Z" />
		<path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7Z" />
	</svg>
);

export const PlusCircleIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M11.429 21.714c5.072 0 9.143-4.03 9.143-9.102S16.5 3.43 11.428 3.43s-9.143 4.111-9.143 9.183 4.07 9.102 9.143 9.102Z"
			clipRule="evenodd"
		/>
		<path d="M6.857 12.571H16" />
		<path
			d="M11.429 17.207V8v9.207Z"
			clipRule="evenodd"
		/>
	</Icon>
);

export const Annotation = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M7 8h10M7 12h4m1 8-4-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3l-4 4Z" />
	</Icon>
);
export const CopyIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M4.75 6.75a2 2 0 0 1 2-2h10.5a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-2.625l-2.625 3-2.625-3H6.75a2 2 0 0 1-2-2v-7.5Z" />
		<path d="M9.5 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
		<path d="M12.5 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
		<path d="M15.5 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
	</Icon>
);
export const Thumbs = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M6.5 6.216v-2.31c0-.776.63-1.406 1.406-1.406h12.188c.776 0 1.406.63 1.406 1.406v12.188c0 .776-.63 1.406-1.406 1.406h-2.336" />
		<path d="M16.094 6.5H3.906C3.13 6.5 2.5 7.13 2.5 7.906v12.188c0 .776.63 1.406 1.406 1.406h12.188c.776 0 1.406-.63 1.406-1.406V7.906c0-.776-.63-1.406-1.406-1.406Z" />
	</Icon>
);

export const AddAdminIcon = ({ size = 35, color = "currentColor", ...props }) => (
	<Icon
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 28 27"
		fill="none"
		{...props}
	>
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M10.3634 26.4156C3.79041 26.4156 0.982422 23.6076 0.982422 17.0346V9.7726C0.982422 3.1996 3.79041 0.391602 10.3634 0.391602H17.6254C24.1984 0.391602 27.0063 3.1996 27.0063 9.7726V17.0346C27.0063 23.6076 24.1984 26.4156 17.6254 26.4156H10.3634ZM2.79846 9.77258V17.0346C2.79846 22.6146 4.78345 24.5996 10.3634 24.5996H17.6254C23.2053 24.5996 25.1903 22.6146 25.1903 17.0346V9.77258C25.1903 4.19258 23.2063 2.20758 17.6254 2.20758H10.3634C4.78333 2.2076 2.80042 4.19359 2.80042 9.77359L2.79846 9.77258ZM13.0874 18.2456V14.3116H9.15344C8.82202 14.3226 8.51099 14.1521 8.34204 13.8667C8.1731 13.5814 8.1731 13.2267 8.34204 12.9414C8.51099 12.6561 8.82202 12.4856 9.15332 12.4966H13.0874V8.56258C13.076 8.23097 13.2465 7.9196 13.532 7.75044C13.8174 7.58128 14.1724 7.58128 14.4578 7.75044C14.7433 7.91959 14.9137 8.23097 14.9023 8.56256V12.5006H18.8363C19.3257 12.5168 19.7141 12.9183 19.7141 13.4081C19.7141 13.8979 19.3257 14.2994 18.8363 14.3156H14.9004V18.2496C14.9117 18.5812 14.7413 18.8926 14.4558 19.0617C14.1704 19.2309 13.8154 19.2309 13.53 19.0617C13.2445 18.8926 13.0741 18.5812 13.0854 18.2496L13.0874 18.2456Z"
			fill={color}
		/>
	</Icon>
);

export const ArrowTopRightIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
	</Icon>
);

export const Chat = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M16.571 15.429v-8h-8" />
		<path d="M16.571 7.429 7.43 16.57" />
	</Icon>
);

export const EditIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.862 9.862 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
	</Icon>
);
export const Share = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M19.429 4.571a2.424 2.424 0 0 1 0 3.429L8.57 18.857 4 20l1.143-4.507L16.004 4.576a2.418 2.418 0 0 1 3.274-.143l.15.138Z"
			clipRule="evenodd"
		/>
		<path d="m17.714 7.429 1.143 1.143" />
	</Icon>
);

export const AirplayIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 1 1 0-2.684m0 2.684 6.632 3.316m-6.632-6 6.632-3.316m0 9.316a3 3 0 1 0 5.368 2.684 3 3 0 0 0-5.368-2.684Zm0-9.316a3.003 3.003 0 0 0 4.025 1.341 3 3 0 1 0-4.025-1.341Z" />
	</Icon>
);

export const Check = ({ size = 7, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m5 13 4 4L19 7" />
	</Icon>
);

export const StarNocolor = ({ size = 7, strokeWidth = 1.5, color = "#c7c7ca", ...props }) => (
	<Icon
		stroke="#c7c7ca"
		fill="#c7c7ca"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		color="#FFC400"
		width={size}
		height={size}
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M6.255 20.452c-.464.237-.99-.18-.896-.71l.996-5.677-4.227-4.027c-.395-.377-.19-1.065.34-1.14l5.877-.835 2.62-5.192a.616.616 0 0 1 1.113 0L14.7 8.063l5.878.835c.529.075.734.763.338 1.14l-4.226 4.027.996 5.676c.093.532-.432.948-.896.71l-5.269-2.707-5.267 2.708h.002Z" />
	</Icon>
);

export const Star = ({ size = 30, strokeWidth = 1.5, color = "rgb(255, 196, 0)", ...props }) => (
	<Icon
		stroke="currentColor"
		fill="currentColor"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		color="#FFC400"
		width={size}
		height={size}
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M6.255 20.452c-.464.237-.99-.18-.896-.71l.996-5.677-4.227-4.027c-.395-.377-.19-1.065.34-1.14l5.877-.835 2.62-5.192a.616.616 0 0 1 1.113 0L14.7 8.063l5.878.835c.529.075.734.763.338 1.14l-4.226 4.027.996 5.676c.093.532-.432.948-.896.71l-5.269-2.707-5.267 2.708h.002Z" />
	</Icon>
);
export const Star_Half = ({ size = 7, strokeWidth = 1.5, color = "rgb(255, 196, 0)", ...props }) => (
	<Icon
		stroke="rgb(255, 196, 0)"
		fill="rgb(255, 196, 0)"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		// color="#FFC400"
		width={size}
		height={size}
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m8.345 8.062 2.62-5.192a.619.619 0 0 1 .555-.35.62.62 0 0 1 .558.35l2.62 5.192 5.878.836a.644.644 0 0 1 .544.606.659.659 0 0 1-.204.534l-4.228 4.027.996 5.676c.094.531-.432.948-.895.71l-5.27-2.707-5.266 2.707a.628.628 0 0 1-.175.06c-.41.072-.802-.305-.72-.77l.996-5.676-4.227-4.027a.66.66 0 0 1-.206-.484.69.69 0 0 1 .102-.362.616.616 0 0 1 .444-.294l5.878-.836Zm3.175 8.29a.61.61 0 0 1 .278.067l4.423 2.273-.832-4.748a.677.677 0 0 1 .194-.606l3.488-3.324-4.862-.692a.63.63 0 0 1-.472-.345l-2.216-4.39-.001.004v11.761Z" />
	</Icon>
);

export const ChromeIcon = ({ size = 35, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
		<path d="M12 8a4 4 0 1 0 0 8 4 4 0 1 0 0-8z" />
		<path d="M21.17 8H12" />
		<path d="M3.95 6.06 8.54 14" />
		<path d="M10.88 21.94 15.46 14" />
	</Icon>
);

export const LaptopIcon = ({ size = 35, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M3 19h18" />
		<path d="M18 6H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Z" />
	</Icon>
);

export const ComputerIcon = ({ size = 35, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			fillRule="evenodd"
			d="M3.6 6A2.4 2.4 0 0 1 6 3.6h12A2.4 2.4 0 0 1 20.4 6v9.6A2.4 2.4 0 0 1 18 18h-2.664l.148.587.964.965A1.2 1.2 0 0 1 15.6 21.6H8.4a1.2 1.2 0 0 1-.848-2.048l.964-.965.148-.587H6a2.4 2.4 0 0 1-2.4-2.4V6Zm6.925 8.4H6V6h12v8.4h-7.475Z"
			clipRule="evenodd"
		/>
	</Icon>
);

export const SmartPhoneIcon = ({ size = 35, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect
			width={14}
			height={20}
			x={5}
			y={2}
			rx={2}
			ry={2}
		/>
		<path d="M12 18h.01" />
	</Icon>
);

export const EmailIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M2.4 7.2a2.4 2.4 0 0 1 2.4-2.4h14.4a2.4 2.4 0 0 1 2.4 2.4v9.6a2.4 2.4 0 0 1-2.4 2.4H4.8a2.4 2.4 0 0 1-2.4-2.4V7.2ZM4.8 6a1.2 1.2 0 0 0-1.2 1.2v.26L12 12.5l8.4-5.04V7.2A1.2 1.2 0 0 0 19.2 6H4.8Zm15.6 2.86-5.65 3.39 5.65 3.476V8.859Zm-.04 8.25-6.768-4.165L12 13.9l-1.59-.954-6.77 4.164A1.2 1.2 0 0 0 4.8 18h14.4a1.2 1.2 0 0 0 1.159-.888ZM3.6 15.727l5.65-3.477L3.6 8.86v6.867Z" />
	</Icon>
);

export const GlobeIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 2.25A9.75 9.75 0 0 0 2.25 12c0 5.384 4.365 9.75 9.75 9.75 5.384 0 9.75-4.366 9.75-9.75 0-5.385-4.366-9.75-9.75-9.75Z" />
		<path d="M12 2.25c-2.722 0-5.28 4.365-5.28 9.75 0 5.384 2.56 9.75 5.281 9.75 2.722 0 5.282-4.366 5.282-9.75 0-5.385-2.56-9.75-5.282-9.75Z" />
		<path d="M5.5 5.5C7.293 6.773 9.55 7.532 12 7.532c2.451 0 4.708-.76 6.5-2.032" />
		<path d="M18.5 18.5c-1.792-1.272-4.049-2.031-6.5-2.031-2.45 0-4.707.759-6.5 2.031" />
		<path d="M12 2.25v19.5" />
		<path d="M21.75 12H2.25" />
	</Icon>
);

export const AppIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M18 5v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Z" />
		<path d="M12 18v.001" />
		<path d="M9 6v.001" />
		<path d="M12 6v.001" />
		<path d="M15 6v.001" />
		<path d="M9 9v.001" />
		<path d="M12 9v.001" />
		<path d="M15 9v.001" />
		<path d="M9 12v.001" />
		<path d="M12 12v.001" />
	</Icon>
);

export const StarHalf = ({ size = 7, strokeWidth = 1.5, color = "rgb(255, 196, 0)", ...props }) => (
	<Icon
		stroke="rgb(255, 196, 0)"
		fill="rgb(255, 196, 0)"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		// color="#FFC400"
		width={size}
		height={size}
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="m8.345 8.062 2.62-5.192a.619.619 0 0 1 .555-.35.62.62 0 0 1 .558.35l2.62 5.192 5.878.836a.644.644 0 0 1 .544.606.659.659 0 0 1-.204.534l-4.228 4.027.996 5.676c.094.531-.432.948-.895.71l-5.27-2.707-5.266 2.707a.628.628 0 0 1-.175.06c-.41.072-.802-.305-.72-.77l.996-5.676-4.227-4.027a.66.66 0 0 1-.206-.484.69.69 0 0 1 .102-.362.616.616 0 0 1 .444-.294l5.878-.836Zm3.175 8.29a.61.61 0 0 1 .278.067l4.423 2.273-.832-4.748a.677.677 0 0 1 .194-.606l3.488-3.324-4.862-.692a.63.63 0 0 1-.472-.345l-2.216-4.39-.001.004v11.761Z" />
	</Icon>
);
export const PicOneIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 22.5c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10Z" />
		<path d="m4.5 19 4-4.5 8 6.5" />
		<path d="M9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="m12 17 4-5 5 4" />
	</Icon>
);

export const PicIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			d="M3.5 4h17a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
			clipRule="evenodd"
		/>
		<path d="M7.25 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
		<path d="m7.5 12 2.5 2 3-3.5 8.5 6.5v2a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-2l5-5Z" />
	</Icon>
);
export const LogoutIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M17.719 5.063A8.973 8.973 0 0 1 21 12c0 4.969-4.031 9-9 9s-9-4.031-9-9a9 9 0 0 1 3.234-6.938"></path>
		<path d="M12 3v9"></path>
	</Icon>
);
export const CloseIcon = ({ size = 35, ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25ZM16.06 15 15 16.06l-3-3-3 3L7.94 15l3-3-3-3L9 7.94l3 3 3-3L16.06 9l-3 3 3 3Z"></path>
	</Icon>
);
export const MailIcon = ({ size = 35, ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25ZM16.06 15 15 16.06l-3-3-3 3L7.94 15l3-3-3-3L9 7.94l3 3 3-3L16.06 9l-3 3 3 3Z"></path>
	</Icon>
);
export const CartNotFoundIcon = ({ size = 35, ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	></Icon>
);
export const ClockIcon = ({ size = 35, ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"></path>
		<path d="M12 6v6l4 2"></path>
	</Icon>
);
export const HeadphoneIcon = ({ size = 35, ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
		<path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
	</Icon>
);
export const RefreshIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor" }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="2"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M23 4v6h-6"></path>
		<path d="M1 20v-6h6"></path>
		<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
		<path d="m1 14 4.64 4.36A9 9 0 0 0 20.49 15"></path>
	</Icon>
);

export const AddressIcon = ({ size = 35, strokeWidth = 1.5, color = "currentColor" }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="2"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
		<path d="M12 7a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"></path>
	</Icon>
);

export const UploadImageIcon = ({ size = 100, strokeWidth = 0.5, color = "#000000", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M5.839 10.136a5.002 5.002 0 1 0 2.527 9.675" />
		<path d="M18.027 10.136A5.002 5.002 0 1 1 15.5 19.81" />
		<path d="M18 10a6 6 0 0 0-12 0" />
		<path d="M8.533 13.94 12 10.463 15.566 14" />
		<path d="M12 19v-6.77" />
	</Icon>
);

export const TrashIcon = ({ size = 40, strokeWidth = 1, color = "#000000", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M15.36 4.2v1.2h4.2a.6.6 0 0 1 0 1.2h-.645L17.89 19.392a2.4 2.4 0 0 1-2.393 2.208H8.022a2.4 2.4 0 0 1-2.392-2.208L4.606 6.6H3.96a.6.6 0 0 1 0-1.2h4.2V4.2a1.8 1.8 0 0 1 1.8-1.8h3.6a1.8 1.8 0 0 1 1.8 1.8Zm-6 0v1.2h4.8V4.2a.6.6 0 0 0-.6-.6h-3.6a.6.6 0 0 0-.6.6Zm-1.8 4.235.6 10.2a.6.6 0 1 0 1.198-.072l-.6-10.2a.6.6 0 1 0-1.198.072Zm7.836-.633a.6.6 0 0 0-.633.564l-.6 10.2a.6.6 0 0 0 1.197.07l.6-10.2a.6.6 0 0 0-.564-.634ZM11.76 7.8a.6.6 0 0 0-.6.6v10.2a.6.6 0 1 0 1.2 0V8.4a.6.6 0 0 0-.6-.6Z" />
	</Icon>
);

export const AppOptionIcon = ({ size = 40, color = "#000000", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		viewBox="0 0 24 24"
		{...props}
	>
		<path d="M5 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="M19 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="M5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="M19 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="M5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="M12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
		<path d="M19 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
	</Icon>
);

export const ArrowReturnIcon = ({ size = 46, color = "currentColor", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill={color}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			fillRule="evenodd"
			d="M19.32 4.68a.6.6 0 0 1 .6.6v5.76a3 3 0 0 1-3 3H5.17l4.016 4.015a.6.6 0 1 1-.85.85l-5.04-5.04a.6.6 0 0 1 0-.85l4.8-4.8a.6.6 0 1 1 .85.85L5.169 12.84H16.92a1.8 1.8 0 0 0 1.8-1.8V5.28a.6.6 0 0 1 .6-.6Z"
			clipRule="evenodd"
		/>
	</Icon>
);

export const LocationIcon = ({ size = 47, strokeWidth = 1, color = "#000000", ...props }) => (
	<Icon
		width={size}
		height={size}
		fill="none"
		stroke={color}
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={strokeWidth}
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path d="M12 2.25c-3.727 0-6.75 2.878-6.75 6.422 0 4.078 4.5 10.54 6.152 12.773a.739.739 0 0 0 1.196 0c1.652-2.231 6.152-8.692 6.152-12.773 0-3.544-3.023-6.422-6.75-6.422Z" />
		<path d="M12 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
	</Icon>
);
