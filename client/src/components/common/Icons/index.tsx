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
		<path d="M12 4.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 1 0 0-14.5z" />
		<path d="M12 8v4l2 2" />
	</Icon>
);



export default Icon;
 

