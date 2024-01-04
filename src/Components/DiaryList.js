import React from 'react';

export default function DiaryList({ diaryList }) {
	return (
		<div>
			{diaryList.map(item => (
				<div key={item.id}>{item.content}</div>
			))}
		</div>
	);
}
