import React, { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import DiaryList from '../Components/DiaryList';
import MyButton from './../Components/MyButton';
import MyHeader from './../Components/MyHeader';

function Home() {
	const diaryList = useContext(DiaryStateContext);

	const [data, setData] = useState([]);
	const [curDate, setCurDate] = useState(new Date());
	const headText = `${curDate.getFullYear()} / ${curDate.getMonth() + 1}`;
	useEffect(() => {
		const titleElement = document.getElementsByTagName('title')[0];
		titleElement.innerHTML = `감정 일기장`;
	}, []);

	useEffect(() => {
		// if (diaryList >= 1) {
		const firstDay = new Date(
			curDate.getFullYear(), //
			curDate.getMonth(),
			1,
		).getTime();
		const lastDay = new Date(
			curDate.getFullYear(), //
			curDate.getMonth() + 1,
			0,
			23,
			59,
			59,
			// 시, 분, 초까지 비교해야 달의 마지막날이 됨
		).getTime();

		// firstDay보다는 뒤고 lastDay보다는 과거인 이번달데이터
		setData(diaryList.filter(item => firstDay <= item.date && item.date <= lastDay));
	}, [diaryList, curDate]);
	// dependency에 diaryList를 추가해야 하는 이유 : 전달안하면 diaryList가 바뀌었을때(추가,수정,삭제) 동작안하니까

	useEffect(() => {
		console.log(data);
	}, [data]);

	const increaseMonth = () => {
		setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
	};

	const decreaseMonth = () => {
		setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
	};
	return (
		<div>
			<MyHeader
				headText={headText}
				leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
				rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
			/>
			<DiaryList diaryList={data} />
		</div>
	);
}

export default Home;
