import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MyButton from './MyButton';
const sortOptionList = [
	{
		value: 'latest',
		name: '최신순',
	},
	{
		value: 'oldest',
		name: '오래된순',
	},
];

const sortEmotionList = [
	{
		value: 'all',
		name: '모든 감정',
	},
	{
		value: 'good',
		name: '좋은 감정',
	},
	{
		value: 'bad',
		name: '나쁜 감정',
	},
];
const ControlMenu = ({ value, onChange, optionList }) => {
	return (
		<select value={value} onChange={e => onChange(e.target.value)}>
			{optionList.map((item, index) => (
				<option key={index} value={item.value}>
					{item.name}
				</option>
			))}
		</select>
	);
};

export default function DiaryList({ diaryList }) {
	const [sortType, setSortType] = useState('latest');
	const [filter, setFilter] = useState('all');
	const negative = useNavigate();

	const getProcessedDiaryList = () => {
		const compare = (a, b) => {
			if (sortType === 'latest') {
				return parseInt(b.date) - parseInt(a.date);
			} else {
				return parseInt(a.date) - parseInt(b.date);
			}
		};

		const filterCallback = item => {
			if (filter === 'good') {
				return parseInt(item.emotion) <= 3;
			} else {
				return parseInt(item.emotion) > 3;
			}
		};
		const copyList = JSON.parse(JSON.stringify(diaryList));
		const filteredList = filter === 'all' ? copyList : copyList.filter(item => filterCallback(item));
		const sortedList = filteredList.sort(compare);
		return sortedList;
	};

	let one = parseInt(new Date().getTime());
	let two = parseInt(new Date().getTime() + 1);
	console.log(parseInt(one) - parseInt(two));

	return (
		<DiaryListContainer>
			<MenuWrapper>
				<LeftCol>
					<ControlMenu value={sortType} optionList={sortOptionList} onChange={setSortType} />
					<ControlMenu value={filter} optionList={sortEmotionList} onChange={setFilter} />
				</LeftCol>
				<RightCol>
					<MyButton
						text={'새로운 일기 작성'}
						type={'positive'}
						onClick={() => {
							negative('/new');
						}}
					/>
				</RightCol>
				{getProcessedDiaryList().map(item => (
					<div key={item.id}>
						{item.content} {item.emotion}
					</div>
				))}
			</MenuWrapper>
		</DiaryListContainer>
	);
}

// getProcessedDiaryList을 화면에 뿌려주고 있는데 이건 sortedList를 리턴하는 함수고, sortedList는 filteredList를 compare로 sort한 값이니까 f-c-s-g 순.

const DiaryListContainer = styled.div`
	padding: 1rem;
`;

const MenuWrapper = styled.div`
	display: flex;
	justify-content: center;
`;
const LeftCol = styled.div`
	display: flex;
	justify-content: start;
`;
const RightCol = styled.div`
	display: flex;
	justify-content: end;
`;
