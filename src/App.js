import React, { useEffect, useReducer, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Diary from './Pages/Diary';
import Edit from './Pages/Edit';
import Home from './Pages/Home';
import New from './Pages/New';

const reducer = (state, action) => {
	let newState = [];
	switch (action.type) {
		case 'INIT': {
			return action.data;
		}
		case 'CREATE': {
			newState = [action.data, ...state];
			break;
		}
		case 'REMOVE': {
			newState = state.filter(item => item.id !== action.targetId);
			break;
		}
		case 'EDIT': {
			//id유지하면서 data를 바꿈
			newState = state.map(item => (item.id === action.data.id ? { ...action.data } : item));
			break;
		}
		default:
			return state;
	}

	localStorage.setItem('diary', JSON.stringify(newState));
	return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
	const [data, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		const localData = localStorage.getItem('diary');
		if (localData) {
			const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));

			if (diaryList.length >= 1) {
				dataId.current = parseInt(diaryList[0].id) + 1;
				dispatch({ type: 'INIT', data: diaryList });
			}
		}
	}, []);

	const dataId = useRef(0);

	const onCreate = (date, content, emotion) => {
		dispatch({
			type: 'CREATE',
			data: {
				id: dataId.current,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
		dataId.current += 1;
	};

	const onRemove = targetId => {
		dispatch({ type: 'REMOVE', targetId });
	};
	const onEdit = (targetId, date, emotion, content) => {
		dispatch({
			type: 'EDIT',
			data: {
				id: targetId,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
	};

	return (
		<DiaryStateContext.Provider value={data}>
			<DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
				<div className="App">
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/new" element={<New />} />
							<Route path="/edit/:id" element={<Edit />} />
							<Route path="/diary/:id" element={<Diary />} />
						</Routes>
					</BrowserRouter>
				</div>
			</DiaryDispatchContext.Provider>
		</DiaryStateContext.Provider>
	);
}

export default App;
