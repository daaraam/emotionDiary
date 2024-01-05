import React, { useContext, useEffect, useState } from 'react';
import { DiaryStateContext } from '../App';
import DiaryList from '../Components/DiaryList';
import MyButton from './../Components/MyButton';
import MyHeader from './../Components/MyHeader';
import { useNavigate } from 'react-router-dom';

function Home() {
	const diaryList = useContext(DiaryStateContext);

	const [data, setData] = useState([]);
	const [curDate, setCurDate] = useState(new Date());
	const headText = `${curDate.getFullYear()} / ${curDate.getMonth() + 1}`;

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
		).getTime();

		// firstDay보다는 뒤고 lastDay보다는 과거인 이번달데이터
		setData(diaryList.filter(item => firstDay <= item.date && item.date <= lastDay));
		// } else {
		// setData([]);
		// }
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
