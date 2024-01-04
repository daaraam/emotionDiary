import React from 'react';
import styled from 'styled-components';

export default function MyHeader({ headText, leftChild, rightChild }) {
	return (
		<Header>
			<HeadBtnLeft className="head_btn_left">{leftChild}</HeadBtnLeft>
			<HeadText className="head_text">{headText}</HeadText>
			<HeadBtnRight className="head_btn_right">{rightChild}</HeadBtnRight>
		</Header>
	);
}

const Header = styled.header`
	padding-top: 20px;
	padding-bottom: 20px;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #e2e2e2;
	font-family: 'Noto Serif KR', serif;
`;

const HeadBtnLeft = styled.div`
	display: flex;
	justify-content: start;
	width: 25%;
`;

const HeadText = styled.div`
	display: flex;
	width: 50%;
	font-size: 25px;
	justify-content: center;
	font-family: 'Satisfy', cursive;
`;

const HeadBtnRight = styled.div`
	display: flex;
	justify-content: end;
	width: 25%;
`;
