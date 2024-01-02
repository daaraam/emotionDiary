import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MyButton from './Components/MyButton';
import MyHeader from './Components/MyHeader';
import Diary from './Pages/Diary';
import Edit from './Pages/Edit';
import Home from './Pages/Home';
import New from './Pages/New';

function App() {
	return (
		<div className="App">
			<MyHeader
				headText="App"
				className="header"
				leftChild={
					<MyButton
						text={'left'}
						onClick={() => {
							alert('left');
						}}
					/>
				}
				rightChild={
					<MyButton
						text={'right'}
						onClick={() => {
							alert('right');
						}}
					/>
				}
			/>
			<BrowserRouter>
				<h1>App</h1>
				{/* <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
				<img src={process.env.PUBLIC_URL + `/assets/emotion2.png`} />
				<img src={process.env.PUBLIC_URL + `/assets/emotion3.png`} />
				<img src={process.env.PUBLIC_URL + `/assets/emotion4.png`} />
				<img src={process.env.PUBLIC_URL + `/assets/emotion5.png`} /> */}
				<MyButton
					text={'Positive'}
					onClick={() => {
						alert('버튼 클릭');
					}}
					type={'positive'}
				/>
				<MyButton
					text={'Negative'}
					onClick={() => {
						alert('버튼 클릭');
					}}
					type={'negative'}
				/>
				<MyButton
					text={'Button'}
					onClick={() => {
						alert('버튼 클릭');
					}}
				/>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/new" element={<New />} />
					<Route path="/edit" element={<Edit />} />
					<Route path="/diary/:id" element={<Diary />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
